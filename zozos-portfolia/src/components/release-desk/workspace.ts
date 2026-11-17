"use client";

import { useMemo, useSyncExternalStore } from "react";
import { readWorkspace, type Workspace } from "@/lib/release-desk/model";

const KEY = "release-desk-v1";
const CHANGE_EVENT = "release-desk-storage";
let fallback: string | null = null;
let storageFailed = false;

function snapshot() {
  if (storageFailed) return fallback;
  try { return window.localStorage.getItem(KEY); } catch {
    storageFailed = true;
    return fallback;
  }
}

function subscribe(update: () => void) {
  window.addEventListener("storage", update);
  window.addEventListener(CHANGE_EVENT, update);
  return () => {
    window.removeEventListener("storage", update);
    window.removeEventListener(CHANGE_EVENT, update);
  };
}

export function useWorkspace() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => null);
  const storageAvailable = useSyncExternalStore(subscribe, () => !storageFailed, () => true);
  const workspace = useMemo(() => readWorkspace(raw), [raw]);
  return { workspace, storageAvailable };
}

export function updateWorkspace(update: (workspace: Workspace) => Workspace) {
  const previous = readWorkspace(snapshot());
  const next = update(previous);
  if (next === previous) return;
  const value = JSON.stringify(next);
  try {
    window.localStorage.setItem(KEY, value);
    storageFailed = false;
  } catch {
    fallback = value;
    storageFailed = true;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
