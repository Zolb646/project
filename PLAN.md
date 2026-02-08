# Neo-Brutalism Portfolio Website - Implementation Plan

## Context
"Zozo" нэртэй Software Engineer-ийн хувийн portfolio вэбсайт бүтээнэ. Neo-brutalism дизайн загвар ашиглана — тод өнгө, зузаан хүрээ, хатуу сүүдэр, тэгш гадаргуу. Next.js App Router, TypeScript, Tailwind CSS v4 дээр суурилна. Single-page layout, бүх section-ууд нэг хуудсанд smooth scroll-тэй.

**Одоо байгаа төсөл:** `zozos-portfolia/` — Next.js 16.1.6, React 19, Tailwind CSS 4, TypeScript 5. Хоосон page.tsx, минимал globals.css.

---

## File Structure

```
src/
  app/
    globals.css              -- Tailwind v4 @theme, өнгө, сүүдэр, utilities
    layout.tsx               -- SEO metadata, Navbar + Footer, scroll-smooth
    page.tsx                 -- Бүх section-ийг нэгтгэнэ

  components/
    ui/
      Button.tsx             -- Neo-brutal товч (primary/secondary/outline)
      Card.tsx               -- Хүрээтэй карт, хатуу сүүдэр
      SectionHeading.tsx     -- Section гарчиг + өнгөт underline
      Badge.tsx              -- Tech stack таг
      Container.tsx          -- Max-width wrapper
      Input.tsx              -- Form input
      Textarea.tsx           -- Form textarea
      IconLink.tsx           -- Icon + link
      AnimateOnScroll.tsx    -- Scroll fade-in wrapper (Client Component)

    layout/
      Navbar.tsx             -- Sticky nav + scroll-spy (Client Component)
      MobileMenu.tsx         -- Mobile цэс overlay (Client Component)
      Footer.tsx             -- Footer

    sections/
      HeroSection.tsx        -- Нэр, role, tagline, CTA товчууд
      AboutSection.tsx       -- Танилцуулга
      SkillsSection.tsx      -- Ур чадвар карт grid
      ProjectsSection.tsx    -- Төслийн карт grid
      ExperienceSection.tsx  -- Timeline layout
      ContactSection.tsx     -- Contact form + social links (Client Component)

  lib/
    types.ts                 -- TypeScript interfaces
    constants.ts             -- Nav links, section IDs
    data.ts                  -- Бүх placeholder контент
```

---

## Color Palette (Warm Cream Theme)

| Token | Hex | Хэрэглээ |
|-------|-----|----------|
| `cream` | `#FEF9EF` | Үндсэн дэвсгэр |
| `navy` | `#1A1A2E` | Текст, хүрээ, сүүдэр |
| `muted` | `#4A4A68` | Хоёрдогч текст |
| `accent-orange` | `#FF6B35` | Primary CTA, link |
| `accent-teal` | `#4ECDC4` | Secondary highlight |
| `accent-yellow` | `#FFE66D` | Badge, декор |
| `accent-violet` | `#A855F7` | Hover state |

---

## Neo-Brutalism Загварын Дүрэм

- **Хүрээ:** `border-[3px] border-navy` бүх карт, товч дээр
- **Сүүдэр:** `shadow-brutal` = `5px 5px 0 0 #1A1A2E` (blur байхгүй)
- **Товч hover:** Translate down-right + shadow арилна → "дарах" эффект
- **Карт hover:** `-translate-y-1` + shadow томорно
- **Дугуйрсан булан байхгүй:** `rounded-none` эсвэл маш бага

---

## Implementation Order

### Phase 1: Foundation
1. **`globals.css`** — `@theme` блок: өнгө, сүүдэр, font mapping, `@utility border-3`, keyframe animations, `::selection`, scroll-behavior
2. **`lib/types.ts`** — Project, SkillCategory, Experience interfaces
3. **`lib/constants.ts`** — NAV_LINKS, SECTION_IDS
4. **`lib/data.ts`** — Placeholder контент (нэр: "Zozo", role: "Software Engineer")

### Phase 2: UI Components
5. **`ui/Container.tsx`** — `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
6. **`ui/Button.tsx`** — 3 variant, press animation hover effect
7. **`ui/Card.tsx`** — Border + shadow, optional hover lift
8. **`ui/SectionHeading.tsx`** — h2 + өнгөт underline block
9. **`ui/Badge.tsx`** — Mono font, uppercase, өнгөт дэвсгэр
10. **`ui/IconLink.tsx`** — Social link-ийн icon+text
11. **`ui/Input.tsx` + `ui/Textarea.tsx`** — Brutal border, focus shadow
12. **`ui/AnimateOnScroll.tsx`** — IntersectionObserver + `animate-in` class

### Phase 3: Layout
13. **`layout/Navbar.tsx`** — Sticky, scroll-spy, hamburger toggle (Client)
14. **`layout/MobileMenu.tsx`** — Full-screen overlay, slide-in (Client)
15. **`layout/Footer.tsx`** — Copyright, social links
16. **`layout.tsx` шинэчлэх** — Metadata, Navbar/Footer нэмэх, `scroll-smooth`

### Phase 4: Sections
17. **`sections/HeroSection.tsx`** — min-h-screen, Zozo нэр 6xl/8xl, tagline, 2 CTA Button
18. **`sections/AboutSection.tsx`** — 2 багана (text + card/image)
19. **`sections/SkillsSection.tsx`** — 3 багана grid, Badge-тай Card
20. **`sections/ProjectsSection.tsx`** — 2 багана grid, project Card-ууд
21. **`sections/ExperienceSection.tsx`** — Vertical timeline, зузаан шугам
22. **`sections/ContactSection.tsx`** — mailto: form + social links (Client)

### Phase 5: Assembly
23. **`page.tsx`** — Бүх section-ийг import хийж нэгтгэнэ

### Phase 6: SEO & Polish
24. `sitemap.ts`, `robots.txt` нэмэх
25. JSON-LD structured data (Person schema)
26. Responsive audit бүх breakpoint-д

---

## Fonts
- **Geist Sans** — Бүх гарчиг, текст, nav
- **Geist Mono** — "Software Engineer" label, Badge, timeline dates

## Animations
- **Button press:** `hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none` + `transition-all duration-150`
- **Card hover:** `hover:-translate-y-1 hover:shadow-brutal-lg` + `transition-all duration-200`
- **Scroll fade-in:** `AnimateOnScroll` wrapper — `IntersectionObserver` + CSS `fade-in-up` keyframe (opacity 0→1, translateY 20px→0, 500ms)
- **Mobile menu:** `translate-x-full → translate-x-0`, `duration-300`

## Contact Form
- `mailto:` link approach — backend шаардлагагүй
- Form UI бүрэн харагдана, Submit дарахад `mailto:` линк нээгдэнэ

## SEO
- Next.js Metadata API — title, description, OpenGraph, Twitter card
- Semantic HTML — header, main, section, footer, nav, h1-h3
- `next/image` зураг optimize хийнэ
- Server Components анхдагч — зөвхөн 4 Client Component

## Шинэ dependency шаардлагагүй
Бүх зүйлийг одоо байгаа stack-ээр (Next.js, React, Tailwind, TypeScript) хийнэ. Inline SVG icon ашиглана.

---

## Verification
1. `npm run dev` → localhost дээр бүх section зөв харагдах
2. Mobile responsive шалгах (Chrome DevTools)
3. Lighthouse audit — Performance, SEO, Accessibility
4. Бүх nav link smooth scroll ажиллах
5. Button, Card hover animation шалгах
6. Contact form mailto: зөв нээгдэх
