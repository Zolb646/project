import { HEIGHT, poseAt, WIDTH, type Layer, type Pose, type Scene } from "./model";

const fonts = {
  display: '900 %s "Arial Black", Arial, sans-serif',
  mono: '600 %s "Courier New", monospace',
};

function setFont(context: CanvasRenderingContext2D, layer: Layer) {
  context.font = fonts[layer.font].replace("%s", `${layer.size}px`);
  if ("letterSpacing" in context) context.letterSpacing = layer.font === "display" ? `${-layer.size * .055}px` : "0px";
  context.textAlign = "center";
  context.textBaseline = "middle";
}

function splitText(layer: Layer) {
  return layer.text.split("\n");
}

function bounds(context: CanvasRenderingContext2D, layer: Layer) {
  if (layer.kind !== "text") return { width: layer.width, height: layer.height };
  setFont(context, layer);
  const lines = splitText(layer);
  return {
    width: Math.max(12, ...lines.map((line) => context.measureText(line).width)),
    height: Math.max(16, layer.size * (1 + (lines.length - 1) * 1.08)),
  };
}

export type ImageAssets = ReadonlyMap<string, HTMLImageElement>;
const cachedImages = new Map<string, Promise<HTMLImageElement | null>>();

function imageFor(source: string) {
  const existing = cachedImages.get(source);
  if (existing) return existing;
  const pending = new Promise<HTMLImageElement | null>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = source;
  });
  if (cachedImages.size >= 40) {
    const oldest = cachedImages.keys().next().value;
    if (oldest) cachedImages.delete(oldest);
  }
  cachedImages.set(source, pending);
  return pending;
}

export async function loadImages(layers: Layer[]) {
  const sources = [...new Set(layers.filter(({ kind }) => kind === "image").map(({ source }) => source))];
  const images = await Promise.all(sources.map(async (source) => [source, await imageFor(source)] as const));
  return new Map(images.filter((entry): entry is readonly [string, HTMLImageElement] => Boolean(entry[1])));
}

export function hitLayer(context: CanvasRenderingContext2D, scene: Scene, time: number, x: number, y: number) {
  return [...scene.layers].reverse().find((layer) => {
    if (!layer.visible) return false;
    const pose = poseAt(layer.frames, time);
    if (pose.opacity === 0) return false;
    const angle = pose.rotation * Math.PI / 180;
    const dx = (x - pose.x) * 100 / pose.scale;
    const dy = (y - pose.y) * 100 / pose.scale;
    const localX = dx * Math.cos(angle) + dy * Math.sin(angle);
    const localY = -dx * Math.sin(angle) + dy * Math.cos(angle);
    const { width, height } = bounds(context, layer);
    if (layer.kind === "ellipse" || layer.kind === "ring") {
      const radius = Math.hypot(localX / (width / 2), localY / (height / 2));
      return layer.kind === "ellipse" ? radius <= 1 : Math.abs(radius - 1) <= .11;
    }
    return Math.abs(localX) <= width / 2 + 4 && Math.abs(localY) <= height / 2 + 4;
  });
}

type Overlays = { selected?: string | null; ghost?: { id: string; pose: Pose } };

export function drawScene(context: CanvasRenderingContext2D, scene: Scene, time: number, assets: ImageAssets, overlays: Overlays = {}) {
  context.fillStyle = scene.background;
  context.fillRect(0, 0, WIDTH, HEIGHT);
  for (const layer of scene.layers) {
    if (!layer.visible) continue;
    const pose = overlays.ghost?.id === layer.id ? overlays.ghost.pose : poseAt(layer.frames, time);
    context.save();
    context.translate(pose.x, pose.y);
    context.rotate(pose.rotation * Math.PI / 180);
    context.scale(pose.scale / 100, pose.scale / 100);
    context.globalAlpha = pose.opacity / 100;
    context.fillStyle = layer.color;
    if (layer.kind === "text") {
      setFont(context, layer);
      const lines = splitText(layer);
      lines.forEach((line, index) => context.fillText(line, 0, (index - (lines.length - 1) / 2) * layer.size * 1.08));
    } else if (layer.kind === "rectangle") {
      context.fillRect(-layer.width / 2, -layer.height / 2, layer.width, layer.height);
    } else if (layer.kind === "image") {
      const image = assets.get(layer.source);
      if (image) context.drawImage(image, -layer.width / 2, -layer.height / 2, layer.width, layer.height);
    } else {
      context.beginPath();
      context.ellipse(0, 0, layer.width / 2, layer.height / 2, 0, 0, Math.PI * 2);
      if (layer.kind === "ellipse") context.fill();
      else {
        context.lineWidth = layer.stroke;
        context.strokeStyle = layer.color;
        context.stroke();
      }
    }
    context.restore();
  }

  const selected = scene.layers.find(({ id, visible }) => id === overlays.selected && visible);
  if (!selected) return;
  const pose = overlays.ghost?.id === selected.id ? overlays.ghost.pose : poseAt(selected.frames, time);
  const { width, height } = bounds(context, selected);
  const w = width * pose.scale / 100 / 2 + 7;
  const h = height * pose.scale / 100 / 2 + 7;
  context.save();
  context.translate(pose.x, pose.y);
  context.rotate(pose.rotation * Math.PI / 180);
  context.strokeStyle = "#c5b3ff";
  context.fillStyle = "#eee6ff";
  context.lineWidth = 1.8;
  context.strokeRect(-w, -h, w * 2, h * 2);
  for (const x of [-w, w]) for (const y of [-h, h]) {
    context.fillRect(x - 3, y - 3, 6, 6);
    context.strokeRect(x - 3, y - 3, 6, 6);
  }
  context.restore();
}
