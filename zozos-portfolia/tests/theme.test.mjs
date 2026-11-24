import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { createContext, runInContext } from "node:vm";
import ts from "typescript";

function loadTheme({ saved, systemDark = false, storageBlocked = false } = {}) {
  const dataset = {};
  const storage = new Map([["portfolio-theme", saved]]);
  const context = createContext({
    exports: {},
    document: { documentElement: { dataset } },
    window: { matchMedia: () => ({ matches: systemDark }) },
    localStorage: {
      getItem(key) {
        if (storageBlocked) throw new Error("Storage blocked");
        return storage.get(key);
      },
      setItem(key, value) {
        if (storageBlocked) throw new Error("Storage blocked");
        storage.set(key, value);
      },
    },
  });

  const path = new URL("../src/lib/theme.ts", import.meta.url);
  const { outputText } = ts.transpileModule(readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  runInContext(outputText, context);
  const { themeInitScript, isDarkTheme, toggleTheme } = context.exports;
  runInContext(themeInitScript, context);
  return { dataset, storage, isDarkTheme, toggleTheme };
}

test("a stored light theme overrides a dark system preference on page load", () => {
  const { dataset, isDarkTheme } = loadTheme({ saved: "light", systemDark: true });
  assert.equal(dataset.theme, "light");
  assert.equal(isDarkTheme(), false);
});

test("an invalid stored theme falls back to the system preference", () => {
  const { dataset, isDarkTheme } = loadTheme({ saved: "invalid", systemDark: true });
  assert.equal(dataset.theme, undefined);
  assert.equal(isDarkTheme(), true);
});

test("toggling updates the page theme and persists the selection", () => {
  const { dataset, storage, toggleTheme } = loadTheme();
  toggleTheme();
  assert.equal(dataset.theme, "dark");
  assert.equal(storage.get("portfolio-theme"), "dark");
  toggleTheme();
  assert.equal(dataset.theme, "light");
  assert.equal(storage.get("portfolio-theme"), "light");
});

test("the theme can still change when storage is blocked", () => {
  const { dataset, toggleTheme } = loadTheme({ systemDark: true, storageBlocked: true });
  toggleTheme();
  assert.equal(dataset.theme, "light");
});
