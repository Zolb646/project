"use client";

import { useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { LuDiamond, LuLayers3, LuMinus, LuPlus } from "react-icons/lu";
import { snapTime, STEP, type Layer, type Scene } from "@/lib/motion-studio/model";
import { formatTime } from "./Stage";
import styles from "./studio.module.css";

type KeyDrag = { id: string; from: number; percent: number };
const position = (at: number, duration: number) => `${100 * at / duration}%`;

export default function Timeline({ scene, time, selected, choose, seek, addKey, removeKey, moveKey }: {
  scene: Scene;
  time: number;
  selected: Layer | null;
  choose: (id: string) => void;
  seek: (time: number) => void;
  addKey: () => void;
  removeKey: () => void;
  moveKey: (id: string, from: number, to: number) => boolean;
}) {
  const drag = useRef<{ id: string; from: number; pointer: number; x: number } | null>(null);
  const followFocus = useRef<{ lane: HTMLElement; at: number } | null>(null);
  const [dragging, setDragging] = useState<KeyDrag>();
  const rows = [...scene.layers].reverse();
  const afterEnd = rows.reduce((count, layer) => count + layer.frames.filter(({ at }) => at > scene.duration).length, 0);
  const marks = Array.from({ length: 5 }, (_, index) => scene.duration * index / 4);
  const atKey = selected?.frames.some(({ at }) => at === time);
  const laneValue = (event: PointerEvent<HTMLButtonElement>) => {
    const box = event.currentTarget.parentElement!.getBoundingClientRect();
    return (event.clientX - box.left) / box.width * scene.duration;
  };

  useLayoutEffect(() => {
    const next = followFocus.current;
    if (next) {
      followFocus.current = null;
      next.lane.querySelector<HTMLButtonElement>(`[data-frame="${next.at}"]`)?.focus({ preventScroll: true });
    }
  }, [scene]);

  function pointerStart(event: PointerEvent<HTMLButtonElement>, layer: Layer) {
    if (event.button !== 0) return;
    const time = laneValue(event);
    const { at } = layer.frames.reduce((closest, key) => key.at <= scene.duration && Math.abs(key.at - time) < Math.abs(closest.at - time) ? key : closest);
    const button = event.currentTarget.parentElement?.querySelector<HTMLButtonElement>(`[data-frame="${at}"]`);
    event.preventDefault();
    button?.focus({ preventScroll: true });
    choose(layer.id);
    seek(at);
    if (at === 0) return;
    drag.current = { id: layer.id, from: at, pointer: event.pointerId, x: event.clientX };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function pointerMove(event: PointerEvent<HTMLButtonElement>) {
    const active = drag.current;
    if (!active || active.pointer !== event.pointerId || Math.abs(event.clientX - active.x) < 3) return;
    setDragging({ ...active, percent: 100 * snapTime(laneValue(event), scene.duration) / scene.duration });
  }

  function pointerEnd(event: PointerEvent<HTMLButtonElement>) {
    const active = drag.current;
    if (!active || active.pointer !== event.pointerId) return;
    drag.current = null;
    setDragging(undefined);
    if (event.type === "pointerup" && Math.abs(event.clientX - active.x) >= 3) moveKey(active.id, active.from, laneValue(event));
  }

  function keyPress(event: KeyboardEvent<HTMLButtonElement>, id: string, at: number) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      event.stopPropagation();
      choose(id);
      const to = snapTime(at + (event.key === "ArrowLeft" ? -STEP : STEP) * (event.shiftKey ? 5 : 1), scene.duration);
      const lane = event.currentTarget.parentElement!;
      followFocus.current = { lane, at: to };
      if (!moveKey(id, at, to)) followFocus.current = null;
    }
  }

  return <section className={styles.timeline} aria-label="Timeline">
    <header className={styles.timelineHeader}>
      <div><LuLayers3 /><h2>Timeline</h2><span>{scene.layers.length} {scene.layers.length === 1 ? "layer" : "layers"}</span>
        {afterEnd > 0 && <span title="Extend the composition duration to show these keyframes">{afterEnd} {afterEnd === 1 ? "key" : "keys"} after end</span>}
      </div>
      <div>
        <button type="button" className={styles.small} disabled={!selected || atKey} onClick={addKey}><LuDiamond /> Add keyframe</button>
        <button type="button" className={styles.icon} title="Remove keyframe at playhead" aria-label="Remove keyframe at playhead" disabled={!atKey || time === 0} onClick={removeKey}><LuMinus /></button>
      </div>
    </header>

    <div className={styles.timelineScroll}>
      <div className={styles.tracks}>
        <div className={styles.rulerRow}>
          <span>Tracks</span>
          <div className={styles.ruler}>
            {marks.map((at, index) => <span key={at} aria-hidden style={{ left: position(at, scene.duration) }} data-edge={index === 0 ? "start" : index === 4 ? "end" : undefined}>{(at / 1000).toFixed(1)}s</span>)}
            <input type="range" aria-label="Playhead" min={0} max={scene.duration} step={STEP} value={snapTime(time, scene.duration)}
              aria-valuetext={formatTime(time)} onChange={(event) => seek(Number(event.target.value))} />
          </div>
        </div>
        <div className={styles.needleBox} aria-hidden><span style={{ left: position(time, scene.duration) }} /></div>
        {rows.length ? rows.map((layer) => <div key={layer.id} className={styles.track} data-active={layer.id === selected?.id}>
          <button type="button" onClick={() => choose(layer.id)} title={layer.name}>{layer.name}</button>
          <div className={styles.trackBar} data-muted={!layer.visible} onDoubleClick={(event) => {
            if ((event.target as HTMLElement).closest("button")) return;
            const box = event.currentTarget.getBoundingClientRect();
            choose(layer.id);
            seek((event.clientX - box.left) / box.width * scene.duration);
          }}>
            {layer.frames.filter(({ at }) => at <= scene.duration).map(({ at }) => <button key={at} className={styles.diamond} type="button"
              data-frame={at}
              aria-label={`${layer.name} keyframe at ${(at / 1000).toFixed(2)} seconds`}
              aria-pressed={layer.id === selected?.id && at === time}
              title={`${(at / 1000).toFixed(2)}s · drag to move`}
              style={{ left: dragging?.id === layer.id && dragging.from === at ? `${dragging.percent}%` : position(at, scene.duration) }}
              onKeyDown={(event) => keyPress(event, layer.id, at)}
              onPointerDown={(event) => pointerStart(event, layer)}
              onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={pointerEnd} onLostPointerCapture={pointerEnd}
              onClick={(event) => { if (event.detail === 0) { choose(layer.id); seek(at); } }}>
              <i aria-hidden />
            </button>)}
          </div>
        </div>) : <p className={styles.timelineEmpty}><LuPlus /> Add a layer to create its first track.</p>}
      </div>
    </div>
  </section>;
}
