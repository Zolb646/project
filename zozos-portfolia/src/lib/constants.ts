export const SECTION_IDS = {
  hero: "hero",
  about: "about",
  skills: "skills",
  projects: "projects",
  experience: "experience",
  contact: "contact",
} as const;

export const NAV_SECTIONS: Array<{
  key: "about" | "skills" | "projects" | "experience" | "contact";
  href: string;
}> = [
  { key: "projects", href: `#${SECTION_IDS.projects}` },
  { key: "about", href: `#${SECTION_IDS.about}` },
  { key: "experience", href: `#${SECTION_IDS.experience}` },
  { key: "skills", href: `#${SECTION_IDS.skills}` },
  { key: "contact", href: `#${SECTION_IDS.contact}` },
];
