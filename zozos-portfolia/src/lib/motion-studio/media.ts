import { HEIGHT, MAX_IMAGE_SIZE, validImage, WIDTH, type Scene } from "./model";
import { drawScene, loadImages } from "./render";

function newCanvas(width = WIDTH, height = HEIGHT) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas could not be opened on this device.");
  return { canvas, context };
}

export async function imageAsset(file: File) {
  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 12_000_000) {
    throw new Error("Choose a PNG, JPEG, or WebP image under 12 MB.");
  }
  const url = URL.createObjectURL(file);
  return new Promise<{ source: string; width: number; height: number }>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      try {
        const ratio = Math.min(1, 960 / Math.max(image.naturalWidth, image.naturalHeight));
        const width = Math.max(1, Math.round(image.naturalWidth * ratio));
        const height = Math.max(1, Math.round(image.naturalHeight * ratio));
        const { canvas, context } = newCanvas(width, height);
        context.drawImage(image, 0, 0, width, height);
        const source = canvas.toDataURL("image/webp", .80);
        if (!validImage(source) || source.length > MAX_IMAGE_SIZE) throw new Error("This image is too detailed to save. Try a smaller copy.");
        const size = Math.min(1, 450 / width, 320 / height);
        resolve({ source, width: Math.max(1, Math.round(width * size)), height: Math.max(1, Math.round(height * size)) });
      } catch (error) { reject(error); }
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("This image could not be opened."));
    };
    image.src = url;
  });
}

export function saveBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 3000);
}

export function fileSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "composition";
}

export async function exportFrame(scene: Scene, time: number) {
  const { canvas, context } = newCanvas();
  drawScene(context, scene, time, await loadImages(scene.layers));
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("This frame could not be saved.");
  saveBlob(blob, `${fileSlug(scene.name)}-${(time / 1000).toFixed(2)}s.png`);
}

export async function exportVideo(scene: Scene, signal: AbortSignal, progress: (percent: number) => void) {
  if (typeof MediaRecorder === "undefined" || !HTMLCanvasElement.prototype.captureStream) {
    throw new Error("This browser cannot record the canvas. You can still save a PNG frame.");
  }
  const assets = await loadImages(scene.layers);
  signal.throwIfAborted();
  if (document.hidden) throw new Error("Keep the studio tab visible while exporting video.");
  const { canvas, context } = newCanvas();
  drawScene(context, scene, 0, assets);
  const formats = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/mp4"];
  const mimeType = formats.find((format) => MediaRecorder.isTypeSupported(format));
  const stream = canvas.captureStream(30);
  let frame = 0;
  let cleanup = () => {};

  try {
    const recorder = new MediaRecorder(stream, { ...(mimeType ? { mimeType } : {}), videoBitsPerSecond: 4_000_000 });
    const parts: Blob[] = [];
    const file = await new Promise<Blob>((resolve, reject) => {
      const stop = () => {
        cancelAnimationFrame(frame);
        if (recorder.state !== "inactive") recorder.stop();
      };
      recorder.ondataavailable = ({ data }) => { if (data.size) parts.push(data); };
      recorder.onerror = () => reject(new Error("The browser could not record this composition."));
      recorder.onstop = () => signal.aborted ? reject(signal.reason) : resolve(new Blob(parts, { type: recorder.mimeType }));
      const visibility = () => {
        if (!document.hidden) return;
        stop();
        reject(new Error("Keep the studio tab visible while exporting video."));
      };
      signal.addEventListener("abort", stop, { once: true });
      document.addEventListener("visibilitychange", visibility);
      cleanup = () => {
        signal.removeEventListener("abort", stop);
        document.removeEventListener("visibilitychange", visibility);
      };
      const mark = performance.now();
      recorder.start();
      function tick(now: number) {
        const time = Math.min(scene.duration, now - mark);
        drawScene(context, scene, time, assets);
        progress(Math.round(100 * time / scene.duration));
        if (time >= scene.duration) stop();
        else frame = requestAnimationFrame(tick);
      }
      frame = requestAnimationFrame(tick);
    });
    if (!file.size) throw new Error("The browser returned an empty recording.");
    saveBlob(file, `${fileSlug(scene.name)}.${file.type.includes("mp4") ? "mp4" : "webm"}`);
  } finally {
    cleanup();
    cancelAnimationFrame(frame);
    for (const track of stream.getTracks()) track.stop();
  }
}
