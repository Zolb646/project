import { Project, SkillCategory, Experience, SocialLink } from "./types";

export const PERSONAL = {
  name: "Zozo",
  role: "Software Engineer",
  location: "Ulaanbaatar, Mongolia",
  availability:
    "Actively seeking internship and junior software engineering roles",
  summary:
    "Junior software engineer building polished web products with React, Next.js, TypeScript, Node.js, GraphQL, and PostgreSQL, with a strong bias for clean UI, practical product thinking, and reliable implementation.",
  resumeUrl: "/Zozo-resume.pdf",
  tagline:
    "Frontend-sharp, full-stack capable, and ready to contribute to real product teams.",
  about:
    "I am a software engineer from Mongolia who enjoys building the full shape of a product, from interface polish to application logic. Through Pinecone Academy's bootcamp and internship track, I have shipped web and mobile projects, worked inside team codebases, and built experience turning design ideas into responsive interfaces backed by real data and usable flows.",
  aboutHighlights: [
    "Build responsive frontend experiences with React, Next.js, TypeScript, and a strong eye for layout, motion, and hierarchy.",
    "Handle backend features with Node.js, GraphQL, Prisma, PostgreSQL, and API-driven product workflows.",
    "Work comfortably across solo builds and team projects, with a focus on shipping clear, maintainable product work.",
  ],
  focus: "Product-focused frontend and full-stack development",
  email: "zolb646@gmail.com",
  githubUrl: "https://github.com/Zolb646",
};

export const SKILLS: SkillCategory[] = [
  {
    title: "Frontend & Mobile",
    icon: "frontend",
    description:
      "My strongest build surface for shipping responsive interfaces, interaction flows, and mobile-friendly product experiences.",
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
      "The tools I use for application logic, authentication, API integration, and the parts of a product that need real structure behind the UI.",
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
      "The storage and deployment layer behind the full-stack work I have been building and shipping.",
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
      "Experience with verification, detection workflows, and data-backed features that need more than static UI work.",
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
      "A cinematic space exploration site designed to prove strong frontend storytelling, section architecture, and polished interaction work.",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    challenge:
      "Build a portfolio-style product experience that felt branded and immersive instead of reading like another generic landing page.",
    ownership:
      "Owned the frontend build, section system, visual pacing, and motion choices that made the site feel intentional from top to bottom.",
    outcome:
      "Shipped a more memorable, presentation-first web experience that demonstrates how I handle hierarchy, reusable sections, and visual polish.",
    highlights: [
      "Built the experience as reusable sections instead of one monolithic page so the site stayed scalable and easier to refine.",
      "Used motion, layered imagery, and tighter pacing to create a stronger branded feel without overwhelming the content.",
      "Added dedicated discoveries, technology, and NASA APOD-inspired sections to make the narrative feel like a real product journey.",
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
      "A team-built sign language platform in a shared monorepo with live ASL and MNSL detection, practice flows, and admin-managed vocabulary.",
    tags: ["Next.js", "GraphQL", "Prisma", "PostgreSQL", "MediaPipe"],
    challenge:
      "Contribute meaningful full-stack work inside a team monorepo where the product included live detection, learning flows, and admin-managed sign data.",
    ownership:
      "Contributed backend and product-facing features with Apollo GraphQL, Prisma, and PostgreSQL while supporting practice, learn, and admin workflows.",
    outcome:
      "Helped ship a more complete learning platform that shows I can work beyond the UI layer and contribute inside a collaborative codebase.",
    highlights: [
      "Worked inside the intern-3c team on the sign-language app within a shared Nx monorepo and collaborative workflow.",
      "Implemented backend-facing work with Apollo GraphQL, Prisma, and PostgreSQL-backed sign data handling.",
      "Supported live detection, practice and learning pages, and admin vocabulary tooling with motion sample management.",
    ],
    liveUrl: "https://asl-mnsl.vercel.app/",
    image: "/projects/sign-language.png",
    featured: true,
  },
  {
    title: "WordGym Mobile App",
    role: "Mobile App Developer",
    period: "2026",
    description:
      "A team-built mobile vocabulary app with deck creation, AI-assisted card generation, offline-first study flows, and practice mini-games.",
    tags: ["Expo", "React Native", "TypeScript", "SQLite", "Clerk"],
    highlights: [
      "Built with Expo Router and React Native to support a polished study flow across deck, learning, and game screens.",
      "Used local SQLite storage, authenticated users, and AI-assisted card generation to support practical offline-first use.",
      "Included game modes such as memory match, scramble, speed quiz, falling words, and hangman.",
    ],
    githubUrl: "https://github.com/Zolb646/team-project",
    image: "/projects/wordgym-mobile.jpg",
  },
  {
    title: "Quiz App",
    role: "Full-stack Developer",
    period: "2025",
    description:
      "A quiz platform with authentication, guided quiz flow, and database-backed content management.",
    tags: ["Next.js", "TypeScript", "Prisma", "Clerk", "PostgreSQL"],
    highlights: [
      "Implemented home, summary, quiz, and results states for a guided user experience.",
      "Integrated Clerk authentication and Prisma-backed data modeling, migrations, and backend setup.",
      "Added API routes and quiz-related data handling for article-driven content.",
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
      "Building hands-on engineering experience through Pinecone Academy's internship track and collaborative product work.",
    tags: ["Internship", "Software Engineering", "Team Collaboration"],
    highlights: [
      "Contribute to real project work through component implementation, cleanup, iteration, and delivery-focused tasks.",
      "Work through review feedback, Git-based collaboration, and small-task ownership inside shared codebases.",
      "Strengthen both frontend execution and full-stack product thinking through regular team project work.",
    ],
  },
  {
    role: "Bootcamp Student",
    company: "Pinecone Academy",
    period: "2025 - 2026",
    description:
      "Completed intensive web development training while shipping deployed projects across web and mobile.",
    tags: ["Bootcamp", "Web Development", "Problem Solving"],
    highlights: [
      "Built and deployed product projects during the bootcamp period instead of stopping at tutorial-style exercises.",
      "Worked on the WordGym mobile app with Expo and React Native across deck, study, and vocabulary game flows.",
      "Practiced both frontend implementation and data-backed full-stack features, including offline-first and backend-connected flows.",
    ],
  },
  {
    role: "High School Graduate",
    company: "High School",
    period: "2025",
    description:
      "Graduated high school in 2025 and committed early to software engineering as the path I wanted to build in.",
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
