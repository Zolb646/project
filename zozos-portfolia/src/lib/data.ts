import { Project, SkillCategory, Experience, SocialLink } from "./types";

export const PERSONAL = {
  name: "Zozo",
  role: "Software Engineer",
  location: "Ulaanbaatar, Mongolia",
  availability:
    "Actively seeking internship and junior software engineering roles",
  summary:
    "Junior software engineer with hands-on experience across 15+ web and mobile projects, building responsive interfaces, reusable components, and full-stack product features with React, Next.js, TypeScript, Node.js, GraphQL, and PostgreSQL.",
  resumeUrl: "/Zozo-resume.pdf",
  tagline:
    "Frontend-focused, full-stack capable, and ready to contribute from feature build to deployment.",
  about:
    "I am a software engineer from Mongolia with hands-on experience gained through 15+ projects across Pinecone Academy's bootcamp, internship track, and personal work. I enjoy building the full shape of a product, from responsive UI and reusable components to backend integration and deployment, and I have worked both independently and inside team codebases to ship practical web and mobile experiences.",
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
    slug: "galexora",
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
    process: [
      "Started by treating the site like a product story instead of a generic personal landing page, outlining the emotional arc of the page before building the sections.",
      "Built each section as a reusable content block so layout, spacing, and motion could be tuned without rewriting the whole page every time the story changed.",
      "Used image layering, motion timing, and tighter transitions to make the scroll experience feel cinematic while still keeping the content readable.",
    ],
    architecture:
      "The site is structured as a modular Next.js frontend with reusable section components, shared design tokens, and animation-driven presentation layers that can scale as more content is added.",
    lessons: [
      "A strong portfolio project needs a narrative, not just clean code. The structure of the experience matters as much as the implementation.",
      "Breaking visual sections into reusable pieces made iteration much faster because I could refine pacing and hierarchy without destabilizing the rest of the page.",
      "Motion feels strongest when it supports attention and rhythm instead of competing with the content.",
    ],
    liveUrl: "https://galexora.vercel.app",
    githubUrl: "https://github.com/Zolb646/galexora",
    image: "/projects/galexora.png",
    images: ["/projects/galexora.png"],
    imageLayout: "desktop",
    featured: true,
  },
  {
    slug: "sign-language-web",
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
    process: [
      "Worked inside a collaborative monorepo where features had to fit existing patterns instead of being built in isolation.",
      "Focused on the product flows that connected sign data, practice experiences, and admin tools so the learning journey felt complete rather than fragmented.",
      "Contributed full-stack work across schema-backed data handling, product-facing pages, and the supporting admin workflows needed to maintain the content.",
    ],
    architecture:
      "This project combined a Next.js frontend with Apollo GraphQL, Prisma, PostgreSQL, and MediaPipe-backed detection flows inside a shared team monorepo.",
    lessons: [
      "Collaborative product work requires clarity and consistency more than individual cleverness, especially in a shared monorepo.",
      "Backend contribution becomes much more valuable when it directly supports visible user flows such as practice, learning, and administration.",
      "Detection-based experiences are strongest when the surrounding product flow is also well supported, not just the model or live camera step.",
    ],
    liveUrl: "https://asl-mnsl.vercel.app/",
    image: "/projects/sign-language.png",
    images: ["/projects/sign-language.png"],
    imageLayout: "desktop",
    featured: true,
  },
  {
    slug: "wordgym-mobile-app",
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
    challenge:
      "Build a mobile study experience that felt practical and engaging, not just a static flashcard app, while supporting offline use and multiple learning modes.",
    ownership:
      "Contributed to the mobile product experience across navigation, study flows, deck interactions, and the game-oriented parts of the app.",
    outcome:
      "The result was a broader vocabulary product with stronger retention mechanics, better mobile usability, and more ways for users to keep practicing consistently.",
    process: [
      "Planned the app around real study behavior, making sure users could move between decks, learning flows, and mini-games without the experience feeling disconnected.",
      "Used Expo Router and React Native patterns to organize screens in a way that stayed manageable as the app grew beyond a simple deck viewer.",
      "Supported practical usage by combining offline-friendly local storage, authenticated users, and AI-assisted card generation into one mobile workflow.",
    ],
    architecture:
      "The mobile app uses Expo and React Native with route-based screen organization, SQLite for local persistence, Clerk for auth, and feature-specific game screens layered on top of the learning system.",
    lessons: [
      "Mobile learning products need fast, low-friction flows because every extra step makes the study habit weaker.",
      "Offline-first support changes product quality noticeably for study apps because users expect access anywhere.",
      "Mini-games work best when they reinforce the same vocabulary system instead of feeling like separate demos.",
    ],
    githubUrl: "https://github.com/Zolb646/team-project",
    image: "/projects/wordgym-mobile.jpg",
    images: [
      "/projects/wordgym-gallery/663430627_938885645737244_6834413848523767737_n.jpg",
      "/projects/wordgym-gallery/661712835_1337263188213205_8056051862583143088_n.jpg",
      "/projects/wordgym-gallery/658866803_2041094599789013_8809376954849688101_n.jpg",
      "/projects/wordgym-gallery/663820431_2143127759854603_1865472158981294244_n.jpg",
      "/projects/wordgym-gallery/663787644_1210716140924508_4216762086919355791_n.jpg",
      "/projects/wordgym-gallery/661134893_1591413158632014_4849740364661075488_n.jpg",
      "/projects/wordgym-gallery/660958121_1598887914725015_3738639514280020003_n.jpg",
      "/projects/wordgym-gallery/665011748_1501067314959716_2926410506847293185_n.jpg",
      "/projects/wordgym-gallery/664954530_1471556507988038_4866793057172487913_n.jpg",
      "/projects/wordgym-gallery/661446305_1285818160214832_6986840864286027644_n.jpg",
      "/projects/wordgym-gallery/661313709_35697584393162154_3255905771458649988_n.jpg",
      "/projects/wordgym-gallery/661643511_933526612736375_1911516004896049070_n.jpg",
      "/projects/wordgym-gallery/668078381_4410844489185703_7195398180173652573_n.jpg",
      "/projects/wordgym-gallery/665072232_1457835185832842_1537256036293180819_n.jpg",
    ],
    imageLayout: "mobile",
  },
  {
    slug: "quiz-app",
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
    challenge:
      "Turn a quiz concept into a complete product flow with authentication, structured content, and meaningful results handling instead of a one-screen prototype.",
    ownership:
      "Built across both frontend and backend layers, including page states, auth integration, database-backed models, and quiz-related API work.",
    outcome:
      "Shipped a more complete quiz experience that demonstrates I can connect UI flow, backend structure, and deployment-ready application logic.",
    process: [
      "Designed the app around the full quiz journey so users had a clear path from entry to completion rather than isolated pages.",
      "Connected Clerk authentication and Prisma models early so the product structure could support real users and real content from the start.",
      "Added backend routes and content handling to support article-driven quiz data and keep the frontend states tied to usable application data.",
    ],
    architecture:
      "The app uses Next.js and TypeScript on the frontend, with Clerk for authentication and Prisma with PostgreSQL for data modeling and backend persistence.",
    lessons: [
      "Even a smaller full-stack app becomes much clearer when the user journey is defined before individual pages are built.",
      "Authentication and data modeling decisions shape the whole product, so wiring them in early prevents a lot of rework later.",
      "Results and summary states matter because they turn a simple interaction into a more complete product loop.",
    ],
    liveUrl: "https://quiz-app-theta-gilt.vercel.app/",
    githubUrl: "https://github.com/Zolb646/quiz-app",
    image: "/projects/quiz-app.png",
    images: ["/projects/quiz-app.png"],
    imageLayout: "desktop",
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
