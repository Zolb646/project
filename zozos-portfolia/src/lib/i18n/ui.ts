import { Locale } from "./types";
import { PERSON_NAME } from "@/lib/site";

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
    headlineLines: string[];
    projectAvailability: string;
    intro: (role: string) => string;
    viewProjects: string;
    downloadResume: string;
    viewGithub: string;
    currentFocus: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    description: string;
    whatIBring: string;
    basedIn: string;
    currentCompany: string;
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
    greeting: "Zozo / Junior Frontend Engineer",
    headlineLines: ["Zozo.", "Frontend", "Engineer."],
    projectAvailability: "Open for freelance projects",
    intro: (role) =>
      `I'm ${PERSON_NAME} (Zozo), a ${role.toLowerCase()} at erxes Inc. in Ulaanbaatar. I build production interfaces with React and TypeScript, with experience across full-stack web and mobile projects.`,
    viewProjects: "View Projects",
    downloadResume: "Download Resume",
    viewGithub: "View GitHub",
    currentFocus: "Current focus",
  },
  about: {
    eyebrow: "Profile",
    heading: "The person behind the pixels.",
    description:
      "Junior Frontend Engineer at erxes Inc., with experience across production interfaces, full-stack development, and mobile projects.",
    whatIBring: "What I bring",
    basedIn: "Based in",
    currentCompany: "Currently at",
    bestFit: "Best fit",
  },
  skills: {
    eyebrow: "Core stack",
    heading: "Tools I build with.",
    description:
      "The stack behind the projects on this site, from polished interfaces and mobile flows to backend logic, data, and detection work.",
    skillsCount: (count) => `${count} skills`,
  },
  projects: {
    eyebrow: "Selected work",
    heading: "A few things I've built.",
    description:
      "Selected work across interactive web experiences, collaborative full-stack development, and mobile learning.",
    featured: "Featured",
    viewCaseStudy: "View case study",
    moreProjects: "More Projects",
    footerNote:
      "Open a case study to see the decisions, contribution, and result behind each project.",
    talkCta: "Let's talk about building something",
  },
  experience: {
    eyebrow: "Recent path",
    heading: "Learning. Building. Shipping.",
    description:
      "Currently a Junior Frontend Engineer at erxes Inc., following software engineering training and a full-stack internship at Pinecone Academy.",
    current: "Current",
  },
  contact: {
    eyebrow: "Contact",
    heading: "Let's build something.",
    description:
      "Need a website, a frontend feature, or improvements to an existing product? I am open to freelance projects alongside my role at erxes Inc.",
    readyHeading: "Tell me what you want to build.",
    intro:
      "Share your goals, scope, and timeline. We can discuss how I can help with responsive interfaces, React and Next.js development, or API integration, and agree on availability before starting.",
    facts: [
      "Based in Mongolia",
      "Junior Frontend Engineer at erxes Inc.",
      "Open to freelance client projects",
    ],
    formNameLabel: "Name",
    formNamePlaceholder: "Your name",
    formEmailLabel: "Email",
    formEmailPlaceholder: "your@email.com",
    formMessageLabel: "Message",
    formMessagePlaceholder: "What do you need built? Include the scope, timeline, and budget if available.",
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
    greeting: "Zozo / Junior Frontend инженер",
    headlineLines: ["Zozo.", "Frontend", "инженер."],
    projectAvailability: "Захиалгат төсөлд нээлттэй",
    intro: () =>
      `Намайг ${PERSON_NAME} (Zozo) гэдэг. Улаанбаатар хотод erxes Inc.-ийн Junior Frontend инженерээр ажилладаг. React, TypeScript ашиглан бүтээгдэхүүний интерфэйс хөгжүүлдэг бөгөөд full-stack веб, мобайл төслүүд дээр ажилласан туршлагатай.`,
    viewProjects: "Төслүүд үзэх",
    downloadResume: "Резюме татах",
    viewGithub: "GitHub үзэх",
    currentFocus: "Одоогийн чиглэл",
  },
  about: {
    eyebrow: "Профайл",
    heading: "Кодын ард байгаа хүн.",
    description:
      "erxes Inc.-д Junior Frontend инженерээр ажилладаг. Бүтээгдэхүүний интерфэйс, full-stack хөгжүүлэлт, мобайл төслүүд дээр ажилласан туршлагатай.",
    whatIBring: "Юугаар хувь нэмэр оруулах вэ",
    basedIn: "Байршил",
    currentCompany: "Одоо ажиллаж буй",
    bestFit: "Хамгийн тохирох",
  },
  skills: {
    eyebrow: "Үндсэн стек",
    heading: "Бүтээхэд ашигладаг хэрэгслүүд.",
    description:
      "Энэ сайт дээрх төслүүдийн ард байгаа технологийн стек — өнгөлөг интерфэйс, mobile урсгалаас эхлээд backend логик, дата, detection ажил хүртэл.",
    skillsCount: (count) => `${count} ур чадвар`,
  },
  projects: {
    eyebrow: "Сонгосон ажлууд",
    heading: "Миний бүтээсэн ажлууд.",
    description:
      "Интерактив веб, багийн full-stack хөгжүүлэлт, mobile сургалтын чиглэлийн сонгосон ажлууд.",
    featured: "Онцлох",
    viewCaseStudy: "Дэлгэрэнгүй үзэх",
    moreProjects: "Бусад төслүүд",
    footerNote:
      "Төсөл бүрийн шийдвэр, миний оролцоо, үр дүнг дэлгэрэнгүй хуудаснаас үзээрэй.",
    talkCta: "Ямар нэгэн зүйл хамтдаа бүтээхээр ярилцъя",
  },
  experience: {
    eyebrow: "Сүүлийн зам",
    heading: "Сурч, бүтээж, хэрэгжүүлж байна.",
    description:
      "Pinecone Academy-ийн программ хангамжийн сургалт, full-stack дадлагыг дүүргээд одоо erxes Inc.-д Junior Frontend инженерээр ажиллаж байна.",
    current: "Одоогийн",
  },
  contact: {
    eyebrow: "Холбоо барих",
    heading: "Хамтдаа бүтээе.",
    description:
      "Вебсайт, frontend функц эсвэл одоогийн бүтээгдэхүүнээ сайжруулах хэрэгтэй юу? erxes Inc. дэх ажлынхаа хажуугаар захиалгат төсөл авахад нээлттэй.",
    readyHeading: "Юу бүтээхийг хүсэж байна вэ?",
    intro:
      "Төслийн зорилго, ажлын хүрээ, хугацаагаа бичээрэй. Интерфэйс, React болон Next.js хөгжүүлэлт, API холболт дээр хэрхэн туслах боломжтойг ярилцаж, эхлэхээсээ өмнө ажиллах цагаа тохиролцъё.",
    facts: [
      "Монголд байрладаг",
      "erxes Inc.-ийн Junior Frontend инженер",
      "Захиалгат төсөлд нээлттэй",
    ],
    formNameLabel: "Нэр",
    formNamePlaceholder: "Таны нэр",
    formEmailLabel: "Имэйл",
    formEmailPlaceholder: "your@email.com",
    formMessageLabel: "Зурвас",
    formMessagePlaceholder:
      "Юу бүтээлгэх хэрэгтэй вэ? Ажлын хүрээ, хугацаа, боломжтой бол төсвөө бичээрэй.",
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
