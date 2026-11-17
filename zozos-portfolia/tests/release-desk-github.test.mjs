import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import Module from "node:module";
import ts from "typescript";

const source = readFileSync(new URL("../src/lib/release-desk/github.ts", import.meta.url), "utf8");
const client = new Module("release-github-test");
client._compile(ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, "release-github-test.cjs");

const { normalizeRepo, listChanges, loadEvidence, GithubError } = client.exports;
const merge = "a".repeat(40);
const head = "b".repeat(40);
const pr = { number: 15, title: "Keyboard support", user: { login: "ren" }, state: "closed",
  merged_at: "2026-11-12", merge_commit_sha: merge, head: { sha: head } };

test("repository input cannot change the API destination or embed additional paths", () => {
  assert.equal(normalizeRepo(" GitHub/test.js "), "github/test.js");
  assert.equal(normalizeRepo("https://github.com/GitHub/test.js/"), "github/test.js");
  for (const input of ["https://elsewhere.test/a/b", "a/..", "a/x/y", "a/%2F", "https://x@github.com/a/b", "https://github.com/a/b?x=1",
    "https://github.com:443/a/b", "https://github.com/a/../b/c", "a/-"]) {
    assert.throws(() => normalizeRepo(input), (error) => error instanceof GithubError && error.status === 400, input);
  }
});

test("candidate listing distinguishes open, merged and closed unmerged pull requests", async () => {
  const result = await listChanges("atlas/web", async (url) => {
    assert.match(url, /^https:\/\/api\.github\.com\/repos\/atlas\/web\/pulls\?/);
    return Response.json([pr, { ...pr, number: 16, merged_at: null, state: "open" }, { ...pr, number: 17, merged_at: null }]);
  });
  assert.deepEqual(result.map(({ number, sha, state, ci }) => [number, sha, state, ci]), [
    [15, merge, "merged", null], [16, head, "open", null],
  ]);
});

test("refresh pins merged evidence to the merge commit and checks both GitHub APIs", async () => {
  const paths = [];
  const change = await loadEvidence("atlas/web", 15, async (url) => {
    paths.push(url);
    if (url.endsWith("/pulls/15")) return Response.json(pr);
    if (url.includes("check-runs")) return Response.json({ total_count: 2, check_runs: [
      { name: "Build", status: "completed", conclusion: "success" },
      { name: "Browser tests", status: "completed", conclusion: "timed_out" },
    ] });
    return Response.json({ total_count: 2, statuses: [
      { context: "Preview", state: "pending" }, { context: "Visual diff", state: "success" },
    ] });
  });
  assert.equal(change.sha, merge);
  assert.ok(paths.slice(1).every((url) => url.includes(merge)));
  assert.deepEqual(change.ci.checks.map(({ result }) => result), ["success", "failure", "pending", "success"]);
  assert.equal(change.ci.complete, true);
});

test("a truncated CI response stays incomplete even if all returned rows pass", async () => {
  const change = await loadEvidence("atlas/web", 15, async (url) => {
    if (url.endsWith("/pulls/15")) return Response.json({ ...pr, state: "open", merged_at: null });
    if (url.includes("check-runs")) return Response.json({ total_count: 101, check_runs: [
      { name: "Build", status: "completed", conclusion: "success" },
    ] });
    return Response.json({ total_count: 0, statuses: [], state: "pending" });
  });
  assert.equal(change.sha, head);
  assert.equal(change.ci.complete, false);
  assert.equal(change.ci.checks.length, 1);
});

test("public access errors and rate limits have distinct responses", async () => {
  await assert.rejects(listChanges("atlas/web", async () => new Response(null, { status: 404 })),
    (error) => error instanceof GithubError && error.status === 404);
  await assert.rejects(listChanges("atlas/web", async () => new Response(JSON.stringify({ message: "API rate limit exceeded" }), {
    status: 403, headers: { "x-ratelimit-remaining": "0", "retry-after": "20" },
  })), (error) => error instanceof GithubError && error.status === 429 && error.retryAfter === "20");
});

test("unexpected upstream response is rejected instead of asserting passing CI", async () => {
  await assert.rejects(loadEvidence("atlas/web", 15, async (url) => {
    if (url.endsWith("/pulls/15")) return Response.json(pr);
    if (url.includes("check-runs")) return Response.json({});
    return Response.json({ total_count: 0, statuses: [] });
  }), (error) => error instanceof GithubError && error.status === 502);
});

test("a full first page can load the remaining reported checks", async () => {
  const change = await loadEvidence("atlas/web", 15, async (url) => {
    if (url.endsWith("/pulls/15")) return Response.json(pr);
    if (!url.includes("check-runs")) return Response.json({ total_count: 0, statuses: [] });
    const first = Array.from({ length: 100 }, (_, index) => ({
      id: index + 1, name: `Build ${index}`, status: "completed", conclusion: "success",
    }));
    return Response.json({ total_count: 101, check_runs: new URL(url).searchParams.get("page") === "2"
      ? [{ id: 101, name: "Last check", status: "completed", conclusion: "failure" }]
      : first });
  });
  assert.equal(change.ci.complete, true);
  assert.equal(change.ci.checks.length, 101);
  assert.deepEqual(change.ci.checks.at(-1), { name: "Last check", result: "failure" });
});

test("overlapping pages cannot silently declare all checks complete", async () => {
  const change = await loadEvidence("atlas/web", 15, async (url) => {
    if (url.endsWith("/pulls/15")) return Response.json(pr);
    if (!url.includes("check-runs")) return Response.json({ total_count: 0, statuses: [] });
    const rows = Array.from({ length: 100 }, (_, index) => ({
      id: index + 1, name: `Build ${index}`, status: "completed", conclusion: "success",
    }));
    return Response.json({ total_count: 101, check_runs: new URL(url).searchParams.get("page") === "2"
      ? [rows[99]] : rows });
  });
  assert.equal(change.ci.complete, false);
});
