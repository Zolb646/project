"use client";

import { useSyncExternalStore } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useContent } from "@/lib/i18n/useContent";
import { isDarkTheme, subscribeToTheme, toggleTheme } from "@/lib/theme";

export default function ThemeToggle() {
  const { ui } = useContent();
  const dark = useSyncExternalStore(subscribeToTheme, isDarkTheme, () => false);
  const Icon = dark ? FiSun : FiMoon;

  return (
    <button
      type="button"
      aria-label={ui.common.darkMode}
      aria-pressed={dark}
      onClick={toggleTheme}
      className="grid size-11 shrink-0 cursor-pointer place-items-center border-2 border-control-line bg-cream text-navy shadow-brutal-sm transition-[transform,box-shadow] duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">
      <Icon aria-hidden="true" className="size-5" />
    </button>
  );
}
