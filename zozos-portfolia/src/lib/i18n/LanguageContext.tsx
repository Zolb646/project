"use client";

import { createContext, useContext } from "react";
import type { Locale } from "./types";

const LanguageContext = createContext<Locale | null>(null);

export function LanguageProvider({ children, locale }: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return <LanguageContext.Provider value={locale}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const locale = useContext(LanguageContext);
  if (!locale) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return { locale };
}
