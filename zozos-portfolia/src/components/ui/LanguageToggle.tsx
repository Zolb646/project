"use client";

import { useContent } from "@/lib/i18n/useContent";

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const { locale, toggleLocale, ui } = useContent();
  const nextLanguage = locale === "en" ? "Монгол" : "English";

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={`${ui.common.languageToggleLabel}: ${nextLanguage}`}
      className={`inline-flex min-h-10 items-center gap-2 border-b-2 border-navy px-1 text-sm font-semibold text-navy transition-colors hover:border-accent-orange-ink hover:text-accent-orange-ink ${className}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 shrink-0">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.5 3.75 5.5 3.75 9S14.5 18.5 12 21c-2.5-2.5-3.75-5.5-3.75-9S9.5 5.5 12 3Z" />
      </svg>
      <span>{nextLanguage}</span>
    </button>
  );
}
