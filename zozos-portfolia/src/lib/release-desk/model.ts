export type CheckResult = "success" | "failure" | "pending" | "neutral" | "unknown";
export type Evidence = {
  checkedAt: string;
  complete: boolean;
  checks: { name: string; result: CheckResult }[];
};
export type Change = {
  number: number;
  title: string;
  author: string;
  state: "merged" | "open" | "closed";
  sha: string;
  ci: Evidence | null;
};
export type QaResult = "pending" | "passed" | "failed";
export type QaItem = { id: string; title: string; result: QaResult; note: string };
export type Role = "qa" | "owner";
export type Release = {
  id: string;
  repo: string;
  title: string;
  changes: Change[];
  qa: QaItem[];
  signoffs: Record<Role, string | null>;
  approvedAt: string | null;
  activity: { message: string; at: string }[];
};
export type Workspace = { version: 1; activeId: string; demo: Release; drafts: Release[] };

export const DEMO_ID = "demo";
export const MAX_CHANGES = 12;
export const MAX_DRAFTS = 20;
export const MAX_QA = 20;
export const ROLES: Record<Role, string> = { qa: "QA sign-off", owner: "Release owner sign-off" };

const emptySignoffs = () => ({ qa: null, owner: null });
const CHECK_RESULTS = ["success", "failure", "pending", "neutral", "unknown"] as const;

export function createRelease(id: string, repo: string, at: string): Release {
  return {
    id, repo, title: "Untitled release", changes: [],
    qa: ["Verify the primary user flow", "Smoke test the release build", "Check for regressions"].map((title, index) => ({
      id: `qa-${index}`, title, result: "pending", note: "",
    })),
    signoffs: emptySignoffs(), approvedAt: null,
    activity: [{ message: "Created the release", at }],
  };
}

export const DEMO_CHANGES: Change[] = [
  { number: 184, title: "Redesign the checkout confirmation", author: "maya", state: "merged", sha: "e49a8f3ff72246da55c4447f55d51961719ddee3", ci: {
    checkedAt: "2026-11-18T09:42:00Z", complete: true,
    checks: [{ name: "Build", result: "success" }, { name: "Browser tests", result: "failure" }],
  } },
  { number: 181, title: "Keep delivery preferences between sessions", author: "jon", state: "merged", sha: "ba21de07def4cca33fd718527107a152ae881cad", ci: {
    checkedAt: "2026-11-18T09:38:00Z", complete: true,
    checks: [{ name: "Build", result: "success" }, { name: "Unit tests", result: "success" }],
  } },
  { number: 179, title: "Improve keyboard navigation in the cart", author: "ren", state: "merged", sha: "a03c7125af45ef4656472a99da181f1dbf287028", ci: {
    checkedAt: "2026-11-18T09:34:00Z", complete: true,
    checks: [{ name: "Build", result: "success" }, { name: "Accessibility tests", result: "success" }],
  } },
  { number: 187, title: "Add saved payment methods", author: "maya", state: "open", sha: "00f1edc22dd5a5bbdb3588c486bcae71d95e5d41", ci: {
    checkedAt: "2026-11-18T09:44:00Z", complete: true,
    checks: [{ name: "Build", result: "pending" }],
  } },
];

export function createDemo(): Release {
  const at = "2026-11-18T09:45:00Z";
  return {
    ...createRelease(DEMO_ID, "fieldwork/storefront", at),
    title: "Storefront 2.8.0",
    changes: DEMO_CHANGES.slice(0, 3),
    qa: [
      { id: "checkout", title: "Complete checkout on mobile", result: "pending", note: "" },
      { id: "address", title: "Verify a saved delivery address", result: "passed", note: "Saved address survives a reload." },
      { id: "keyboard", title: "Navigate the cart with a keyboard", result: "pending", note: "" },
    ],
    activity: [
      { message: "Browser tests failed on PR #184", at },
      { message: "Selected three changes for Storefront 2.8.0", at: "2026-11-18T09:32:00Z" },
      { message: "Created the demo release", at: "2026-11-18T09:30:00Z" },
    ],
  };
}

export function ciResult(ci: Evidence | null): CheckResult {
  if (ci?.checks.some(({ result }) => result === "failure")) return "failure";
  if (!ci?.complete || ci.checks.length === 0 || ci.checks.some(({ result }) => result === "unknown")) return "unknown";
  if (ci.checks.some(({ result }) => result === "pending")) return "pending";
  return ci.checks.some(({ result }) => result === "success") ? "success" : "unknown";
}

type Gate = {
  id: "changes" | "ci" | "qa" | "signoff";
  label: string;
  state: "passed" | "blocked" | "waiting";
  detail: string;
};

