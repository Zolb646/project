"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { LuChevronFirst, LuFocus, LuMinus, LuPause, LuPlay, LuPlus, LuRepeat2 } from "react-icons/lu";
import { clamp, HEIGHT, poseAt, WIDTH, type Pose, type Scene } from "@/lib/motion-studio/model";
import { drawScene, hitLayer, loadImages, type ImageAssets } from "@/lib/motion-studio/render";
import styles from "./studio.module.css";

export const formatTime = (time: number) => `00:${(time / 1000).toFixed(2).padStart(5, "0")}`;
type Drag = { id: string; from: { x: number; y: number }; pose: Pose; pointer: number };

export default function Stage({ scene, time, selected, playing, loop, select, togglePlay, toggleLoop, seek, commit }: {
  scene: Scene;
  time: number;
  selected: string | null;
  playing: boolean;
  loop: boolean;
  select: (id: string | null) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  seek: (time: number) => void;
  commit: (id: string, pose: Partial<Pose>) => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const dragging = useRef<Drag | null>(null);
  const [ghost, setGhost] = useState<{ id: string; pose: Pose }>();
  const [assets, setAssets] = useState<ImageAssets>(new Map());
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    let current = true;
    void loadImages(scene.layers).then((images) => { if (current) setAssets(images); });
    return () => { current = false; };
  }, [scene.layers]);

  useEffect(() => {
    const context = canvas.current?.getContext("2d");
    if (context) drawScene(context, scene, time, assets, { selected: playing ? null : selected, ghost });
  }, [assets, ghost, playing, scene, selected, time]);

  function pointer(event: PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: (event.clientX - rect.left) / rect.width * WIDTH, y: (event.clientY - rect.top) / rect.height * HEIGHT };
  }

  function start(event: PointerEvent<HTMLCanvasElement>) {
    if (event.button !== 0 || playing || dragging.current) return;
    const context = event.currentTarget.getContext("2d");
    if (!context) return;
    const from = pointer(event);
    const layer = hitLayer(context, scene, time, from.x, from.y);
    select(layer?.id ?? null);
    if (!layer) return;
    dragging.current = { id: layer.id, from, pose: poseAt(layer.frames, time), pointer: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function getPose(event: PointerEvent<HTMLCanvasElement>, drag: Drag): Pose {
    const point = pointer(event);
    return { ...drag.pose, x: Math.round(drag.pose.x + point.x - drag.from.x), y: Math.round(drag.pose.y + point.y - drag.from.y) };
  }

  function move(event: PointerEvent<HTMLCanvasElement>) {
    const drag = dragging.current;
    if (drag?.pointer === event.pointerId) setGhost({ id: drag.id, pose: getPose(event, drag) });
  }

  function finish(event: PointerEvent<HTMLCanvasElement>) {
    const drag = dragging.current;
    if (drag?.pointer !== event.pointerId) return;
    dragging.current = null;
    setGhost(undefined);
    if (event.type !== "pointerup") return;
    const { x, y } = getPose(event, drag);
    if (Math.hypot(x - drag.pose.x, y - drag.pose.y) > 2) commit(drag.id, { x, y });
  }

  return <section className={styles.stagePanel} aria-label="Composition">
    <div className={styles.stageHead}>
      <div><span className={styles.stageDot} /> <strong>Composition</strong></div>
      <div className={styles.stageOptions}>
        <span>960 × 540</span>
        <button type="button" className={styles.icon} aria-label="Zoom out" title="Zoom out" disabled={zoom <= 60} onClick={() => setZoom(clamp(zoom - 10, 60, 100))}><LuMinus /></button>
        <button type="button" className={styles.zoom} title="Fit composition" onClick={() => setZoom(100)}>{zoom === 100 ? "Fit" : `${zoom}%`}</button>
        <button type="button" className={styles.icon} aria-label="Zoom in" title="Zoom in" disabled={zoom >= 100} onClick={() => setZoom(clamp(zoom + 10, 60, 100))}><LuPlus /></button>
      </div>
    </div>
    <div className={styles.stageSurface}>
      <div className={styles.canvasFrame} style={{ width: `${zoom}%` }}>
        <canvas ref={canvas} width={WIDTH} height={HEIGHT} role="img" aria-label="Live preview of the composition"
          onPointerDown={start} onPointerMove={move} onPointerUp={finish} onPointerCancel={finish} onLostPointerCapture={finish} />
      </div>
    </div>
    <div className={styles.transport}>
      <output aria-label="Current time">{formatTime(time)}</output>
      <div>
        <button type="button" className={styles.icon} onClick={() => seek(0)} aria-label="Return to start" title="Return to start"><LuChevronFirst /></button>
        <button type="button" className={styles.play} aria-label={playing ? "Pause" : "Play"} title={playing ? "Pause (Space)" : "Play (Space)"} onClick={togglePlay}>{playing ? <LuPause /> : <LuPlay />}</button>
        <button type="button" className={styles.icon} aria-pressed={loop} onClick={toggleLoop} aria-label="Loop playback" title="Loop playback"><LuRepeat2 /></button>
      </div>
      <button type="button" className={styles.fit} onClick={() => setZoom(100)} title="Fit composition"><LuFocus /> <span>Fit stage</span></button>
    </div>
  </section>;
}
