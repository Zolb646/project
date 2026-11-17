"use client";

import { useState, type ReactNode } from "react";
import { LuArrowDown, LuArrowUp, LuCopy, LuDiamond, LuEye, LuEyeOff, LuSlidersHorizontal, LuTrash2 } from "react-icons/lu";
import { EASINGS, KIND_LABELS, MAX_LAYERS, POSE_CONTROLS, poseAt, type Ease, type Edit, type Layer, type Scene } from "@/lib/motion-studio/model";
import styles from "./studio.module.css";

function Field({ label, suffix, children }: { label: string; suffix?: string; children: ReactNode }) {
  return <label className={styles.field}><span>{label}</span><div>{children}{suffix && <span aria-hidden>{suffix}</span>}</div></label>;
}

function NumberField({ label, value, min, max, suffix, commit }: {
  label: string; value: number; min?: number; max?: number; suffix?: string; commit: (value: number) => void;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  return <Field label={label} suffix={suffix}>
    <input aria-label={label} type="number" step="any" min={min} max={max} value={draft ?? Number(value.toFixed(2))}
      onChange={(event) => setDraft(event.target.value)} onBlur={() => {
        if (draft !== null && draft.trim() && Number.isFinite(Number(draft))) commit(Number(draft));
        setDraft(null);
      }} onKeyDown={(event) => {
        if (event.key === "Enter") event.currentTarget.blur();
        if (event.key === "Escape") setDraft(null);
      }} />
  </Field>;
}

function TextField({ label, value, length, multiline, commit }: {
  label: string; value: string; length: number; multiline?: boolean; commit: (value: string) => void;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const change = (value: string) => setDraft(value);
  const blur = () => {
    if (draft !== null) commit(draft);
    setDraft(null);
  };
  return <Field label={label}>
    {multiline ? <textarea aria-label={label} rows={2} value={draft ?? value} maxLength={length}
      onChange={(event) => change(event.target.value)} onBlur={blur} /> :
      <input aria-label={label} value={draft ?? value} maxLength={length} onChange={(event) => change(event.target.value)} onBlur={blur}
        onKeyDown={(event) => { if (event.key === "Enter") event.currentTarget.blur(); if (event.key === "Escape") setDraft(null); }} />}
  </Field>;
}

function ColorField({ label, value, commit }: { label: string; value: string; commit: (value: string) => void }) {
  return <Field label={label}><input aria-label={label} type="color" value={value} onChange={(event) => commit(event.target.value)} /><code>{value.toUpperCase()}</code></Field>;
}

export default function Inspector({ scene, layer, time, edit, duplicate, clear }: {
  scene: Scene; layer: Layer | null; time: number; edit: (edit: Edit) => void; duplicate: (layer: Layer) => void; clear: () => void;
}) {
  const index = scene.layers.findIndex(({ id }) => id === layer?.id);
  const pose = layer && poseAt(layer.frames, time);
  const keyframe = layer?.frames.find(({ at }) => at === time);
  const appearance = (patch: Extract<Edit, { type: "appearance" }>["patch"]) => { if (layer) edit({ type: "appearance", id: layer.id, patch }); };

  return <aside className={styles.inspector} aria-label="Inspector">
    <header className={styles.panelHead}>
      <div><LuSlidersHorizontal /><h2>Inspector</h2></div>
      {layer && <button type="button" className={styles.textButton} onClick={clear}>Scene</button>}
    </header>
    {layer && pose ? <>
      <div className={styles.objectHead}>
        <span>{KIND_LABELS[layer.kind]} layer</span>
        <div className={styles.layerActions}>
          <button type="button" className={styles.icon} aria-label="Bring layer forward" title="Bring forward" disabled={index === scene.layers.length - 1} onClick={() => edit({ type: "order", id: layer.id, direction: 1 })}><LuArrowUp /></button>
          <button type="button" className={styles.icon} aria-label="Send layer backward" title="Send backward" disabled={index === 0} onClick={() => edit({ type: "order", id: layer.id, direction: -1 })}><LuArrowDown /></button>
          <button type="button" className={styles.icon} aria-label="Duplicate layer" title="Duplicate layer" disabled={scene.layers.length >= MAX_LAYERS} onClick={() => duplicate(layer)}><LuCopy /></button>
          <button type="button" className={styles.icon} aria-label="Delete layer" title="Delete layer" onClick={() => edit({ type: "remove", id: layer.id })}><LuTrash2 /></button>
        </div>
      </div>
      <div className={styles.inspectorBody} key={layer.id}>
        <TextField label="Layer name" length={70} value={layer.name} commit={(name) => appearance({ name })} />
        <div className={styles.inspectorSection}>
          <h3>Transform <span title="Transform edits write a keyframe at the playhead"><LuDiamond /> {keyframe ? "On keyframe" : "Auto-key"}</span></h3>
          <div className={styles.pairs}>
            {POSE_CONTROLS.map(({ key, label, min, max, unit }) => <NumberField key={key} label={label} suffix={unit}
              min={min} max={max} value={pose[key]} commit={(value) => edit({ type: "pose", id: layer.id, at: time, patch: { [key]: value } })} />)}
          </div>
          <Field label="Easing"><select aria-label="Easing" value={keyframe?.easing ?? ""} onChange={(event) => edit({ type: "easing", id: layer.id, at: time, easing: event.target.value as Ease })}>
            {!keyframe && <option value="" disabled>Choose to add keyframe</option>}
            {Object.entries(EASINGS).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
          </select></Field>
        </div>
        <div className={styles.inspectorSection}>
          <h3>Appearance</h3>
          {layer.kind === "text" ? <>
            <TextField label="Text" length={240} multiline value={layer.text} commit={(text) => appearance({ text })} />
            <div className={styles.pairs}>
              <NumberField label="Size" suffix="px" value={layer.size} min={8} max={300} commit={(size) => appearance({ size })} />
              <Field label="Typeface"><select aria-label="Typeface" value={layer.font} onChange={(event) => appearance({ font: event.target.value as Layer["font"] })}>
                <option value="display">Display</option><option value="mono">Mono</option>
              </select></Field>
            </div>
          </> : <div className={styles.pairs}>
            <NumberField label="Width" suffix="px" value={layer.width} min={1} max={1920} commit={(width) => appearance({ width })} />
            <NumberField label="Height" suffix="px" value={layer.height} min={1} max={1080} commit={(height) => appearance({ height })} />
            {layer.kind === "ring" && <NumberField label="Stroke" suffix="px" value={layer.stroke} min={1} max={40} commit={(stroke) => appearance({ stroke })} />}
          </div>}
          {layer.kind !== "image" && <ColorField label="Color" value={layer.color} commit={(color) => appearance({ color })} />}
        </div>
        <button type="button" className={styles.button} onClick={() => edit({ type: "visibility", id: layer.id })}>
          {layer.visible ? <LuEyeOff /> : <LuEye />} {layer.visible ? "Hide layer" : "Show layer"}
        </button>
      </div>
    </> : <div className={styles.inspectorBody}>
      <h3>Composition settings</h3>
      <TextField label="Project name" length={90} value={scene.name} commit={(value) => edit({ type: "name", value })} />
      <NumberField label="Duration" suffix="s" min={1} max={15} value={scene.duration / 1000} commit={(value) => edit({ type: "duration", value: value * 1000 })} />
      <ColorField label="Background" value={scene.background} commit={(value) => edit({ type: "background", value })} />
      <p className={styles.hint}>Select a layer on the stage or timeline to animate it.</p>
    </div>}
  </aside>;
}
