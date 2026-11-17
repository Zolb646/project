"use client";

import Link from "next/link";
import { useEffect, useEffectEvent, useRef, useState, type ChangeEvent } from "react";
import {
  LuArrowUpRight, LuCircle, LuCircleDot, LuClapperboard, LuDownload, LuEye, LuEyeOff,
  LuFileJson, LuFilm, LuFolderOpen, LuImage, LuImagePlus, LuLayers3, LuRectangleHorizontal,
  LuRedo2, LuType, LuUndo2, LuX,
} from "react-icons/lu";
import { blankScene, clamp, createLayer, demoScene, MAX_LAYERS, MAX_PROJECT_SIZE, readScene, snapTime, STEP, withinProjectLimit, type Edit, type Kind, type Layer, type Scene } from "@/lib/motion-studio/model";
import { exportFrame, exportVideo, fileSlug, imageAsset, saveBlob } from "@/lib/motion-studio/media";
import Inspector from "./Inspector";
import Stage from "./Stage";
import Timeline from "./Timeline";
import { changeScene, useMotionWorkspace } from "./workspace";
import styles from "./studio.module.css";

const layerIcons = { text: LuType, rectangle: LuRectangleHorizontal, ellipse: LuCircle, ring: LuCircleDot, image: LuImagePlus };
const tools = [
  { kind: "text", label: "Text" }, { kind: "rectangle", label: "Shape" },
  { kind: "ellipse", label: "Circle" }, { kind: "ring", label: "Ring" }, { kind: "image", label: "Image" },
] as const;