export function readiness(release: Release) {
  const unmerged = release.changes.filter(({ state }) => state !== "merged");
  const failedCi = release.changes.filter(({ ci }) => ciResult(ci) === "failure");
  const unknownCi = release.changes.filter(({ ci }) => !["failure", "success"].includes(ciResult(ci)));
  const passedQa = release.qa.filter(({ result }) => result === "passed").length;
  const hasChanges = release.changes.length > 0;
  const repoReady = hasChanges && unmerged.length === 0;
  const ciReady = hasChanges && failedCi.length + unknownCi.length === 0;
  const qaReady = release.qa.length > 0 && passedQa === release.qa.length;
  const canSign = repoReady && ciReady && qaReady;
  const signed = Number(Boolean(release.signoffs.qa)) + Number(Boolean(release.signoffs.owner));
  const prList = (changes: Change[]) => changes.map(({ number }) => `#${number}`).join(", ");
  const gates: Gate[] = [
    { id: "changes", label: "Merged changes", state: repoReady ? "passed" : "blocked", detail: !hasChanges
      ? "Select at least one pull request." : unmerged.length
        ? `${prList(unmerged)} must merge.` : `${release.changes.length} selected PRs merged.` },
    { id: "ci", label: "CI checks", state: ciReady ? "passed" : "blocked", detail: !hasChanges
      ? "Select a pull request to see its checks." : failedCi.length
        ? `Checks failed on ${prList(failedCi)}.` : unknownCi.length
          ? `Waiting for passing checks on ${prList(unknownCi)}.` : "Passing for every recorded commit." },
    { id: "qa", label: "QA checklist", state: qaReady ? "passed" : "blocked", detail: `${passedQa} of ${release.qa.length} required checks passed.` },
    { id: "signoff", label: "Sign-offs", state: canSign && signed === 2 ? "passed" : "waiting", detail: canSign
      ? `${signed} of 2 sign-offs recorded.` : "Available once the other gates pass." },
  ];
  const status: "approved" | "ready" | "blocked" = release.approvedAt ? "approved" : canSign && signed === 2 ? "ready" : "blocked";
  return { gates, canSign, status };
}

export type ReleaseAction =
  | { type: "rename"; title: string }
  | { type: "select" | "evidence"; change: Change }
  | { type: "remove" | "fixDemoCheck"; number: number }
  | { type: "qaResult"; id: string; result: QaResult }
  | { type: "qaNote"; id: string; note: string }
  | { type: "addQa"; id: string; title: string }
  | { type: "sign"; role: Role }
  | { type: "approve" | "reopen" };

function record(release: Release, at: string, message: string, reset = false): Release {
  return {
    ...release,
    signoffs: reset ? emptySignoffs() : release.signoffs,
    activity: [{ message, at }, ...release.activity].slice(0, 100),
  };
}

function sameEvidence(before: Change, after: Change) {
  const snapshot = ({ ci, sha, state }: Change) => JSON.stringify([
    sha, state, ci?.complete,
    ci?.checks.map(({ name, result }) => JSON.stringify([name, result])).sort(),
  ]);
  return snapshot(before) === snapshot(after);
}

export function applyRelease(release: Release, action: ReleaseAction, at: string): Release {
  if (release.approvedAt) {
    return action.type === "reopen"
      ? record({ ...release, approvedAt: null }, at, "Reopened the release", true)
      : release;
  }

  switch (action.type) {
    case "rename": {
      const title = action.title.trim().slice(0, 100);
      return !title || title === release.title ? release : record({ ...release, title }, at, "Renamed the release");
    }
    case "select":
      if (release.changes.length >= MAX_CHANGES || release.changes.some(({ number }) => number === action.change.number)) return release;
      return record({ ...release, changes: [...release.changes, action.change] }, at, `Added PR #${action.change.number}`, true);
    case "remove": {
      const changes = release.changes.filter(({ number }) => number !== action.number);
      return changes.length === release.changes.length ? release : record({ ...release, changes }, at, `Removed PR #${action.number}`, true);
    }
    case "evidence": {
      const previous = release.changes.find(({ number }) => number === action.change.number);
      if (!previous) return release;
      const changes = release.changes.map((change) => change === previous ? action.change : change);
      return record({ ...release, changes }, at, `Refreshed CI for PR #${previous.number}`, !sameEvidence(previous, action.change));
    }
    case "fixDemoCheck": {
      if (release.id !== DEMO_ID) return release;
      const change = release.changes.find(({ number }) => number === action.number);
      if (!change?.ci || ciResult(change.ci) !== "failure") return release;
      return applyRelease(release, { type: "evidence", change: {
        ...change,
        ci: { ...change.ci, checkedAt: at, checks: change.ci.checks.map((check) => check.result === "failure" ? { ...check, result: "success" } : check) },
      } }, at);
    }
    case "addQa": {
      const title = action.title.trim().slice(0, 100);
      if (!title || release.qa.length >= MAX_QA || release.qa.some(({ id }) => id === action.id)) return release;
      return record({ ...release, qa: [...release.qa, { id: action.id, title, result: "pending", note: "" }] }, at, `Added QA check: ${title}`, true);
    }
    case "qaResult":
    case "qaNote": {
      const item = release.qa.find(({ id }) => id === action.id);
      if (!item) return release;
      const next = action.type === "qaResult" ? { ...item, result: action.result } : { ...item, note: action.note.trim().slice(0, 500) };
      if (next.result === item.result && next.note === item.note) return release;
      const changed = next.result !== item.result;
      const message = changed ? `Marked “${item.title}” ${next.result}` : `Updated QA note for “${item.title}”`;
      return record({ ...release, qa: release.qa.map((entry) => entry === item ? next : entry) }, at, message, changed);
    }
    case "sign":
      if (release.signoffs[action.role] || !readiness(release).canSign) return release;
      return record({ ...release, signoffs: { ...release.signoffs, [action.role]: at } }, at, `Recorded ${ROLES[action.role]}`);
    case "approve":
      return readiness(release).status === "ready" ? record({ ...release, approvedAt: at }, at, "Approved the release") : release;
    case "reopen":
      return release;
  }
}

