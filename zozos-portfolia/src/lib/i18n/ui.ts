import { Locale } from "./types";

export interface UIDictionary {
  nav: {
    about: string;
    skills: string;
    projects: string;
    experience: string;
    contact: string;
  };
  common: {
    openMenu: string;
    closeMenu: string;
    languageToggleLabel: string;
    viewCaseStudyFor: (title: string) => string;
  };
  hero: {
    greeting: string;
    intro: (role: string) => string;
    quickFactCapable: string;
    quickFactWorkflow: string;
    viewProjects: string;
    downloadResume: string;
    emailMe: string;
    viewGithub: string;
    currentFocus: string;
    status: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    description: string;
    whatIBring: string;
    basedIn: string;
    targeting: string;
    targetingValue: string;
    bestFit: string;
  };
  skills: {
    eyebrow: string;
    heading: string;
    description: string;
    skillsCount: (count: number) => string;
  };
  projects: {
    eyebrow: string;
    heading: string;
    description: string;
    featured: string;
    viewCaseStudy: string;
    moreProjects: string;
    footerNote: string;
    talkCta: string;
  };
  experience: {
    eyebrow: string;
    heading: string;
    description: string;
    current: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    description: string;
    readyHeading: string;
    intro: string;
    facts: string[];
    formNameLabel: string;
    formNamePlaceholder: string;
    formEmailLabel: string;
    formEmailPlaceholder: string;
    formMessageLabel: string;
    formMessagePlaceholder: string;
    send: string;
    sending: string;
    successMessage: string;
    genericError: string;
    networkError: string;
  };
  projectDetail: {
    backToProjects: string;
    liveDemo: string;
    sourceCode: string;
    emailMe: string;
    challenge: string;
    whatIOwned: string;
    whatIOwnedFallback: string;
    outcome: string;
    outcomeFallback: string;
    projectType: string;
    mobileFirstBuild: string;
    mobileFirstDesc: string;
    responsiveWeb: string;
    builtWith: string;
    desktopDesc: string;
    highlights: string;
    architecture: string;
    lessonsLearned: string;
    process: string;
    step: (n: number) => string;
    moreProjects: string;
    appScreens: string;
    insideTheFlow: string;
    appScreensDesc: string;
    moreScreens: (count: number) => string;
    heroScreenshotAlt: (title: string) => string;
    appScreenAlt: (title: string, index: number) => string;
  };
  gallery: {
    visualWalkthrough: string;
    screensFlowFeel: string;
    shotOf: (index: number, total: number) => string;
    mobileWalkthrough: string;
    screenOf: (index: number, total: number) => string;
    desktopLayout: string;
    showPrevious: (title: string) => string;
    showNext: (title: string) => string;
    showScreenshot: (index: number, title: string) => string;
  };
  footer: {
    rights: (year: number) => string;
  };
}

