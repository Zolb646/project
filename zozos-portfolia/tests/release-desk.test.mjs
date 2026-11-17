import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import Module from "node:module";
import ts from "typescript";

const source = readFileSync(new URL("../src/lib/release-desk/model.ts", import.meta.url), "utf8");
const model = new Module("release-desk-test");
model._compile(ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, "release-desk-test.cjs");

const { applyRelease, createDemo, createRelease, readWorkspace, readiness, releaseNotes } = model.exports;
const time = "2026-11-18T03:00:00.000Z";

function withPassingEvidence() {
  let release = createDemo();
  release = applyRelease(release, { type: "fixDemoCheck", number: 184 }, time);
  for (const item of release.qa) {
    release = applyRelease(release, { type: "qaResult", id: item.id, result: "passed" }, time);
  }
  return release;
}

function sign(release) {
  for (const role of ["qa", "owner"]) {
    release = applyRelease(release, { type: "sign", role }, time);
  }
  return release;
}

test("the demo progresses from blocked to approved and exports recorded evidence", () => {
  const demo = createDemo();
  assert.deepEqual(readiness(demo).gates.map(({ state }) => state), ["passed", "blocked", "blocked", "waiting"]);
  assert.equal(applyRelease(demo, { type: "approve" }, time), demo);
  const ready = sign(withPassingEvidence());
  assert.equal(readiness(ready).status, "ready");
  const approved = applyRelease(ready, { type: "approve" }, time);
  assert.equal(approved.approvedAt, time);
  assert.equal(readiness(approved).status, "approved");
  assert.equal(applyRelease(approved, { type: "rename", title: "Other" }, time), approved);
  const notes = releaseNotes(approved);
  assert.match(notes, /Simulated demo/);
  assert.match(notes, /#184/);
  assert.match(notes, /QA sign-off/);
  assert.ok(notes.includes(time));
  assert.ok(approved.activity.some(({ message }) => message === "Approved the release"));
});

test("empty releases, open changes, and missing CI remain blocked", () => {
  let release = createRelease("r1", "atlas/web", time);
  assert.equal(readiness(release).gates[0].state, "blocked");
  const open = { ...createDemo().changes[0], state: "open", ci: null };
  release = applyRelease(release, { type: "select", change: open }, time);
  assert.deepEqual(readiness(release).gates.slice(0, 2).map(({ state }) => state), ["blocked", "blocked"]);
  assert.equal(applyRelease(release, { type: "sign", role: "owner" }, time), release);
  assert.equal(applyRelease(release, { type: "fixDemoCheck", number: open.number }, time), release);
});

test("approval survives metadata-only edits and resets when evidence changes", () => {
  const ready = sign(withPassingEvidence());
  const change = ready.changes[0];
  let updated = applyRelease(ready, { type: "evidence", change: {
    ...change, ci: { ...change.ci, checkedAt: "2026-11-18T03:10:00.000Z" },
  } }, time);
  updated = applyRelease(updated, { type: "qaNote", id: updated.qa[0].id, note: "Verified in Chrome" }, time);
  assert.deepEqual(updated.signoffs, ready.signoffs);
  const changed = applyRelease(updated, { type: "evidence", change: {
    ...change, ci: { ...change.ci, checks: [{ name: "Build", result: "failure" }] },
  } }, time);
  assert.deepEqual(changed.signoffs, { qa: null, owner: null });
  assert.equal(readiness(changed).status, "blocked");

  const reopened = applyRelease(applyRelease(ready, { type: "approve" }, time), { type: "reopen" }, time);
  assert.equal(reopened.approvedAt, null);
  assert.deepEqual(reopened.signoffs, { qa: null, owner: null });
  assert.equal(applyRelease(ready, { type: "qaResult", id: ready.qa[0].id, result: "failed" }, time).signoffs.qa, null);
});

test("GitHub refreshes cannot re-add a removed change", () => {
  const release = withPassingEvidence();
  const change = release.changes[0];
  const removed = applyRelease(release, { type: "remove", number: change.number }, time);
  assert.equal(applyRelease(removed, { type: "evidence", change }, time), removed);
});

test("versioned local state survives reload and ignores bad entries", () => {
  const demo = createDemo();
  const a = createRelease("r1", "atlas/web", time);
  const b = createRelease("r2", "atlas/ops", time);
  const saved = { version: 1, activeId: b.id, demo, drafts: [a, b] };
  assert.deepEqual(readWorkspace(JSON.stringify(saved)), saved);
  const recovered = readWorkspace(JSON.stringify({ ...saved, activeId: "bad", demo: {}, drafts: [{ id: "bad" }, a] }));
  assert.deepEqual(recovered, { version: 1, activeId: demo.id, demo, drafts: [a] });
  assert.equal(readWorkspace("{").activeId, demo.id);
  assert.deepEqual(readWorkspace(JSON.stringify({ ...saved, version: 2 })).drafts, []);
});

test("malformed nested status data cannot crash workspace loading", () => {
  const demo = createDemo();
  const raw = JSON.stringify({
    version: 1, activeId: demo.id, drafts: [],
    demo: { ...demo, changes: [{ ...demo.changes[0], state: { toString: null } }] },
  });
  assert.deepEqual(readWorkspace(raw).demo, demo);
});
