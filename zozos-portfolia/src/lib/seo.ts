import type { Metadata } from "next";
import { CONTENT } from "@/lib/content";
import type { Locale } from "@/lib/i18n/types";
import { localizedPath } from "@/lib/i18n/paths";
import type { Project } from "@/lib/types";
import { PERSON_NAME, SITE_URL } from "@/lib/site";

export function getAlternates(locale: Locale, path: string) {
  return {
    canonical: localizedPath(locale, path),
    languages: {
      en: localizedPath("en", path),
      mn: localizedPath("mn", path),
      "x-default": localizedPath("en", path),
    },
  };
}

export function getHomeMetadata(locale: Locale): Metadata {
  const personal = CONTENT[locale].personal;
  const title = `${PERSON_NAME} (${personal.name}) | ${personal.role}`;
  const images = [{ url: "/og", width: 1200, height: 630, alt: `${PERSON_NAME} (Zozo) — Frontend Engineer in Ulaanbaatar` }];

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: "Zozo Portfolio",
    authors: [{ name: PERSON_NAME, url: SITE_URL }],
    creator: PERSON_NAME,
    title,
    description: personal.summary,
    alternates: getAlternates(locale, "/"),
    openGraph: {
      title,
      description: personal.summary,
      url: localizedPath(locale, "/"),
      type: "website",
      siteName: "Zozo Portfolio",
      locale: locale === "mn" ? "mn_MN" : "en_US",
      alternateLocale: locale === "mn" ? "en_US" : "mn_MN",
      images,
    },
    twitter: { card: "summary_large_image", title, description: personal.summary, images },
  };
}

export function getProjectMetadata(locale: Locale, project: Project): Metadata {
  const title = `${project.title} | ${PERSON_NAME}`;
  const path = `/projects/${project.slug}`;
  const images = [{ url: project.image || "/og", alt: project.title }];

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: project.description,
    alternates: getAlternates(locale, path),
    openGraph: {
      url: localizedPath(locale, path),
      title,
      description: project.description,
      type: "article",
      siteName: "Zozo Portfolio",
      authors: [SITE_URL],
      locale: locale === "mn" ? "mn_MN" : "en_US",
      alternateLocale: locale === "mn" ? "en_US" : "mn_MN",
      images,
    },
    twitter: { card: "summary_large_image", title, description: project.description, images },
  };
}

export function getNotFoundMetadata(locale: Locale): Metadata {
  return {
    title: locale === "mn" ? "404 | Zozo — Хуудас олдсонгүй" : "404 | Zozo — Page not found",
    description: locale === "mn" ? "Хуудас олдсонгүй. Zozo-ийн портфолио болон төслүүд рүү буцаарай." : "Page not found. Head back to Zozo’s portfolio and explore the projects.",
    robots: { index: false, follow: false },
    alternates: null,
    openGraph: null,
    twitter: null,
  };
}
