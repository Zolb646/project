import { Project, SkillCategory, Experience, SocialLink } from "./types";

export const PERSONAL = {
  name: "Zozo",
  role: "Software Engineer",
  tagline:
    "Building digital experiences with clean code and creative thinking.",
  about:
    "I'm a passionate software engineer who loves turning complex problems into simple, beautiful solutions. With a strong foundation in modern web technologies, I create performant and user-friendly applications that make a difference.",
  email: "zolb646@gmail.com",
};

export const SKILLS: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    title: "Backend",
    icon: "backend",
    skills: ["Node.js", "Python", "PostgreSQL", "REST APIs", "GraphQL"],
  },
  {
    title: "Tools & More",
    icon: "tools",
    skills: ["Git", "Docker", "AWS", "Figma", "CI/CD"],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce application with real-time inventory management, payment processing, and an intuitive admin dashboard.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative project management tool with drag-and-drop boards, real-time updates, and team collaboration features.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "AI Content Generator",
    description:
      "An AI-powered content creation tool that helps writers generate, edit, and optimize their content using machine learning.",
    tags: ["Python", "FastAPI", "React", "OpenAI"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Portfolio Analytics",
    description:
      "A real-time analytics dashboard for tracking website performance, user behavior, and conversion metrics.",
    tags: ["Next.js", "D3.js", "Tailwind", "Vercel"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "Tech Corp",
    period: "2023 - Present",
    description:
      "Leading frontend architecture for the main product. Improved performance by 40% and mentored junior developers.",
    tags: ["React", "TypeScript", "AWS"],
  },
  {
    role: "Software Engineer",
    company: "StartupXYZ",
    period: "2021 - 2023",
    description:
      "Built and shipped core features for a SaaS platform serving 10k+ users. Designed RESTful APIs and database schemas.",
    tags: ["Node.js", "PostgreSQL", "Docker"],
  },
  {
    role: "Junior Developer",
    company: "Web Agency",
    period: "2020 - 2021",
    description:
      "Developed responsive websites and web applications for various clients. Collaborated with designers to implement pixel-perfect UIs.",
    tags: ["JavaScript", "React", "CSS"],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Zolb646", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/zozo", icon: "linkedin" },
  { label: "Twitter", href: "https://twitter.com/zozo", icon: "twitter" },
];