const en: UIDictionary = {
  nav: {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
  },
  common: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageToggleLabel: "Switch language",
    viewCaseStudyFor: (title) => `View case study for ${title}`,
  },
  hero: {
    greeting: "Hi, my name is",
    intro: (role) =>
      `I'm a driven ${role} from Mongolia who loves turning complex problems into simple, beautiful solutions. With a strong foundation in modern web technologies, I create performant and user-friendly applications that make a difference.`,
    quickFactCapable: "Frontend + backend capable",
    quickFactWorkflow: "Product-focused workflow",
    viewProjects: "View Projects",
    downloadResume: "Download Resume",
    emailMe: "Email Me",
    viewGithub: "View GitHub",
    currentFocus: "Current focus",
    status: "Status",
  },
  about: {
    eyebrow: "Profile",
    heading: "About Me",
    description:
      "A clearer snapshot of how I work, where I add value, and why I am a strong fit for frontend-heavy and full-stack product teams.",
    whatIBring: "What I bring",
    basedIn: "Based in",
    targeting: "Targeting",
    targetingValue: "Internship and junior software engineering roles",
    bestFit: "Best fit",
  },
  skills: {
    eyebrow: "Core stack",
    heading: "Skills",
    description:
      "The stack behind the projects on this site, from polished interfaces and mobile flows to backend logic, data, and detection work.",
    skillsCount: (count) => `${count} skills`,
  },
  projects: {
    eyebrow: "Selected work",
    heading: "Projects",
    description:
      "These are the projects that best show how I structure frontend work, handle product flows, and turn ideas into shipped interfaces.",
    featured: "Featured",
    viewCaseStudy: "View case study",
    moreProjects: "More Projects",
    footerNote:
      "Each project now has a dedicated case study page with deeper context, outcomes, and screenshots.",
    talkCta: "Let's talk about building something",
  },
  experience: {
    eyebrow: "Recent path",
    heading: "Experience",
    description:
      "The fastest way to understand how I moved from early training into shipped work, team collaboration, and product-focused engineering habits.",
    current: "Current",
  },
  contact: {
    eyebrow: "Contact",
    heading: "Get In Touch",
    description:
      "If you are hiring for an internship or junior software engineering role, I would love to hear about the team and the product.",
    readyHeading: "Ready for the right team.",
    intro:
      "I am looking for a team where I can contribute to real product work, grow through strong feedback, and keep building across frontend and backend.",
    facts: [
      "Based in Mongolia",
      "Seeking internship and junior roles",
      "Best fit for frontend and full-stack teams",
    ],
    formNameLabel: "Name",
    formNamePlaceholder: "Your name",
    formEmailLabel: "Email",
    formEmailPlaceholder: "your@email.com",
    formMessageLabel: "Message",
    formMessagePlaceholder: "Tell me about the role, project, or opportunity",
    send: "Send Message",
    sending: "Sending...",
    successMessage: "Message sent successfully. I will get back to you soon.",
    genericError: "Something went wrong. Please try again.",
    networkError: "Unable to send right now. Please try again in a moment.",
  },
  projectDetail: {
    backToProjects: "Back to projects",
    liveDemo: "Live Demo",
    sourceCode: "Source Code",
    emailMe: "Email Me",
    challenge: "Challenge",
    whatIOwned: "What I owned",
    whatIOwnedFallback:
      "Contributed to the product experience, implementation, and delivery across the parts of the build that moved the project forward.",
    outcome: "Outcome",
    outcomeFallback:
      "The shipped result strengthened the product flow and gave me stronger hands-on experience across implementation, iteration, and delivery.",
    projectType: "Project type",
    mobileFirstBuild: "Mobile-first product build",
    mobileFirstDesc:
      "Designed for smaller screens, repeated study use, and tighter mobile interaction flows.",
    responsiveWeb: "Responsive web experience",
    builtWith: "Built with",
    desktopDesc:
      "Built for larger-screen navigation, structured product flows, and web-first interaction patterns.",
    highlights: "Highlights",
    architecture: "Architecture",
    lessonsLearned: "Lessons learned",
    process: "Process",
    step: (n) => `Step ${n}`,
    moreProjects: "More Projects",
    appScreens: "App screens",
    insideTheFlow: "Inside the flow.",
    appScreensDesc:
      "A quick scan through the deck, search, practice, and game moments that make the product feel like a real mobile study tool.",
    moreScreens: (count) => `${count} more screens`,
    heroScreenshotAlt: (title) => `${title} hero screenshot`,
    appScreenAlt: (title, index) => `${title} app screen ${index}`,
  },
  gallery: {
    visualWalkthrough: "Visual walkthrough",
    screensFlowFeel: "Screens, flow, and feel.",
    shotOf: (index, total) => `Shot ${index} / ${total}`,
    mobileWalkthrough: "Mobile walkthrough",
    screenOf: (index, total) =>
      `Screen ${String(index).padStart(2, "0")} / ${total}`,
    desktopLayout: "Desktop layout",
    showPrevious: (title) => `Show previous ${title} screenshot`,
    showNext: (title) => `Show next ${title} screenshot`,
    showScreenshot: (index, title) =>
      `Show screenshot ${index} for ${title}`,
  },
  footer: {
    rights: (year) => `© ${year} Zozo. All rights reserved.`,
  },
};

