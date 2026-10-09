"use client";

import { CONTENT } from "@/lib/content";
import { useLanguage } from "./LanguageContext";
import { UI } from "./ui";
import { localizedPath } from "./paths";

export function useContent() {
  const { locale } = useLanguage();
  const content = CONTENT[locale];
  const ui = UI[locale];

  return {
    locale,
    localizePath: (path: string) => localizedPath(locale, path),
    ui,
    personal: content.personal,
    skills: content.skills,
    projects: content.projects,
    experiences: content.experiences,
    socialLinks: content.socialLinks,
  };
}
