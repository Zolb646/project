"use client";

import { CONTENT } from "@/lib/content";
import { useLanguage } from "./LanguageContext";
import { UI } from "./ui";

export function useContent() {
  const { locale, setLocale, toggleLocale } = useLanguage();
  const content = CONTENT[locale];
  const ui = UI[locale];

  return {
    locale,
    setLocale,
    toggleLocale,
    ui,
    personal: content.personal,
    skills: content.skills,
    projects: content.projects,
    experiences: content.experiences,
    socialLinks: content.socialLinks,
  };
}