const mn: UIDictionary = {
  nav: {
    about: "Миний тухай",
    skills: "Ур чадвар",
    projects: "Төслүүд",
    experience: "Туршлага",
    contact: "Холбоо барих",
  },
  common: {
    openMenu: "Цэс нээх",
    closeMenu: "Цэс хаах",
    languageToggleLabel: "Хэл солих",
    viewCaseStudyFor: (title) => `${title} төслийн дэлгэрэнгүйг үзэх`,
  },
  hero: {
    greeting: "Сайн байна уу, миний нэр бол",
    intro: (role) =>
      `Би Монголоос гаралтай, төвөгтэй асуудлыг энгийн бөгөөд үзэсгэлэнтэй шийдэл болгон хувиргах дуртай, зорилготой ${role}. Орчин үеийн веб технологийн бат бөх суурьтайгаар би гүйцэтгэл сайтай, хэрэглэгчид ээлтэй аппликейшн бүтээдэг.`,
    quickFactCapable: "Frontend болон backend ур чадвартай",
    quickFactWorkflow: "Бүтээгдэхүүн төвтэй ажлын хандлага",
    viewProjects: "Төслүүд үзэх",
    downloadResume: "Резюме татах",
    emailMe: "Имэйл бичих",
    viewGithub: "GitHub үзэх",
    currentFocus: "Одоогийн чиглэл",
    status: "Төлөв",
  },
  about: {
    eyebrow: "Профайл",
    heading: "Миний тухай",
    description:
      "Би хэрхэн ажилладаг, хаана хамгийн их үнэ цэнэ нэмдэг, яагаад frontend-д чиглэсэн болон full-stack бүтээгдэхүүний багуудад тохирдог тухай тодорхой дүр зураг.",
    whatIBring: "Юугаар хувь нэмэр оруулах вэ",
    basedIn: "Байршил",
    targeting: "Зорьж буй ажил",
    targetingValue: "Дадлага болон бага түвшний software engineer ажлын байр",
    bestFit: "Хамгийн тохирох",
  },
  skills: {
    eyebrow: "Үндсэн стек",
    heading: "Ур чадвар",
    description:
      "Энэ сайт дээрх төслүүдийн ард байгаа технологийн стек — өнгөлөг интерфэйс, mobile урсгалаас эхлээд backend логик, дата, detection ажил хүртэл.",
    skillsCount: (count) => `${count} ур чадвар`,
  },
  projects: {
    eyebrow: "Сонгосон ажлууд",
    heading: "Төслүүд",
    description:
      "Эдгээр төслүүд нь миний frontend ажлыг хэрхэн зохион байгуулдаг, бүтээгдэхүүний урсгалыг хэрхэн удирддаг, санааг хэрхэн бодит интерфэйс болгон хувиргадгийг хамгийн сайн харуулдаг.",
    featured: "Онцлох",
    viewCaseStudy: "Дэлгэрэнгүй үзэх",
    moreProjects: "Бусад төслүүд",
    footerNote:
      "Төсөл бүр одоо илүү гүнзгий контекст, үр дүн, дэлгэцийн зурагтай тусдаа дэлгэрэнгүй хуудастай боллоо.",
    talkCta: "Ямар нэгэн зүйл хамтдаа бүтээхээр ярилцъя",
  },
  experience: {
    eyebrow: "Сүүлийн зам",
    heading: "Туршлага",
    description:
      "Анхны сургалтаас эхлээд бодит хэрэгжсэн ажил, багийн хамтын ажиллагаа, бүтээгдэхүүнд чиглэсэн инженерийн дадал хэвшил хүртэл хэрхэн хөгжсөнийг ойлгох хамгийн хурдан арга.",
    current: "Одоогийн",
  },
  contact: {
    eyebrow: "Холбоо барих",
    heading: "Холбогдоорой",
    description:
      "Хэрэв та дадлага эсвэл бага түвшний software engineer ажлын байранд хүн хайж байгаа бол таны баг болон бүтээгдэхүүний талаар сонсохыг маш их хүсч байна.",
    readyHeading: "Зөв багаа хүлээж байна.",
    intro:
      "Би бодит бүтээгдэхүүний ажилд хувь нэмэр оруулж, хүчтэй санал хүсэлтээр дамжуулан хөгжиж, frontend болон backend чиглэлээр үргэлжлүүлэн бүтээх боломжтой баг хайж байна.",
    facts: [
      "Монголд байрладаг",
      "Дадлага болон бага түвшний ажлын байр хайж байна",
      "Frontend болон full-stack багуудад хамгийн тохиромжтой",
    ],
    formNameLabel: "Нэр",
    formNamePlaceholder: "Таны нэр",
    formEmailLabel: "Имэйл",
    formEmailPlaceholder: "your@email.com",
    formMessageLabel: "Зурвас",
    formMessagePlaceholder:
      "Ажлын байр, төсөл эсвэл боломжийн талаар надад хэлээрэй",
    send: "Зурвас илгээх",
    sending: "Илгээж байна...",
    successMessage: "Зурвас амжилттай илгээгдлээ. Би удахгүй тантай холбогдоно.",
    genericError: "Ямар нэг зүйл буруу боллоо. Дахин оролдоно уу.",
    networkError: "Одоогоор илгээх боломжгүй байна. Түр хүлээгээд дахин оролдоно уу.",
  },
  projectDetail: {
    backToProjects: "Төслүүд рүү буцах",
    liveDemo: "Live Demo",
    sourceCode: "Эх код",
    emailMe: "Имэйл бичих",
    challenge: "Сорилт",
    whatIOwned: "Хариуцсан ажил",
    whatIOwnedFallback:
      "Төслийг урагшлуулсан бүтээгдэхүүний туршлага, хэрэгжилт, хүргэлтийн хэсгүүдэд хувь нэмэр оруулсан.",
    outcome: "Үр дүн",
    outcomeFallback:
      "Хэрэгжсэн үр дүн нь бүтээгдэхүүний урсгалыг бэхжүүлж, хэрэгжилт, давталт, хүргэлтийн чиглэлээр илүү бодит гар туршлага өгсөн.",
    projectType: "Төслийн төрөл",
    mobileFirstBuild: "Mobile-first бүтээгдэхүүн",
    mobileFirstDesc:
      "Жижиг дэлгэц, давтан хэрэглээ, нягт mobile interaction урсгалд зориулан бүтээгдсэн.",
    responsiveWeb: "Responsive веб туршлага",
    builtWith: "Ашигласан технологи",
    desktopDesc:
      "Том дэлгэцийн navigation, бүтэцтэй бүтээгдэхүүний урсгал, веб-д тохирсон interaction загварт зориулан бүтээгдсэн.",
    highlights: "Онцлох зүйлс",
    architecture: "Архитектур",
    lessonsLearned: "Сурсан зүйлс",
    process: "Явц",
    step: (n) => `${n}-р алхам`,
    moreProjects: "Бусад төслүүд",
    appScreens: "Апп дэлгэц",
    insideTheFlow: "Урсгалын дотор.",
    appScreensDesc:
      "Дек, хайлт, дасгал, тоглоомын мөчүүдийг хурдан харж, бүтээгдэхүүнийг жинхэнэ mobile судлах хэрэгсэл мэт мэдрэмж өгдгийг харуулна.",
    moreScreens: (count) => `+${count} дэлгэц`,
    heroScreenshotAlt: (title) => `${title} үндсэн зураг`,
    appScreenAlt: (title, index) => `${title} аппын ${index}-р дэлгэц`,
  },
  gallery: {
    visualWalkthrough: "Дүрслэлийн тойм",
    screensFlowFeel: "Дэлгэц, урсгал, мэдрэмж.",
    shotOf: (index, total) => `${index} / ${total}`,
    mobileWalkthrough: "Mobile тойм",
    screenOf: (index, total) =>
      `Дэлгэц ${String(index).padStart(2, "0")} / ${total}`,
    desktopLayout: "Desktop зохион байгуулалт",
    showPrevious: (title) => `${title}-ийн өмнөх зургийг харуулах`,
    showNext: (title) => `${title}-ийн дараагийн зургийг харуулах`,
    showScreenshot: (index, title) =>
      `${title}-ийн ${index}-р зургийг харуулах`,
  },
  footer: {
    rights: (year) => `© ${year} Zozo. Бүх эрх хуулиар хамгаалагдсан.`,
  },
};

export const UI: Record<Locale, UIDictionary> = { en, mn };
