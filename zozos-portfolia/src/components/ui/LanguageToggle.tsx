"use client";

import { useContent } from "@/lib/i18n/useContent";
import { Locale } from "@/lib/i18n/types";

const OPTIONS: Locale[] = ["en", "mn"];

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const { locale, setLocale, ui } = useContent();

  return (
    <div
      className={`inline-flex border-3 border-navy shadow-brutal-sm ${className}`}
      role="group"
      aria-label={ui.common.languageToggleLabel}>
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLocale(option)}
          aria-pressed={locale === option}
          className={`px-2.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-150 ${
            locale === option
              ? "bg-accent-orange text-navy"
              : "bg-cream text-navy/50 hover:text-navy"
          }`}>
          {option}
        </button>
      ))}
    </div>
  );
}