function object(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function validTime(value: unknown): value is string {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}

function validChange(value: unknown): value is Change {
  if (!object(value) || !Number.isSafeInteger(value.number) || Number(value.number) < 1 ||
    typeof value.title !== "string" || typeof value.author !== "string" || typeof value.sha !== "string" ||
    typeof value.state !== "string" || !["merged", "open", "closed"].includes(value.state)) return false;
  const ci = value.ci;
  return ci === null || (object(ci) && validTime(ci.checkedAt) && typeof ci.complete === "boolean" &&
    Array.isArray(ci.checks) && ci.checks.length <= 400 && ci.checks.every((check) => object(check) &&
      typeof check.name === "string" && CHECK_RESULTS.includes(check.result as CheckResult)));
}

function validRelease(value: unknown): value is Release {
  return object(value) && typeof value.id === "string" && Boolean(value.id) && typeof value.title === "string" &&
    typeof value.repo === "string" && /^[\w.-]+\/[\w.-]+$/.test(value.repo) &&
    Array.isArray(value.changes) && value.changes.length <= MAX_CHANGES && value.changes.every(validChange) &&
    Array.isArray(value.qa) && value.qa.length <= MAX_QA && value.qa.every((item) => object(item) &&
      typeof item.id === "string" && typeof item.title === "string" && typeof item.note === "string" &&
      typeof item.result === "string" && ["pending", "passed", "failed"].includes(item.result)) &&
    object(value.signoffs) && [value.signoffs.qa, value.signoffs.owner, value.approvedAt].every((at) => at === null || validTime(at)) &&
    Array.isArray(value.activity) && value.activity.length <= 100 &&
    value.activity.every((entry) => object(entry) && typeof entry.message === "string" && validTime(entry.at));
}

export function readWorkspace(raw: string | null): Workspace {
  let value: unknown;
  try { value = raw ? JSON.parse(raw) : null; } catch { value = null; }
  const demo = object(value) && validRelease(value.demo) && value.demo.id === DEMO_ID && value.version === 1
    ? value.demo : createDemo();
  if (!object(value) || value.version !== 1) return { version: 1, demo, activeId: demo.id, drafts: [] };
  const drafts = Array.isArray(value.drafts) ? value.drafts.filter((entry) => validRelease(entry) && entry.id !== DEMO_ID).slice(0, MAX_DRAFTS) as Release[] : [];
  const active = drafts.find(({ id }) => id === value.activeId);
  return { version: 1, demo, activeId: active?.id ?? demo.id, drafts };
}

export function githubPullUrl(repo: string, number: number) {
  return `https://github.com/${repo.split("/").map(encodeURIComponent).join("/")}/pull/${number}`;
}

export function releaseNotes(release: Release) {
  const markdown = (text: string) => text.replace(/\s+/g, " ").replace(/[\\`*_{}\[\]()<>#+!|]/g, "\\$&");
  const demo = release.id === DEMO_ID;
  return [
    `# ${markdown(release.title)}`, "",
    `${demo ? "Simulated demo" : "Repository"}: ${markdown(release.repo)}`,
    `Status: ${readiness(release).status}`,
    ...(release.approvedAt ? [`Approved: ${release.approvedAt}`] : []),
    "", "## Changes", "",
    ...release.changes.map((change) => {
      const label = `#${change.number}`;
      return `- ${demo ? label : `[${label}](${githubPullUrl(release.repo, change.number)})`} ${markdown(change.title)} · ${change.state} · CI ${ciResult(change.ci)} · \`${change.sha}\`${change.ci ? ` (checked ${change.ci.checkedAt})` : ""}`;
    }),
    "", "## QA", "",
    ...release.qa.map((item) => `- ${markdown(item.title)}: ${item.result}${item.note ? ` (${markdown(item.note)})` : ""}`),
    "", "## Sign-offs", "",
    ...(["qa", "owner"] as const).map((role) => `- ${ROLES[role]}: ${release.signoffs[role] ?? "Pending"}`),
    "",
  ].join("\n");
}
