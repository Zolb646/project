import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import Module from "node:module";
import ts from "typescript";

const source = readFileSync(new URL("../src/lib/motion-studio/model.ts", import.meta.url), "utf8");
const compiled = new Module("motion-studio-model");
compiled._compile(ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, "motion-studio-model.cjs");

const { applyEdit, blankScene, demoScene, editHistory, poseAt, readScene, snapTime } = compiled.exports;
const pose = (x) => ({ x, y: 100, scale: 100, rotation: 0, opacity: 100 });

test("interpolation honors outgoing easing and holds both endpoints", () => {
  const frames = [{ at: 0, pose: pose(0), easing: "out" }, { at: 1000, pose: pose(100), easing: "linear" }];
  assert.equal(poseAt(frames, -100).x, 0);
  assert.equal(poseAt(frames, 500).x, 87.5);
  assert.equal(poseAt(frames, 1200).x, 100);
  assert.equal(poseAt([{ ...frames[0], easing: "hold" }, frames[1]], 750).x, 0);
});

test("edits write keyframes at the snapped playhead and preserve the remaining pose", () => {
  const scene = demoScene();
  const layer = scene.layers.find(({ id }) => id === "night");
  const at = snapTime(1033, scene.duration);
  const expected = poseAt(layer.frames, at);
  const result = applyEdit(scene, { type: "pose", id: layer.id, at: 1033, patch: { x: 120, opacity: -80 } });
  const frame = result.layers.find(({ id }) => id === layer.id).frames.find((frame) => frame.at === at);
  assert.deepEqual(frame.pose, { ...expected, x: 120, opacity: 0 });
  assert.ok(result.layers.find(({ id }) => id === layer.id).frames.some((frame) => frame.at === 0));
});

test("the initial keyframe cannot move and occupied slots preserve both keys", () => {
  let scene = demoScene();
  scene = applyEdit(scene, { type: "pose", id: "night", at: 1000, patch: { x: 21 } });
  scene = applyEdit(scene, { type: "pose", id: "night", at: 1100, patch: { x: 22 } });
  assert.equal(applyEdit(scene, { type: "move", id: "night", from: 0, to: 100 }), scene);
  assert.equal(applyEdit(scene, { type: "move", id: "night", from: 1000, to: 1100 }), scene);
  const result = applyEdit(scene, { type: "move", id: "night", from: 1000, to: 1200 });
  assert.equal(result.layers.find(({ id }) => id === "night").frames.find(({ at }) => at === 1200).pose.x, 21);
});

test("duration and history keep past changes reversible", () => {
  const first = demoScene();
  const current = applyEdit(first, { type: "duration", value: 1000 });
  assert.equal(current.layers, first.layers);
  assert.deepEqual(readScene(JSON.stringify(current)), current);
  assert.deepEqual(applyEdit(current, { type: "duration", value: first.duration }), first);
  const edited = editHistory({ past: [], present: first, future: [] }, current);
  const undone = editHistory(edited, "undo");
  assert.equal(undone.present, first);
  assert.equal(editHistory(undone, "redo").present, current);
  assert.equal(editHistory(undone, blankScene()).future.length, 0);
});

test("project files round-trip and reject invalid frames or remote images", () => {
  const scene = demoScene();
  assert.deepEqual(readScene(JSON.stringify(scene)), scene);
  assert.equal(readScene(JSON.stringify({ ...scene, version: 2 })), null);
  assert.equal(readScene(JSON.stringify({ ...scene, layers: [{ ...scene.layers[0], frames: [] }] })), null);
  assert.equal(readScene(JSON.stringify({ ...scene, layers: [{ ...scene.layers[0], kind: "image", source: "https://example.com/a.jpg" }] })), null);
  assert.equal(readScene("broken"), null);
});

test("project size limits use the same UTF-8 bytes as downloaded files", () => {
  const { withinProjectLimit, MAX_PROJECT_SIZE } = compiled.exports;
  assert.equal(withinProjectLimit("a".repeat(MAX_PROJECT_SIZE)), true);
  assert.equal(withinProjectLimit("é".repeat(MAX_PROJECT_SIZE / 2 + 1)), false);
});
