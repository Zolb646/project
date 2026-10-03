import { SiteContent } from "@/lib/types";

export const mn: SiteContent = {
  personal: {
    name: "Zozo",
    role: "Junior Frontend инженер",
    employer: "erxes Inc.",
    location: "Улаанбаатар, Монгол улс",
    employmentStatus: "erxes Inc.-ийн Junior Frontend инженер",
    summary: "Улаанбаатар хотод erxes Inc.-ийн Junior Frontend инженерээр ажилладаг. React, TypeScript ашиглан бүтээгдэхүүний интерфэйс хөгжүүлдэг бөгөөд full-stack веб, мобайл төслүүд дээр ажилласан туршлагатай.",
    resumeUrl: "/Zozo-resume.pdf",
    tagline: "erxes Inc.-д бүтээгдэхүүний интерфэйс хөгжүүлж, сайжруулдаг Junior Frontend инженер.",
    about: "Би Улаанбаатар хотод erxes Inc.-ийн Junior Frontend инженерээр ажилладаг. React, TypeScript ашиглан бүтээгдэхүүний интерфэйс хөгжүүлж, GraphQL API-тай холбон, багтайгаа кодын хяналт болон тогтмол сайжруулалт хийдэг. erxes-д орохоосоо өмнө Pinecone Academy-ийн программ хангамжийн сургалт, full-stack дадлагыг дүүргэсэн. Мөн Next.js, React Native, PostgreSQL ашигласан веб, мобайл төслүүд дээр ажилласан туршлагатай.",
    aboutHighlights: [
      "React, Next.js, TypeScript ашиглан responsive frontend туршлага бүтээж, layout, хөдөлгөөн, hierarchy-д сайн нүдтэй ажилладаг.",
      "Node.js, GraphQL, Prisma, PostgreSQL болон API-д суурилсан бүтээгдэхүүний ажлын урсгалаар backend функцуудыг хариуцдаг.",
      "Ганцаарчилсан болон багийн төслүүд дээр адилхан тав тухтай ажилладаг бөгөөд тодорхой, дэмжиж арчлах боломжтой бүтээгдэхүүн гаргахад анхаардаг.",
    ],
    focus: "Бүтээгдэхүүн төвтэй frontend болон full-stack хөгжүүлэлт",
    email: "info@zolbayrr.com",
    githubUrl: "https://github.com/Zolb646",
  },

  skills: [
    {
      title: "Frontend & Mobile",
      icon: "frontend",
      description:
        "Responsive интерфэйс, interaction урсгал, mobile-д ээлтэй бүтээгдэхүүний туршлага гаргахад миний хамгийн хүчтэй тал.",
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
        "Аппликейшны логик, authentication, API интеграц болон UI-ийн ард жинхэнэ бүтэц шаардлагатай хэсгүүдэд ашигладаг хэрэгслүүд.",
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
        "Миний бүтээж, гаргаж байсан full-stack ажлын ард байдаг хадгалалт болон deployment давхарга.",
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
        "Статик UI ажлаас илүү шаардсан баталгаажуулалт, detection ажлын урсгал, дата дээр суурилсан функцүүдийн туршлага.",
      skills: [
        "Jest",
        "Unit Testing",
        "Integration Testing",
        "E2E Testing",
        "MediaPipe",
      ],
    },
  ],

  projects: [
    {
      slug: "galexora",
      title: "Galexora",
      role: "Frontend хөгжүүлэгч",
      period: "2026",
      description:
        "Хүчтэй frontend түүх өгүүлэх чадвар, section архитектур, өнгөлсөн interaction ажлыг харуулахаар зохион бүтээсэн cinematic сансрын судалгааны сайт.",
      tags: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
      challenge:
        "Ердийн ерөнхий landing page мэт биш, брэндлэгдсэн, дэлгэрэнгүй мэдрэмж төрүүлэх portfolio маягийн бүтээгдэхүүний туршлага бүтээх.",
      ownership:
        "Сайтыг эхнээс нь дуустал зорилготой мэдрэмж төрүүлсэн frontend бүтээц, section систем, визуал хэмнэл, хөдөлгөөний сонголтуудыг бүрэн хариуцсан.",
      outcome:
        "Hierarchy, дахин ашиглаж болох section, визуал өнгөлгөөг хэрхэн зохицуулдгийг харуулсан, илүү санаанд үлдэх, presentation-т төвлөрсөн веб туршлагыг гаргасан.",
      highlights: [
        "Сайтыг өргөтгөх, сайжруулахад хялбар байлгахын тулд нэг том хуудасны оронд дахин ашиглаж болох section-ууд болгон бүтээсэн.",
        "Контентыг дийлдэхгүйгээр илүү хүчтэй брэндийн мэдрэмж төрүүлэхийн тулд хөдөлгөөн, давхаргалсан зураг, нягт хэмнэлийг ашигласан.",
        "Түүхийг жинхэнэ бүтээгдэхүүний аялал мэт мэдрэгдүүлэхийн тулд тусгай discoveries, technology, NASA APOD-оос санаа авсан section-уудыг нэмсэн.",
      ],
      process: [
        "Section-уудыг бүтээхээсээ өмнө хуудасны сэтгэл хөдлөлийн ерөнхий шугамыг зурж, сайтыг ерөнхий хувийн landing page гэхээсээ илүү бүтээгдэхүүний түүх мэт авч үзсэнээр эхэлсэн.",
        "Түүх өөрчлөгдөх бүрд бүх хуудсыг дахин бичихгүйгээр layout, зай, хөдөлгөөнийг тохируулах боломжтой байлгахын тулд section бүрийг дахин ашиглаж болох контентын блок болгон бүтээсэн.",
        "Scroll хийх туршлагыг контентыг уншигдахуйц хэвээр байлгасаар cinematic мэдрэмжтэй болгохын тулд зургийн давхарга, хөдөлгөөний цаг хугацаа, нягт шилжилтийг ашигласан.",
      ],
      architecture:
        "Сайт нь дахин ашиглаж болох section компонент, хуваалцсан design token, контент нэмэгдэх тусам өргөтгөх боломжтой animation-д суурилсан presentation давхаргатай, модуль бүтэцтэй Next.js frontend хэлбэрээр зохион байгуулагдсан.",
      lessons: [
        "Хүчтэй portfolio төсөлд зөвхөн цэвэр код биш, түүх хэрэгтэй. Туршлагын бүтэц нь хэрэгжилттэй адил чухал.",
        "Визуал section-уудыг дахин ашиглаж болох хэсгүүд болгон хуваасан нь хуудасны бусад хэсгийг тогтворгүй болгохгүйгээр хэмнэл, hierarchy-г сайжруулах боломжийг олгож, давтан сайжруулалтыг илүү хурдан болгосон.",
        "Хөдөлгөөн нь контенттой өрсөлдөхийн оронд анхаарал, хэмнэлийг дэмжих үед хамгийн хүчтэй мэдрэгддэг.",
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
      role: "Full-stack хөгжүүлэгч",
      period: "2026",
      description:
        "Хуваалцсан monorepo дотор багаараа бүтээсэн, ASL болон MNSL-ийг бодит цагт танидаг, дасгалын урсгал, admin удирддаг үг сантай дохионы хэлний платформ.",
      tags: ["Next.js", "GraphQL", "Prisma", "PostgreSQL", "MediaPipe"],
      challenge:
        "Бодит цагийн detection, сургалтын урсгал, admin удирддаг дохионы дата агуулсан бүтээгдэхүүний багийн monorepo дотор утга учиртай full-stack ажил хийж хувь нэмэр оруулах.",
      ownership:
        "Дасгал, сургалт, admin-ийн ажлын урсгалыг дэмжсэн Apollo GraphQL, Prisma, PostgreSQL ашигласан backend болон бүтээгдэхүүний функцуудыг хариуцсан.",
      outcome:
        "UI давхаргаас цаашилж ажиллаж, хамтын code base дотор хувь нэмэр оруулж чаддагийг харуулсан, илүү бүрэн сургалтын платформыг гаргахад тусалсан.",
      highlights: [
        "Хуваалцсан Nx monorepo болон хамтын ажлын урсгал дотор intern-3c багийн дохионы хэлний апп дээр ажилласан.",
        "Apollo GraphQL, Prisma болон PostgreSQL дээр суурилсан дохионы датаг боловсруулах backend ажлыг хэрэгжүүлсэн.",
        "Бодит цагийн detection, дасгал болон сургалтын хуудас, хөдөлгөөний sample удирддаг admin үг сангийн хэрэгслийг дэмжсэн.",
      ],
      process: [
        "Функцууд тусад нь биш, одоо байгаа загварт нийцэх ёстой байсан хамтын monorepo дотор ажилласан.",
        "Сургалтын аялал хуваагдмал биш бүрэн мэдрэгдэхийн тулд дохионы дата, дасгалын туршлага, admin хэрэгслийг холбосон бүтээгдэхүүний урсгалд анхаарсан.",
        "Schema дээр суурилсан дата боловсруулалт, бүтээгдэхүүний хуудас, контентыг арчлахад шаардлагатай дэмжих admin ажлын урсгал даяар full-stack ажилд хувь нэмэр оруулсан.",
      ],
      architecture:
        "Энэ төсөл нь хуваалцсан багийн monorepo дотор Next.js frontend-ийг Apollo GraphQL, Prisma, PostgreSQL болон MediaPipe дээр суурилсан detection урсгалтай хослуулсан.",
      lessons: [
        "Хамтын бүтээгдэхүүний ажил нь ялангуяа хуваалцсан monorepo дотор хувь хүний авьяас чадвараас илүү тодорхой байдал, тогтвортой байдлыг шаарддаг.",
        "Backend хувь нэмэр нь дасгал, сургалт, удирдлага зэрэг харагдах хэрэглэгчийн урсгалыг шууд дэмжих үед хамаагүй илүү үнэ цэнэтэй болдог.",
        "Detection-д суурилсан туршлага нь зөвхөн модель эсвэл камерын алхам биш, эргэн тойрны бүтээгдэхүүний урсгал сайн дэмжигдсэн үед хамгийн хүчтэй байдаг.",
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
      role: "Mobile аппликейшн хөгжүүлэгч",
      period: "2026",
      description:
        "Дек үүсгэх, AI тусламжтай карт үүсгэх, offline-first сургалтын урсгал, дасгалын мини тоглоомтой, багаараа бүтээсэн mobile үгийн сангийн апп.",
      tags: ["Expo", "React Native", "TypeScript", "SQLite", "Clerk"],
      highlights: [
        "Дек, сургалт, тоглоомын дэлгэц даяар өнгөлсөн сургалтын урсгалыг дэмжихийн тулд Expo Router, React Native ашиглан бүтээсэн.",
        "Бодит offline-first хэрэглээг дэмжихийн тулд local SQLite хадгалалт, нэвтэрсэн хэрэглэгч, AI тусламжтай карт үүсгэлтийг ашигласан.",
        "Memory match, scramble, speed quiz, falling words, hangman зэрэг тоглоомын горимуудыг агуулсан.",
      ],
      challenge:
        "Offline хэрэглээ, олон сургалтын горимыг дэмжсэнээр зөвхөн статик flashcard апп биш, бодит хэрэгтэй бөгөөд татагдам mobile сургалтын туршлага бүтээх.",
      ownership:
        "Navigation, сургалтын урсгал, дек interaction, аппын тоглоомын хэсгүүд даяар mobile бүтээгдэхүүний туршлагад хувь нэмэр оруулсан.",
      outcome:
        "Илүү хүчтэй retention механизм, сайжирсан mobile хэрэглээ, хэрэглэгчид тогтмол дасгал хийх илүү олон боломжтой, өргөн хүрээтэй үгийн сангийн бүтээгдэхүүн болсон.",
      process: [
        "Хэрэглэгчид дек, сургалтын урсгал, мини тоглоомуудын хооронд туршлага тасарсан мэдрэмжгүйгээр шилжиж чаддаг байхаар аппыг бодит сургалтын зан төлөвт үндэслэн төлөвлөсөн.",
        "Апп энгийн дек харагч байхаас цаашлан томрох тусам удирдахад хялбар байлгахын тулд Expo Router, React Native загваруудыг ашиглан дэлгэцүүдийг зохион байгуулсан.",
        "Offline-д ээлтэй local хадгалалт, нэвтэрсэн хэрэглэгч, AI тусламжтай карт үүсгэлтийг нэг mobile ажлын урсгал болгон нэгтгэснээр бодит хэрэглээг дэмжсэн.",
      ],
      architecture:
        "Mobile апп нь route-д суурилсан дэлгэцийн зохион байгуулалттай Expo, React Native, local хадгалалтад SQLite, authentication-д Clerk, сургалтын систем дээр давхарлагдсан тусгай тоглоомын дэлгэцүүдийг ашигладаг.",
      lessons: [
        "Нэмэлт алхам бүр сургалтын дадлыг сулруулдаг тул mobile сургалтын бүтээгдэхүүнд хурдан, бэрхшээлгүй урсгал хэрэгтэй.",
        "Хэрэглэгчид хаанаас ч хандах боломжийг хүлээдэг тул offline-first дэмжлэг нь сургалтын аппуудын чанарыг мэдэгдэхүйц өөрчилдөг.",
        "Мини тоглоомууд тусдаа demo мэт биш, ижил үгийн сангийн системийг бэхжүүлэх үед хамгийн үр дүнтэй ажилладаг.",
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
      role: "Full-stack хөгжүүлэгч",
      period: "2025",
      description:
        "Authentication, чиглүүлсэн quiz урсгал, өгөгдлийн санд суурилсан контент удирдлагатай quiz платформ.",
      tags: ["Next.js", "TypeScript", "Prisma", "Clerk", "PostgreSQL"],
      highlights: [
        "Чиглүүлсэн хэрэглэгчийн туршлагад зориулж home, summary, quiz, results төлвүүдийг хэрэгжүүлсэн.",
        "Clerk authentication болон Prisma дээр суурилсан дата загварчлал, migration, backend тохиргоог нэгтгэсэн.",
        "Article-д суурилсан контентод зориулж API route, quiz-тэй холбоотой дата боловсруулалтыг нэмсэн.",
      ],
      challenge:
        "Нэг дэлгэцтэй прототипийн оронд authentication, бүтэцтэй контент, утга учиртай үр дүнгийн боловсруулалттай бүрэн бүтээгдэхүүний урсгал болгон quiz-ийн санааг хувиргах.",
      ownership:
        "Хуудасны төлөв, auth интеграц, өгөгдлийн санд суурилсан model, quiz-тэй холбоотой API ажил зэрэг frontend болон backend давхарга даяар бүтээсэн.",
      outcome:
        "UI урсгал, backend бүтэц, deployment хийхэд бэлэн application логикийг холбож чаддагийг харуулсан илүү бүрэн quiz туршлагыг гаргасан.",
      process: [
        "Хэрэглэгчид тусдаа хуудсуудын оронд эхлэлээс дуустал тодорхой замтай байхаар аппыг бүрэн quiz аялалд төвлөрүүлэн зохион бүтээсэн.",
        "Бүтээгдэхүүний бүтэц эхнээсээ бодит хэрэглэгч, бодит контентыг дэмжих боломжтой байхаар Clerk authentication, Prisma model-уудыг эрт холбосон.",
        "Article-д суурилсан quiz дата-г дэмжиж, frontend төлвүүдийг ашиглаж болох application дататай холбоотой байлгахын тулд backend route, контент боловсруулалтыг нэмсэн.",
      ],
      architecture:
        "Апп нь frontend-д Next.js, TypeScript, authentication-д Clerk, дата загварчлал болон backend хадгалалтад Prisma-г PostgreSQL-тай хамт ашигладаг.",
      lessons: [
        "Жижиг full-stack апп ч гэсэн хэрэглэгчийн аяллыг тусдаа хуудсуудыг бүтээхээсээ өмнө тодорхойлбол хамаагүй тодорхой болдог.",
        "Authentication, дата загварчлалын шийдвэрүүд бүхэл бүтээгдэхүүнийг бүрдүүлдэг тул эдгээрийг эрт холбосноор дараа дахин их ажил хийхээс сэргийлдэг.",
        "Үр дүн, summary төлвүүд энгийн interaction-ийг илүү бүрэн бүтээгдэхүүний loop болгодог тул чухал.",
      ],
      liveUrl: "https://quiz-app-theta-gilt.vercel.app/",
      githubUrl: "https://github.com/Zolb646/quiz-app",
      image: "/projects/quiz-app.png",
      images: ["/projects/quiz-app.png"],
      imageLayout: "desktop",
    },
  ],

  experiences: [
    {
      role: "Junior Frontend инженер",
      company: "erxes Inc.",
      period: "2026 — одоог хүртэл",
      current: true,
      description: "erxes Inc.-ийн инженерийн багт бүтээгдэхүүний frontend функцүүдийг хөгжүүлж, сайжруулан ажиллаж байна.",
      tags: [
        "React",
        "TypeScript",
        "GraphQL"
      ],
      highlights: [
        "TypeScript, React monorepo дотор бизнесийн ажлын урсгалд зориулсан дахин ашиглах компонент, дэлгэцийн хэмжээнд зохицох интерфэйс бүтээдэг.",
        "GraphQL API болон дундын үйлчилгээнүүдийг холбож, эрхийн шалгалт, ачаалал, алдаа, асинхрон шинэчлэлтийн төлөвүүдийг зохицуулдаг.",
        "Кодын хяналт, алдаа засвар, бүтцийн сайжруулалтаар багтайгаа хамтран бүтээгдэхүүний чанар, арчлах боломжийг сайжруулдаг."
      ]
    },
    {
      role: "Frontend дадлагажигч",
      company: "erxes Inc.",
      period: "2026 оны 6–8-р сар",
      description: "erxes Inc.-д frontend дадлага хийж, дараа нь одоогийн Junior Frontend инженерийн ажилдаа шилжсэн.",
      tags: ["Дадлага", "Frontend хөгжүүлэлт"],
      highlights: [],
    },
    {
      role: "Программ хангамжийн суралцагч, Full-stack дадлагажигч",
      company: "Pinecone Academy",
      period: "2025 оны 7-р сар — 2026 оны 4-р сар",
      description: "Төсөлд суурилсан программ хангамжийн сургалтыг дүүргэж, full-stack дадлагын хүрээнд дохионы хэл сурах платформыг багаараа хөгжүүлсэн.",
      tags: [
        "Сургалт",
        "Full-stack хөгжүүлэлт",
        "Багийн төсөл"
      ],
      highlights: [
        "Next.js, GraphQL, Prisma, PostgreSQL, MediaPipe ашиглан хуваалцсан monorepo дотор дохионы хэл сурах функцүүдийг хөгжүүлсэн.",
        "Нэвтрэлт, API холболт, локал хадгалалт, офлайн сургалтын урсгалтай веб болон мобайл төслүүд бүтээсэн.",
        "Expo, React Native ашиглан WordGym-ийн үгийн сан, дасгал, тоглоомын хэсгүүд дээр ажилласан."
      ]
    },
    {
      role: "Ахлах сургууль төгссөн",
      company: "Ахлах сургууль",
      period: "2025",
      description:
        "2025 онд ахлах сургуулиа төгсөж, software engineering-ийг өөрийн замаар сонгон эрт зорилго тавьсан.",
      tags: ["Боловсрол", "Төгсөлт"],
      highlights: [
        "2025 онд ахлах сургуулиа төгссөн.",
        "Төгссөний дараа software engineering-д ноцтой анхаарал хандуулж эхэлсэн.",
      ],
    },
  ],

  socialLinks: [
    { label: "GitHub", href: "https://github.com/Zolb646", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/b-zolbayar-a856053b3/",
      icon: "linkedin",
    },
  ],
};
