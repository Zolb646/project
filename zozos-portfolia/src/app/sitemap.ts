import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://zozo.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...getAllProjectSlugs().map((slug) => ({
      url: `https://zozo.dev/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
