import { Project, SkillCategory, Experience, SocialLink } from "./types";

export const PERSONAL = {
  name: "Zozo",
  role: "Software Engineer",
  location: "Ulaanbaatar, Mongolia",
  availability:
    "Seeking internship, junior, and full-stack software engineering roles",
  summary:
    "Software engineer building full-stack web products with React, Next.js, TypeScript, Node.js, GraphQL, and PostgreSQL, with strong attention to UI quality and maintainable structure.",
  resumeUrl: "/Zozo-Resume.pdf",
  tagline:
    "Building digital experiences with clean code and creative thinking.",
  about:
    "I am a software engineer from Mongolia who can work across both frontend and backend development. Through Pinecone Academy's bootcamp and internship path, I have been building deployed projects, improving my React and Next.js workflow, and learning how to connect strong interfaces with practical product logic and data-backed features.",
  aboutHighlights: [
    "Build responsive frontend interfaces with React, Next.js, TypeScript, and Tailwind CSS.",
    "Can also handle backend work with Node.js, GraphQL, Prisma, PostgreSQL, and API-driven features.",
    "Currently seeking internship and junior software engineering roles where I can keep growing across frontend and backend.",
  ],
  focus: "Frontend and backend product development",
  email: "zolb646@gmail.com",
  githubUrl: "https://github.com/Zolb646",
};

export const SKILLS: SkillCategory[] = [
  {
    title: "Frontend & Mobile",
    icon: "frontend",
    description:
      "The UI stack I use most often for responsive product work across web and mobile.",
    skills: [
      "React",
      "React Native",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Expo",
    ],
  },
  {
    title: "Backend & APIs",
    icon: "backend",
    description:
      "Used for application logic, API integration, authentication, and data-backed features.",
    skills: [
      "Node.js",
      "REST APIs",
      "GraphQL",
      "Apollo Client",
      "Apollo Server",
      "Prisma",
    ],
  },
  {
    title: "Data & Cloud",
    icon: "cloud",
    description:
      "The databases and platform tools behind the full-stack products I have been building.",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Supabase",
      "Firebase",
      "Cloudflare",
      "Docker",
      "Git",
    ],
  },
  {
    title: "Testing & Detection",
    icon: "testing",
    description:
      "Experience with test coverage, camera-based detection flows, and dataset-driven features.",
    skills: [
      "Jest",
      "Unit Testing",
      "Integration Testing",
      "E2E Testing",
      "MediaPipe",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Galexora",
    role: "Frontend Developer",
    period: "2026",
    description:
      "A cinematic space exploration website built to showcase visual storytelling, section-based architecture, and polished motion work.",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    highlights: [
      "Built the experience as reusable sections instead of a single monolithic page.",
      "Used motion and layered visuals to create a stronger, more branded presentation.",
      "Included dedicated discoveries, technology, and NASA APOD-inspired content areas.",
    ],
    liveUrl: "https://galexora.vercel.app",
    githubUrl: "https://github.com/Zolb646/galexora",
    image: "/projects/galexora.png",
    featured: true,
  },
  {
    title: "Sign Language Web",
    role: "Full-stack Developer",
    period: "2026",
    description:
      "A team-built sign language platform inside the intern-3c monorepo with real-time ASL and MNSL detection, learning flows, practice modes, and admin-managed vocabulary.",
    tags: ["Next.js", "GraphQL", "Prisma", "PostgreSQL", "MediaPipe"],
    highlights: [
      "Worked in the intern-3c team on the sign-language app inside a shared Nx monorepo.",
      "Contributed backend work with Apollo GraphQL and Prisma-backed sign data stored in PostgreSQL.",
      "Supported features such as live detection, practice and learn pages, and admin vocabulary tools with motion sample handling.",
    ],
    liveUrl: "https://asl-mnsl.vercel.app/",
    image: "/projects/sign-language.png",
    featured: true,
  },
  {
    title: "Food Delivery Web",
    role: "Frontend Developer",
    period: "2025",
    description:
      "A food ordering interface focused on category browsing, cart interactions, and admin-oriented UI coverage.",
    tags: ["Next.js", "React", "JavaScript", "Radix UI", "Tailwind CSS"],
    highlights: [
      "Built category-based browsing with smooth scroll navigation between sections.",
      "Implemented cart, auth dialog, and order-related interface components.",
      "Added admin views for category, menu, and order management flows.",
    ],
    liveUrl: "https://food-delivery-web-ten-henna.vercel.app/",
    githubUrl: "https://github.com/Zolb646/food-delivery-web",
    image: "/projects/food-delivery.png",
  },
  {
    title: "Quiz App",
    role: "Full-stack Developer",
    period: "2025",
    description:
      "A quiz platform with authentication, multi-step quiz flow, and database-backed content management.",
    tags: ["Next.js", "TypeScript", "Prisma", "Clerk", "PostgreSQL"],
    highlights: [
      "Implemented home, summary, quiz, and results states for a guided user flow.",
      "Integrated Clerk authentication and Prisma-backed data modeling and migrations.",
      "Added API routes and quiz-related data handling for article-based quiz content.",
    ],
    liveUrl: "https://quiz-app-theta-gilt.vercel.app/",
    githubUrl: "https://github.com/Zolb646/quiz-app",
    image: "/projects/quiz-app.png",
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Intern",
    company: "Pinecone Academy",
    period: "2026 - Present",
    description:
      "Continuing hands-on software engineering through Pinecone Academy's internship track and collaborative project work.",
    tags: ["Internship", "Software Engineering", "Team Collaboration"],
    highlights: [
      "Practice component-based implementation, project cleanup, and delivery habits in real projects.",
      "Work through review feedback, small task ownership, and Git-based collaboration.",
      "Keep improving both product thinking and technical execution across the stack.",
    ],
  },
  {
    role: "Bootcamp Student",
    company: "Pinecone Academy",
    period: "2025 - 2026",
    description:
      "Completed intensive web development training and built several deployed projects across different product ideas.",
    tags: ["Bootcamp", "Web Development", "Problem Solving"],
    highlights: [
      "Built and deployed portfolio, quiz, movie, and food-ordering projects.",
      "Practiced both frontend implementation and data-backed full-stack features.",
      "Improved comfort with component structure, state management, and backend-connected flows.",
    ],
  },
  {
    role: "High School Graduate",
    company: "High School",
    period: "2025",
    description:
      "Graduated high school in 2025 and chose software development as the path to keep building and learning.",
    tags: ["Education", "Graduation"],
    highlights: [
      "Finished high school in 2025.",
      "Started focusing seriously on software engineering after graduation.",
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Zolb646", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/b-zolbayar-a856053b3/",
    icon: "linkedin",
  },
];
