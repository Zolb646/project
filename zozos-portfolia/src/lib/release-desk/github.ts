import type { Change, CheckResult, Evidence } from "./model";

const API = "https://api.github.com";
const repoPath = /^([a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?)\/([a-z0-9_.-]{1,100})$/i;

export class GithubError extends Error {
  constructor(message: string, readonly status: number, readonly retryAfter?: string) {
    super(message);
  }
}

export function normalizeRepo(input: string) {
  const value = input.trim();
  const path = value.replace(/^https:\/\/github\.com\//i, "").replace(/\/$/, "");
  const match = repoPath.exec(path);
  if (!match || ["-", ".", ".."].includes(match[2])) {
    throw new GithubError("Enter a public repository as owner/repo or paste its GitHub URL.", 400);
  }
  return `${match[1]}/${match[2]}`.toLowerCase();
}

type Fetcher = (url: string, options: RequestInit & { next?: { revalidate: number } }) => Promise<Response>;

function retryDelay(response: Response) {
  const after = response.headers.get("retry-after");
  if (after && /^\d{1,8}$/.test(after)) return after;
  const reset = Number(response.headers.get("x-ratelimit-reset"));
  return String(reset > 0 ? Math.max(1, Math.ceil(reset - Date.now() / 1000)) : 60);
}

function unexpectedResponse() {
  return new GithubError("GitHub returned incomplete data. Try again shortly.", 502);
}

async function readGitHub(path: string, fetcher: Fetcher, cache: boolean): Promise<unknown> {
  let response: Response;
  try {
    response = await fetcher(`${API}${path}`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "Release-Desk" },
      redirect: "error",
      signal: AbortSignal.timeout(6500),
      ...(cache ? { next: { revalidate: 60 } } : { cache: "no-store" as const }),
    });
  } catch {
    throw new GithubError("GitHub could not be reached. Try again shortly.", 502);
  }

  if (response.status === 404 || response.status === 410 || response.status === 451) {
    throw new GithubError("GitHub could not find that public repository or pull request.", 404);
  }
  if (response.status === 429 || (response.status === 403 && (
    response.headers.get("x-ratelimit-remaining") === "0" || response.headers.has("retry-after") ||
    /rate limit|abuse/i.test(await response.text().catch(() => ""))
  ))) {
    throw new GithubError("GitHub’s public API limit was reached. Wait a moment before trying again.", 429, retryDelay(response));
  }
  if (response.status === 403) throw new GithubError("GitHub denied access to this repository.", 403);
  if (!response.ok) throw new GithubError("GitHub is temporarily unavailable. Try again shortly.", 502);
  return response.json().catch(() => { throw unexpectedResponse(); });
}

function object(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readChange(raw: unknown): Change {
  if (!object(raw) || typeof raw.number !== "number" || !Number.isSafeInteger(raw.number) || raw.number < 1 ||
    typeof raw.title !== "string" || (raw.state !== "open" && raw.state !== "closed")) throw unexpectedResponse();
  const merged = typeof raw.merged_at === "string" && Boolean(raw.merged_at);
  const ref = merged ? raw.merge_commit_sha : object(raw.head) && raw.head.sha;
  return {
    number: raw.number,
    title: raw.title.slice(0, 300),
    author: object(raw.user) && typeof raw.user.login === "string" ? raw.user.login.slice(0, 100) : "Ghost",
    state: merged ? "merged" : raw.state === "open" ? "open" : "closed",
    sha: typeof ref === "string" && /^[0-9a-f]{40}$/i.test(ref) ? ref : "",
    ci: null,
  };
}

export async function listChanges(input: string, fetcher: Fetcher = fetch) {
  const repo = normalizeRepo(input);
  const response = await readGitHub(`/repos/${repo}/pulls?state=all&sort=updated&direction=desc&per_page=50`, fetcher, true);
  if (!Array.isArray(response)) throw unexpectedResponse();
  return response.slice(0, 50).map(readChange).filter(({ state }) => state !== "closed");
}

function checkResult(run: Record<string, unknown>): CheckResult {
  if (run.status !== "completed") return typeof run.status === "string" ? "pending" : "unknown";
  switch (run.conclusion) {
    case "success": return "success";
    case "neutral":
    case "skipped": return "neutral";
    case "failure":
    case "action_required":
    case "cancelled":
    case "startup_failure":
    case "stale":
    case "timed_out": return "failure";
    default: return "unknown";
  }
}

function legacyResult(status: Record<string, unknown>): CheckResult {
  switch (status.state) {
    case "success": return "success";
    case "pending": return "pending";
    case "error":
    case "failure": return "failure";
    default: return "unknown";
  }
}

function readRows(
  response: unknown,
  field: "check_runs" | "statuses",
  label: "name" | "context",
  getResult: (row: Record<string, unknown>) => CheckResult,
) {
  if (!object(response) || !Array.isArray(response[field]) ||
    typeof response.total_count !== "number" || !Number.isSafeInteger(response.total_count) || response.total_count < 0) {
    throw unexpectedResponse();
  }
  const rows = response[field].slice(0, 100).map((row) => {
    if (!object(row) || typeof row[label] !== "string") throw unexpectedResponse();
    return { id: typeof row.id === "number" ? row.id : null, name: row[label].slice(0, 150), result: getResult(row) };
  });
  return { rows, total: response.total_count };
}

async function loadRows(
  path: string,
  fetcher: Fetcher,
  field: "check_runs" | "statuses",
  label: "name" | "context",
  getResult: (row: Record<string, unknown>) => CheckResult,
) {
  const first = readRows(await readGitHub(`${path}&page=1`, fetcher, false), field, label, getResult);
  if (first.rows.length < 100 || first.total <= 100) {
    return { rows: first.rows, complete: first.rows.length === first.total };
  }
  // Bound each source at two pages and keep larger or changing result sets incomplete.
  const second = readRows(await readGitHub(`${path}&page=2`, fetcher, false), field, label, getResult);
  const rows = [...first.rows, ...second.rows];
  const ids = new Set(rows.map(({ id }) => id));
  return { rows, complete: first.total === second.total && rows.length === second.total && !ids.has(null) && ids.size === rows.length };
}

export async function loadEvidence(input: string, number: number, fetcher: Fetcher = fetch): Promise<Change> {
  const repo = normalizeRepo(input);
  if (!Number.isSafeInteger(number) || number < 1) throw new GithubError("Enter a valid pull request number.", 400);
  const change = readChange(await readGitHub(`/repos/${repo}/pulls/${number}`, fetcher, false));
  if (change.number !== number) throw unexpectedResponse();
  if (!change.sha) return change;

  const commit = `/repos/${repo}/commits/${change.sha}`;
  const [checkRuns, statuses] = await Promise.all([
    loadRows(`${commit}/check-runs?filter=latest&per_page=100`, fetcher, "check_runs", "name", checkResult),
    loadRows(`${commit}/status?per_page=100`, fetcher, "statuses", "context", legacyResult),
  ]);
  const ci: Evidence = {
    checkedAt: new Date().toISOString(),
    complete: checkRuns.complete && statuses.complete,
    checks: [...checkRuns.rows, ...statuses.rows].map(({ name, result }) => ({ name, result })),
  };
  return { ...change, ci };
}