export default function MotionStudio() {
  const { history, saved } = useMotionWorkspace();
  const scene = history.present;
  const [selectedId, setSelectedId] = useState<string | null>("night");
  const [playhead, setPlayhead] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(true);
  const [notice, setNotice] = useState("");
  const [recording, setRecording] = useState<number | null>(null);
  const [exportError, setExportError] = useState("");
  const timeRef = useRef(0);
  const file = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const templates = useRef<HTMLDialogElement>(null);
  const exportsDialog = useRef<HTMLDialogElement>(null);
  const exportController = useRef<AbortController | null>(null);
  const selected = scene.layers.find(({ id }) => id === selectedId) ?? null;
  const time = clamp(playhead, 0, scene.duration);
  const at = snapTime(time, scene.duration);

  function setTime(value: number) {
    timeRef.current = value;
    setPlayhead(value);
  }

  function seek(value: number) {
    setPlaying(false);
    setTime(snapTime(value, scene.duration));
  }

  function togglePlay() {
    if (playing) { seek(time); return; }
    if (time >= scene.duration) setTime(0);
    setPlaying(true);
  }

  function edit(change: Edit) {
    if (["pose", "easing", "key", "deleteKey", "move", "duration"].includes(change.type)) seek(at);
    const changed = changeScene(change);
    if (changed && change.type === "duration" && change.value < time) setTime(Math.max(1000, snapTime(change.value, scene.duration)));
    if (!changed) setNotice("The edit would exceed the 3.5 MB project limit. Try removing an image layer.");
    return changed;
  }

  function moveKey(id: string, from: number, to: number) {
    const target = snapTime(to, scene.duration);
    const layer = scene.layers.find((item) => item.id === id);
    if (!layer || from === 0 || layer.frames.some(({ at }) => at === target)) return false;
    if (!edit({ type: "move", id, from, to: target })) return false;
    seek(target);
    return true;
  }

  function add(kind: Exclude<Kind, "image">) {
    const id = crypto.randomUUID();
    if (edit({ type: "add", layer: createLayer(id, kind, kind === "ellipse" ? { width: 150, height: 150 } : {}) })) setSelectedId(id);
  }

  function duplicate(layer: Layer) {
    const id = crypto.randomUUID();
    const copy: Layer = {
      ...layer, id, name: `${layer.name.slice(0, 65)} copy`,
      frames: layer.frames.map((frame) => ({
        ...frame, pose: { ...frame.pose, x: clamp(frame.pose.x + 20, -1920, 2880), y: clamp(frame.pose.y + 20, -1080, 1620) },
      })),
    };
    if (edit({ type: "add", layer: copy })) setSelectedId(id);
  }

  async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const target = event.currentTarget;
    const source = target.files?.[0];
    target.value = "";
    if (!source) return;
    try {
      const asset = await imageAsset(source);
      const id = crypto.randomUUID();
      if (edit({ type: "add", layer: createLayer(id, "image", { ...asset, name: source.name.replace(/\.[^.]+$/, "").slice(0, 70) || "Image" }) })) setSelectedId(id);
    } catch (error) { setNotice((error as Error).message); }
  }

  function openScene(next: Scene) {
    seek(0);
    changeScene(next);
    const main = next.layers.find(({ kind, frames }) => kind === "text" && frames.length > 1);
    setSelectedId(main?.id ?? next.layers.at(-1)?.id ?? null);
    templates.current?.close();
  }

  async function uploadProject(event: ChangeEvent<HTMLInputElement>) {
    const target = event.currentTarget;
    const picked = target.files?.[0];
    target.value = "";
    if (!picked) return;
    try {
      const next = picked.size <= MAX_PROJECT_SIZE ? readScene(await picked.text()) : null;
      if (!next) throw new Error("Choose a valid Motion Studio project file under 3.5 MB.");
      openScene(next);
      setNotice("Project opened.");
    } catch (error) { setNotice((error as Error).message); }
  }

  async function record() {
    if (exportController.current) return;
    const controller = new AbortController();
    exportController.current = controller;
    setRecording(0);
    setExportError("");
    seek(at);
    try {
      await exportVideo(scene, controller.signal, setRecording);
      exportsDialog.current?.close();
      setNotice("Video downloaded.");
    } catch (error) {
      if (!controller.signal.aborted) setExportError((error as Error).message);
    } finally {
      exportController.current = null;
      setRecording(null);
    }
  }

  async function saveFrame() {
    setExportError("");
    try {
      await exportFrame(scene, time);
      exportsDialog.current?.close();
      setNotice("PNG frame downloaded.");
    } catch (error) { setExportError((error as Error).message); }
  }

  function saveProject() {
    const text = JSON.stringify(scene);
    if (!withinProjectLimit(text)) {
      setExportError("The project is over 3.5 MB. Remove an image layer before saving a project file.");
      return;
    }
    saveBlob(new Blob([text], { type: "application/json" }), `${fileSlug(scene.name)}.motion.json`);
    exportsDialog.current?.close();
    setNotice("Project file downloaded.");
  }

  const shortcuts = useEffectEvent((event: KeyboardEvent) => {
    const target = event.target;
    if (document.querySelector("dialog[open]") || (target instanceof HTMLElement && target.closest("input, textarea, select, [contenteditable]"))) return;
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
      event.preventDefault();
      changeScene(event.shiftKey ? "redo" : "undo");
    } else if (event.code === "Space" && !(target instanceof HTMLElement && target.closest("button, a"))) {
      event.preventDefault();
      if (!event.repeat) togglePlay();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      seek(time + (event.key === "ArrowLeft" ? -STEP : STEP) * (event.shiftKey ? 5 : 1));
    }
  });

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => shortcuts(event);
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const start = performance.now() - timeRef.current;
    let frame = 0;
    function tick(now: number) {
      const elapsed = now - start;
      if (!loop && elapsed >= scene.duration) {
        setTime(scene.duration);
        setPlaying(false);
        return;
      }
      setTime(elapsed % scene.duration);
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [loop, playing, scene.duration]);

  useEffect(() => () => exportController.current?.abort(), []);

  return <main className={styles.studio}>
    <a className={styles.skip} href="#motion-timeline">Skip to timeline</a>
    <header className={styles.topbar}>
      <div className={styles.identity}>
        <Link href="/projects/motion-studio" className={styles.brand} aria-label="Motion Studio case study" title="Portfolio case study">
          <span><LuClapperboard /></span> Motion Studio <LuArrowUpRight className={styles.external} />
        </Link>
        <div className={styles.projectName}>
          <button type="button" title="Composition settings" onClick={() => setSelectedId(null)}>{scene.name}</button>
          <span data-saved={saved}>{saved ? "Local draft" : "Storage unavailable"}</span>
        </div>
      </div>
      <div className={styles.topActions}>
        <button type="button" className={styles.button} onClick={() => templates.current?.showModal()}><LuFilm /> Templates</button>
        <button type="button" className={styles.button} title="Open project file" onClick={() => file.current?.click()}><LuFolderOpen /> <span>Open</span></button>
        <div className={styles.history}>
          <button type="button" className={styles.icon} aria-label="Undo" title="Undo (Ctrl or ⌘ Z)" disabled={!history.past.length} onClick={() => changeScene("undo")}><LuUndo2 /></button>
          <button type="button" className={styles.icon} aria-label="Redo" title="Redo (Ctrl or ⌘ Shift Z)" disabled={!history.future.length} onClick={() => changeScene("redo")}><LuRedo2 /></button>
        </div>
        <button type="button" className={styles.primary} onClick={() => { setExportError(""); exportsDialog.current?.showModal(); }}><LuDownload /> Export</button>
      </div>
    </header>

    {!saved && <p role="alert" className={styles.storageError}>This draft is in memory. Export a project file before refreshing the page.</p>}

    <div className={styles.workbench}>
      <aside className={styles.layers} aria-label="Layer panel">
        <header className={styles.panelHead}><div><LuLayers3 /><h2>Layers</h2></div><span>{scene.layers.length}</span></header>
        <div className={styles.toolShelf} role="group" aria-label="Add a layer">
          {tools.map(({ kind, label }) => {
            const Icon = layerIcons[kind];
            return <button type="button" key={kind} title={`Add ${label.toLowerCase()}`} disabled={scene.layers.length >= MAX_LAYERS}
              onClick={() => kind === "image" ? image.current?.click() : add(kind)}>
              <Icon />{label}
            </button>;
          })}
        </div>
        <ul className={styles.layerStack}>
          {[...scene.layers].reverse().map((layer) => {
            const Icon = layerIcons[layer.kind];
            return <li key={layer.id} data-selected={layer.id === selected?.id} data-visible={layer.visible}>
              <button type="button" className={styles.layerName} aria-pressed={layer.id === selected?.id} onClick={() => setSelectedId(layer.id)}>
                <span style={{ color: layer.kind === "image" ? undefined : layer.color }}><Icon /></span><span>{layer.name}</span>
              </button>
              <button type="button" className={styles.icon} aria-label={`${layer.visible ? "Hide" : "Show"} ${layer.name}`} onClick={() => edit({ type: "visibility", id: layer.id })}>
                {layer.visible ? <LuEye /> : <LuEyeOff />}
              </button>
            </li>;
          })}
        </ul>
        {scene.layers.length === 0 && <p className={styles.hint}>Add text, a shape, or an image to begin.</p>}
      </aside>

      <Stage scene={scene} time={time} selected={selected?.id ?? null} playing={playing} loop={loop} select={setSelectedId}
        togglePlay={togglePlay} toggleLoop={() => setLoop(!loop)} seek={seek} commit={(id, patch) => edit({ type: "pose", id, at, patch })} />
      <Inspector scene={scene} layer={selected} time={at} edit={edit} duplicate={duplicate} clear={() => setSelectedId(null)} />

      <div className={styles.timelineArea} id="motion-timeline">
        <Timeline scene={scene} time={time} selected={selected} choose={setSelectedId} seek={seek}
          addKey={() => { if (selected) edit({ type: "key", id: selected.id, at }); }}
          removeKey={() => { if (selected) edit({ type: "deleteKey", id: selected.id, at }); }} moveKey={moveKey} />
      </div>
    </div>

    <input ref={image} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={uploadImage} />
    <input ref={file} type="file" accept=".json,application/json" hidden onChange={uploadProject} />

    <dialog ref={templates} aria-labelledby="template-heading" className={styles.dialog}>
      <header className={styles.dialogHead}><h2 id="template-heading">Start a composition</h2><button type="button" className={styles.icon} aria-label="Close templates" onClick={() => templates.current?.close()}><LuX /></button></header>
      <div className={styles.templates}>
        <button type="button" onClick={() => openScene(demoScene())}><span className={styles.templateNight}>NIGHT<br />SHIFT</span><strong>Night Shift</strong><small>Kinetic typography</small></button>
        <button type="button" onClick={() => openScene(demoScene("orbit"))}><span className={styles.templateOrbit}>ORBIT</span><strong>Orbit Studies</strong><small>Animated geometry</small></button>
        <button type="button" onClick={() => openScene(blankScene())}><span className={styles.templateBlank}>+</span><strong>Blank</strong><small>960 × 540 canvas</small></button>
      </div>
      <p>Switching templates can be undone.</p>
    </dialog>

    <dialog ref={exportsDialog} aria-labelledby="export-heading" className={styles.dialog} onClose={() => exportController.current?.abort()}>
      <header className={styles.dialogHead}><h2 id="export-heading">Export composition</h2><button type="button" className={styles.icon} aria-label="Close export" onClick={() => exportsDialog.current?.close()}><LuX /></button></header>
      {recording !== null ? <div className={styles.recording}>
        <label htmlFor="export-progress">Recording at 960 × 540</label><progress id="export-progress" max={100} value={recording} />
        <button type="button" className={styles.button} onClick={() => exportController.current?.abort()}>Cancel export</button>
      </div> : <div className={styles.exportOptions}>
        <button type="button" onClick={record}><LuFilm /><span><strong>Export video</strong><small>960 × 540 · {(scene.duration / 1000).toFixed(2)} seconds</small></span></button>
        <button type="button" onClick={saveFrame}><LuImage /><span><strong>Save current frame</strong><small>PNG image at the playhead</small></span></button>
        <button type="button" onClick={saveProject}><LuFileJson /><span><strong>Save project file</strong><small>Editable Motion Studio JSON</small></span></button>
      </div>}
      {exportError && <p role="alert" className={styles.storageError}>{exportError}</p>}
    </dialog>

    <div role="status" className={styles.notice}>{notice && <>{notice}<button type="button" className={styles.icon} aria-label="Dismiss message" onClick={() => setNotice("")}><LuX /></button></>}</div>
  </main>;
}
