export interface Project {
  slug: string;
  title: string;
  description: string;
  role?: string;
  period?: string;
  tags: string[];
  highlights: string[];
  challenge?: string;
  ownership?: string;
  outcome?: string;
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  images?: string[];
  imageLayout?: "desktop" | "mobile";
  featured?: boolean;
  process?: string[];
  lessons?: string[];
  architecture?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  skills: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  description: string;
  tags: string[];
  highlights: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  availability: string;
  summary: string;
  resumeUrl: string;
  tagline: string;
  about: string;
  aboutHighlights: string[];
  focus: string;
  email: string;
  githubUrl: string;
}

export interface SiteContent {
  personal: PersonalInfo;
  skills: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
  socialLinks: SocialLink[];
}
