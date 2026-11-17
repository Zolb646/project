export const WIDTH = 960;
export const HEIGHT = 540;
export const STEP = 50;
export const MAX_LAYERS = 32;
export const MAX_KEYS = 120;
export const MAX_PROJECT_SIZE = 3_500_000;
export const MAX_IMAGE_SIZE = 380_000;

export type Pose = { x: number; y: number; scale: number; rotation: number; opacity: number };
export type Ease = "linear" | "in" | "out" | "smooth" | "hold";
export type Kind = "text" | "rectangle" | "ellipse" | "ring" | "image";
export type Keyframe = { at: number; pose: Pose; easing: Ease };
export type Layer = {
  id: string;
  name: string;
  kind: Kind;
  color: string;
  width: number;
  height: number;
  text: string;
  size: number;
  font: "display" | "mono";
  stroke: number;
  source: string;
  visible: boolean;
  frames: Keyframe[];
};
export type Scene = { version: 1; name: string; background: string; duration: number; layers: Layer[] };
export type History = { past: Scene[]; present: Scene; future: Scene[] };

export const KIND_LABELS: Record<Kind, string> = { text: "Text", rectangle: "Rectangle", ellipse: "Ellipse", ring: "Ring", image: "Image" };
export const EASINGS: Record<Ease, string> = { linear: "Linear", in: "Ease in", out: "Ease out", smooth: "Ease in / out", hold: "Hold" };
export const POSE_CONTROLS: ReadonlyArray<{ key: keyof Pose; label: string; min: number; max: number; unit: string }> = [
  { key: "x", label: "X", min: -1920, max: 2880, unit: "px" },
  { key: "y", label: "Y", min: -1080, max: 1620, unit: "px" },
  { key: "scale", label: "Scale", min: 1, max: 500, unit: "%" },
  { key: "rotation", label: "Rotation", min: -3600, max: 3600, unit: "°" },
  { key: "opacity", label: "Opacity", min: 0, max: 100, unit: "%" },
];
const MAX_HISTORY = 40;
const MAX_DURATION = 15_000;
const MIN_DURATION = 1_000;
const HEX = /^#[\da-f]{6}$/i;

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function snapTime(value: number, duration: number) {
  return clamp(Math.round(value / STEP) * STEP, 0, duration);
}

function ease(value: number, curve: Ease) {
  switch (curve) {
    case "in": return value ** 3;
    case "out": return 1 - (1 - value) ** 3;
    case "smooth": return value * value * (3 - 2 * value);
    case "hold": return 0;
    default: return value;
  }
}

export function poseAt(frames: Keyframe[], at: number): Pose {
  const next = frames.findIndex((frame) => frame.at > at);
  if (next < 0) return frames[frames.length - 1].pose;
  if (next === 0) return frames[0].pose;
  const from = frames[next - 1];
  const to = frames[next];
  const t = ease((at - from.at) / (to.at - from.at), from.easing);
  return {
    x: from.pose.x + (to.pose.x - from.pose.x) * t,
    y: from.pose.y + (to.pose.y - from.pose.y) * t,
    scale: from.pose.scale + (to.pose.scale - from.pose.scale) * t,
    rotation: from.pose.rotation + (to.pose.rotation - from.pose.rotation) * t,
    opacity: from.pose.opacity + (to.pose.opacity - from.pose.opacity) * t,
  };
}

export function createLayer(id: string, kind: Kind, options: Partial<Layer> = {}, pose: Partial<Pose> = {}): Layer {
  return {
    id, kind, name: KIND_LABELS[kind], width: 210, height: 140, color: "#e5ff8d",
    text: "Make it move", size: 64, font: "display", stroke: 3, source: "", visible: true,
    frames: [{ at: 0, easing: "smooth", pose: { x: WIDTH / 2, y: HEIGHT / 2, scale: 100, rotation: 0, opacity: 100, ...pose } }],
    ...options,
  };
}

