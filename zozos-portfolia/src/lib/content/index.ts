import { Locale } from "@/lib/i18n/types";
import { SiteContent } from "@/lib/types";
import { en } from "./en";
import { mn } from "./mn";

export const CONTENT: Record<Locale, SiteContent> = { en, mn };

export function getPersonal(locale: Locale) {
  return CONTENT[locale].personal;
}

export function getSkills(locale: Locale) {
  return CONTENT[locale].skills;
}

export function getProjects(locale: Locale) {
  return CONTENT[locale].projects;
}

export function getExperiences(locale: Locale) {
  return CONTENT[locale].experiences;
}

export function getSocialLinks(locale: Locale) {
  return CONTENT[locale].socialLinks;
}

export function getProjectBySlug(locale: Locale, slug: string) {
  return CONTENT[locale].projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs() {
  return CONTENT.en.projects.map((project) => project.slug);
}
