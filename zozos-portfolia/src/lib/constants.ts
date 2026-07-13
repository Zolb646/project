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
  { key: "about", href: `#${SECTION_IDS.about}` },
  { key: "skills", href: `#${SECTION_IDS.skills}` },
  { key: "projects", href: `#${SECTION_IDS.projects}` },
  { key: "experience", href: `#${SECTION_IDS.experience}` },
  { key: "contact", href: `#${SECTION_IDS.contact}` },
];
