import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/content";
import { LOCALES } from "@/lib/i18n/types";
import { localizedPath } from "@/lib/i18n/paths";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...getAllProjectSlugs().map((slug) => `/projects/${slug}`)];

  return LOCALES.flatMap((locale) => paths.map((path) => ({
    url: `${SITE_URL}${localizedPath(locale, path)}`,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
    alternates: {
      languages: {
        en: `${SITE_URL}${localizedPath("en", path)}`,
        mn: `${SITE_URL}${localizedPath("mn", path)}`,
        "x-default": `${SITE_URL}${localizedPath("en", path)}`,
      },
    },
  })));
}