function animated(layer: Layer, cues: [number, Partial<Pose>, Ease?][]): Layer {
  return { ...layer, frames: [layer.frames[0], ...cues.map(([at, patch, easing = "smooth"]) => ({
    at, easing, pose: { ...layer.frames[0].pose, ...patch },
  }))] };
}

export function blankScene(): Scene {
  return { version: 1, name: "Untitled composition", duration: 6000, background: "#231b35", layers: [] };
}

export function demoScene(preset: "night" | "orbit" = "night"): Scene {
  if (preset === "orbit") return {
    ...blankScene(), name: "Orbit Studies", background: "#172b35", duration: 5000,
    layers: [
      animated(createLayer("orbit-ring", "ring", { name: "Orbit path", color: "#789ba2", width: 665, height: 263, stroke: 2 }, { rotation: -27 }),
        [[2500, { rotation: 27 }], [5000, {}]]),
      animated(createLayer("orbit-body", "ellipse", { name: "Planet", width: 185, height: 185, color: "#ffad71" }, { x: 638, y: 240 }),
        [[2500, { x: 329, y: 300, scale: 72 }], [5000, {}]]),
      animated(createLayer("orbit-title", "text", { name: "Orbit title", text: "ORBIT", size: 152, color: "#f1ead5" }, { x: 350, y: 245 }),
        [[2500, { x: 545, scale: 88 }], [5000, {}]]),
      createLayer("orbit-label", "text", { name: "Caption", text: "MOTION STUDY     /     02", size: 20, color: "#afc9c9", font: "mono" }, { x: 481, y: 453 }),
    ],
  };

  return {
    ...blankScene(), name: "Night Shift", duration: 6000,
    layers: [
      createLayer("top-rule", "rectangle", { name: "Top rule", width: 826, height: 2, color: "#736184" }, { x: 480, y: 80 }),
      createLayer("masthead", "text", { name: "Studio label", text: "MOTION STUDIES   /   VOL. 01", size: 17, font: "mono", color: "#e6dac3" }, { x: 216, y: 51 }),
      createLayer("edition", "text", { name: "Edition label", text: "NIGHT EDITION", size: 17, font: "mono", color: "#e6dac3" }, { x: 820, y: 51 }),
      createLayer("bottom-rule", "rectangle", { name: "Bottom rule", width: 826, height: 2, color: "#736184" }, { x: 480, y: 461 }),
      createLayer("credits", "text", { name: "Footer caption", text: "A STUDY IN KINETIC TYPE", size: 17, font: "mono", color: "#e6dac3" }, { x: 190, y: 488 }),
      animated(createLayer("sun", "ellipse", { name: "Lime disc", width: 282, height: 282 }, { x: 691, y: 274 }),
        [[1800, { x: 735, y: 240, scale: 110 }], [3600, { x: 651, y: 295, scale: 81 }], [6000, {}]]),
      animated(createLayer("ring", "ring", { name: "Orbit", color: "#ac9ddb", width: 420, height: 198, stroke: 2.8 }, { x: 690, y: 275, rotation: -35 }),
        [[2000, { rotation: 39, x: 735 }], [3900, { rotation: 120, x: 651 }], [6000, { rotation: 145 }]]),
      animated(createLayer("night", "text", { name: "Night", text: "NIGHT", size: 144, color: "#f7eed8" }, { x: 302, y: 218 }),
        [[1800, { x: 385, y: 203, rotation: -7 }], [4100, { x: 272, y: 221, scale: 93 }], [6000, {}]]),
      animated(createLayer("shift", "text", { name: "Shift", text: "SHIFT", size: 144, color: "#f7eed8" }, { x: 297, y: 343 }),
        [[1750, { x: 386, y: 328, rotation: 6 }], [4050, { x: 273, y: 351, scale: 93 }], [6000, {}]]),
    ],
  };
}

