import { Project, SkillCategory, Experience, SocialLink } from "./types";

export const PERSONAL = {
  name: "Zozo",
  role: "Software Engineer",
  tagline:
    "Building digital experiences with clean code and creative thinking.",
  about:
    "I'm a passionate software engineer from Mongolia who loves turning complex problems into simple, beautiful solutions. With a strong foundation in modern web technologies, I create performant and user-friendly applications that make a difference.",
  email: "zolb646@gmail.com",
};

export const SKILLS: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "frontend",
    skills: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "Backend",
    icon: "backend",
    skills: ["Node.js", "Python", "PostgreSQL", "REST APIs", "GraphQL"],
  },
  {
    title: "Tools & More",
    icon: "tools",
    skills: ["Git", "Docker", "Figma"],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Galexora",
    description:
      "A space-themed interactive website with exploration sections, motion effects, and a NASA APOD area.",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://galexora.vercel.app",
    githubUrl: "https://github.com/Zolb646/galexora",
  },
  {
    title: "Quiz App",
    description:
      "An AI-assisted quiz platform with multi-step gameplay, auth flow, and database-backed quiz data.",
    tags: ["Next.js", "TypeScript", "Prisma", "Clerk", "Google GenAI"],
    liveUrl: "https://quiz-app-theta-gilt.vercel.app/",
    githubUrl: "https://github.com/Zolb646/quiz-app",
  },
  {
    title: "Food Delivery Web",
    description:
      "A food-ordering interface with category-based browsing, smooth scrolling, and interactive cart state.",
    tags: ["Next.js", "React", "JavaScript", "Radix UI", "Tailwind CSS"],
    liveUrl: "https://food-delivery-web-ten-henna.vercel.app/",
    githubUrl: "https://github.com/Zolb646/food-delivery-web",
  },
  {
    title: "Movie App",
    description:
      "A movie discovery app with upcoming, popular, and top-rated sections, plus search and detail pages.",
    tags: ["Next.js", "React", "JavaScript", "Tailwind CSS"],
    githubUrl: "https://github.com/Zolb646/movie-app",
    liveUrl: "https://moviez-xi.vercel.app/",
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Intern",
    company: "Pinecone Academy",
    period: "2026 - Present",
    description:
      "Working as an intern at Pinecone Academy and gaining hands-on software development experience.",
    tags: ["Internship", "Software Development", "Teamwork"],
  },
  {
    role: "Bootcamp Student",
    company: "Pinecone Academy",
    period: "2025 - 2026",
    description:
      "Attended Pinecone Academy bootcamp to build practical skills in modern software engineering.",
    tags: ["Bootcamp", "Web Development", "Problem Solving"],
  },
  {
    role: "High School Graduate",
    company: "High School",
    period: "2025",
    description: "Graduated from high school in 2025.",
    tags: ["Education", "Graduation"],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Zolb646", icon: "github" },
];
