"use client";

import { useSyncExternalStore } from "react";
import { applyEdit, demoScene, editHistory, readScene, withinProjectLimit, type Edit, type History, type Scene } from "@/lib/motion-studio/model";

const KEY = "motion-studio-v1";
type Workspace = { history: History; saved: boolean };
const initialize = (scene = demoScene(), saved = true): Workspace => ({ history: { past: [], present: scene, future: [] }, saved });
const initial = initialize();
let data: Workspace | undefined;
const listeners = new Set<() => void>();

function getClient() {
  if (!data) {
    try {
      const raw = window.localStorage.getItem(KEY);
      const scene = raw ? readScene(raw) : null;
      data = scene ? initialize(scene) : initial;
    } catch { data = initialize(undefined, false); }
  }
  return data;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export function useMotionWorkspace() {
  return useSyncExternalStore(subscribe, getClient, () => initial);
}

export function changeScene(change: Edit | Scene | "undo" | "redo") {
  const before = getClient();
  const next = typeof change === "string" || "version" in change ? change : applyEdit(before.history.present, change);
  const history = editHistory(before.history, next);
  if (history === before.history) return true;
  const value = JSON.stringify(history.present);
  if (!withinProjectLimit(value)) return false;
  let saved = false;
  try {
    window.localStorage.setItem(KEY, value);
    saved = true;
  } catch { /* The in-memory draft remains available for export. */ }
  data = { history, saved };
  for (const listener of listeners) listener();
  return true;
}