type Appearance = Pick<Layer, "name" | "color" | "width" | "height" | "text" | "size" | "font" | "stroke">;
export type Edit =
  | { type: "name" | "background"; value: string }
  | { type: "duration"; value: number }
  | { type: "add"; layer: Layer }
  | { type: "remove"; id: string }
  | { type: "visibility"; id: string }
  | { type: "order"; id: string; direction: -1 | 1 }
  | { type: "appearance"; id: string; patch: Partial<Appearance> }
  | { type: "pose"; id: string; at: number; patch: Partial<Pose> }
  | { type: "key" | "deleteKey"; id: string; at: number }
  | { type: "easing"; id: string; at: number; easing: Ease }
  | { type: "move"; id: string; from: number; to: number };

function changeFrames(frames: Keyframe[], at: number, patch: Partial<Pose>, curve?: Ease) {
  const existing = frames.find((frame) => frame.at === at);
  if (!existing && frames.length >= MAX_KEYS) return frames;
  const current = poseAt(frames, at);
  const pose = { ...current };
  for (const { key, min, max } of POSE_CONTROLS) {
    const next = patch[key];
    if (next !== undefined && Number.isFinite(next)) pose[key] = clamp(next, min, max);
  }
  const easing = curve ?? existing?.easing ?? "smooth";
  if (existing && easing === existing.easing && POSE_CONTROLS.every(({ key }) => current[key] === pose[key])) return frames;
  return [...frames.filter((frame) => frame.at !== at), { at, pose, easing }].sort((a, b) => a.at - b.at);
}

function updateLayer(scene: Scene, layer: Layer, edit: Exclude<Edit, { type: "add" | "duration" | "name" | "background" } | { type: "remove" | "order" }>): Layer {
  switch (edit.type) {
    case "visibility":
      return { ...layer, visible: !layer.visible };
    case "appearance": {
      const next = { ...layer, ...edit.patch };
      next.name = next.name.trim().slice(0, 70) || layer.name;
      next.text = next.text.slice(0, 240);
      next.color = HEX.test(next.color) ? next.color : layer.color;
      next.width = clamp(next.width, 1, 1920);
      next.height = clamp(next.height, 1, 1080);
      next.size = clamp(next.size, 8, 300);
      next.stroke = clamp(next.stroke, 1, 40);
      return Object.keys(edit.patch).every((name) => next[name as keyof Appearance] === layer[name as keyof Appearance]) ? layer : next;
    }
    case "pose":
    case "key":
    case "easing": {
      const at = snapTime(edit.at, scene.duration);
      const frames = changeFrames(layer.frames, at, edit.type === "pose" ? edit.patch : {}, edit.type === "easing" ? edit.easing : undefined);
      return frames === layer.frames ? layer : { ...layer, frames };
    }
    case "deleteKey": {
      if (edit.at === 0 || !layer.frames.some(({ at }) => at === edit.at)) return layer;
      return { ...layer, frames: layer.frames.filter(({ at }) => at !== edit.at) };
    }
    case "move": {
      const to = snapTime(edit.to, scene.duration);
      if (edit.from === 0 || layer.frames.some(({ at }) => at === to) || !layer.frames.some(({ at }) => at === edit.from)) return layer;
      return { ...layer, frames: layer.frames.map((frame) => frame.at === edit.from ? { ...frame, at: to } : frame).sort((a, b) => a.at - b.at) };
    }
  }
}

