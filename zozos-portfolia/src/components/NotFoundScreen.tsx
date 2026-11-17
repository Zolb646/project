import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/types";

const copy = {
  en: {
    label: "Page not found",
    title: "This page went for coffee.",
    description: "Or maybe it never existed. Either way, there’s still plenty of good stuff back at the portfolio.",
    home: "Back to home",
    projects: "Explore projects",
    note: "No page. Still brewing ideas.",
  },
  mn: {
    label: "Хуудас олдсонгүй",
    title: "Энэ хуудас кофе уухаар явжээ.",
    description: "Эсвэл анхнаасаа байгаагүй ч юм билүү. Харин портфолио дээр үзэх сонирхолтой төслүүд бий шүү.",
    home: "Нүүр рүү буцах",
    projects: "Төслүүд үзэх",
    note: "Хуудас алга. Санаа бол бий.",
  },
};

export default function NotFoundScreen({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <section className="flex min-h-[85svh] items-center pb-[var(--section-space)] pt-[var(--page-top-space)]">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <p className="mb-5 font-mono text-sm font-semibold text-muted">404 / {text.label}</p>
            <h1 className="max-w-[16ch] font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">{text.title}</h1>
            <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-muted sm:text-lg">{text.description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={localizedPath(locale, "/")}>{text.home}</Button>
              <Button href={localizedPath(locale, "/#projects")} variant="outline">{text.projects}</Button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[min(85%,24rem)] rotate-[3deg] border-3 border-navy bg-accent-yellow p-7 text-center shadow-brutal-lg sm:p-10">
            <svg aria-hidden="true" viewBox="0 0 160 120" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="mx-auto h-auto w-36 max-w-full text-navy">
              <path d="M42 43h69v35a25 25 0 0 1-25 25H67a25 25 0 0 1-25-25V43Z" fill="var(--color-cream)" />
              <path d="M111 52h11a15 15 0 0 1 0 30h-12M30 105h94M61 31c-12-13 12-13 0-26M80 31c-12-13 12-13 0-26M99 31c-12-13 12-13 0-26" />
              <path d="m64 68 8 8-8 8m25-16-8 8 8 8" />
            </svg>
            <p aria-hidden="true" className="mt-3 font-display text-[clamp(3.25rem,17vw,8rem)] font-extrabold leading-none tracking-[-0.07em]">404</p>
            <p className="mt-5 border-t-2 border-navy pt-4 text-sm font-bold">{text.note}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
