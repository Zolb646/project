import { CONTENT } from "@/lib/content";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/types";
import { PERSON_ALIASES, PERSON_NAME, SITE_URL } from "@/lib/site";
import type { Project } from "@/lib/types";

export function getSiteStructuredData(locale: Locale) {
  const { personal, socialLinks } = CONTENT[locale];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: PERSON_NAME,
        alternateName: PERSON_ALIASES,
        url: SITE_URL,
        image: `${SITE_URL}/profile-editorial.png`,
        jobTitle: personal.role,
        worksFor: { "@type": "Organization", name: personal.employer },
        description: personal.summary,
        email: personal.email,
        address: { "@type": "PostalAddress", addressLocality: "Ulaanbaatar", addressCountry: "MN" },
        sameAs: socialLinks.map((link) => link.href),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Zozo Portfolio",
        alternateName: `${PERSON_NAME} Portfolio`,
        url: SITE_URL,
        inLanguage: ["en", "mn"],
        author: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}

export function getProjectStructuredData(locale: Locale, project: Project) {
  const url = `${SITE_URL}${localizedPath(locale, `/projects/${project.slug}`)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#case-study`,
        name: project.title,
        description: project.description,
        url,
        inLanguage: locale,
        image: `${SITE_URL}${project.image || "/og"}`,
        author: { "@id": `${SITE_URL}/#person` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        keywords: project.tags,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "mn" ? "Нүүр" : "Home",
            item: `${SITE_URL}${localizedPath(locale, "/")}`,
          },
          { "@type": "ListItem", position: 2, name: project.title, item: url },
        ],
      },
    ],
  };
}