export function applyEdit(scene: Scene, edit: Edit): Scene {
  switch (edit.type) {
    case "name": {
      const name = edit.value.trim().slice(0, 90);
      return !name || name === scene.name ? scene : { ...scene, name };
    }
    case "background":
      return !HEX.test(edit.value) || edit.value === scene.background ? scene : { ...scene, background: edit.value };
    case "duration": {
      if (!Number.isFinite(edit.value)) return scene;
      const duration = clamp(snapTime(edit.value, MAX_DURATION), MIN_DURATION, MAX_DURATION);
      return duration === scene.duration ? scene : { ...scene, duration };
    }
    case "add":
      return scene.layers.length >= MAX_LAYERS || scene.layers.some(({ id }) => id === edit.layer.id) ? scene : { ...scene, layers: [...scene.layers, edit.layer] };
    default: {
      const index = scene.layers.findIndex(({ id }) => id === edit.id);
      if (index < 0) return scene;
      if (edit.type === "remove") return { ...scene, layers: scene.layers.filter(({ id }) => id !== edit.id) };
      const layers = [...scene.layers];
      if (edit.type === "order") {
        const to = index + edit.direction;
        if (to < 0 || to >= layers.length) return scene;
        [layers[index], layers[to]] = [layers[to], layers[index]];
      } else {
        const layer = updateLayer(scene, layers[index], edit);
        if (layer === layers[index]) return scene;
        layers[index] = layer;
      }
      return { ...scene, layers };
    }
  }
}

export function editHistory(history: History, change: Scene | "undo" | "redo"): History {
  if (change === "undo") {
    const previous = history.past.at(-1);
    return previous ? { past: history.past.slice(0, -1), present: previous, future: [history.present, ...history.future] } : history;
  }
  if (change === "redo") {
    const [next, ...rest] = history.future;
    return next ? { past: [...history.past, history.present], present: next, future: rest } : history;
  }
  return change === history.present ? history : { past: [...history.past, history.present].slice(-MAX_HISTORY), present: change, future: [] };
}

function object(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function between(value: unknown, min: number, max: number): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;
}

function string(value: unknown, length: number): value is string {
  return typeof value === "string" && value.length <= length;
}

export function validImage(value: unknown): value is string {
  return string(value, MAX_IMAGE_SIZE) && /^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/]+=*$/.test(value);
}

function validLayer(value: unknown): value is Layer {
  if (!object(value) || !string(value.id, 100) || !value.id || !string(value.name, 70) ||
    typeof value.kind !== "string" || !Object.hasOwn(KIND_LABELS, value.kind) || !string(value.color, 7) || !HEX.test(value.color) ||
    !between(value.width, 1, 1920) || !between(value.height, 1, 1080) || !between(value.size, 8, 300) || !between(value.stroke, 1, 40) ||
    !string(value.text, 240) || (value.font !== "display" && value.font !== "mono") || typeof value.visible !== "boolean" ||
    (value.kind === "image" ? !validImage(value.source) : value.source !== "") ||
    !Array.isArray(value.frames) || value.frames.length === 0 || value.frames.length > MAX_KEYS) return false;
  let previous = -1;
  for (const [index, frame] of value.frames.entries()) {
    if (!object(frame) || !between(frame.at, 0, MAX_DURATION) || frame.at % STEP !== 0 || frame.at <= previous ||
      (index === 0 && frame.at !== 0) || typeof frame.easing !== "string" || !Object.hasOwn(EASINGS, frame.easing) || !object(frame.pose)) return false;
    const pose = frame.pose;
    if (!POSE_CONTROLS.every(({ key, min, max }) => between(pose[key], min, max))) return false;
    previous = frame.at;
  }
  return true;
}

export function withinProjectLimit(raw: string) {
  return raw.length <= MAX_PROJECT_SIZE && new TextEncoder().encode(raw).length <= MAX_PROJECT_SIZE;
}

export function readScene(raw: string): Scene | null {
  if (!withinProjectLimit(raw)) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!object(value) || value.version !== 1 || !string(value.name, 90) || !value.name.trim() ||
      !string(value.background, 7) || !HEX.test(value.background) || !between(value.duration, MIN_DURATION, MAX_DURATION) ||
      value.duration % STEP !== 0 || !Array.isArray(value.layers) || value.layers.length > MAX_LAYERS) return null;
    const duration = value.duration;
    const layers: unknown[] = value.layers;
    if (!layers.every(validLayer)) return null;
    if (new Set(layers.map(({ id }) => id)).size !== layers.length) return null;
    return { version: 1, name: value.name, background: value.background, duration, layers };
  } catch { return null; }
}
