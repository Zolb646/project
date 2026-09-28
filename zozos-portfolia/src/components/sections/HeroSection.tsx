"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useContent } from "@/lib/i18n/useContent";
import { SECTION_IDS } from "@/lib/constants";

export default function HeroSection() {
  const { personal: PERSONAL, ui } = useContent();

  return (
    <section
      id={SECTION_IDS.hero}
      className="flex min-h-[min(820px,100svh)] items-center pb-16 pt-28 sm:pb-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-accent-orange-ink sm:text-base">
              {ui.hero.greeting}
            </p>
            <h1 className="mt-5 max-w-[14ch] text-[clamp(3.2rem,5vw,5.3rem)] font-black leading-[0.97] tracking-[-0.055em] text-navy">
              {ui.hero.headline}
            </h1>
            <p className="mt-7 max-w-[58ch] text-base leading-relaxed text-muted sm:text-lg">
              {ui.hero.intro(PERSONAL.role)}
            </p>
            <div className="mt-8 space-y-1 text-sm font-medium text-muted">
              <p>{PERSONAL.location}</p>
              <p className="flex items-start gap-2">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-teal-ink" aria-hidden="true" />
                {PERSONAL.availability}
              </p>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href={`#${SECTION_IDS.projects}`} variant="primary">
                {ui.hero.viewProjects}
              </Button>
              <Button
                href={PERSONAL.resumeUrl}
                variant="secondary"
                download
                target="_blank"
                rel="noreferrer">
                {ui.hero.downloadResume}
              </Button>
              <a
                href={PERSONAL.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-accent-orange-ink sm:text-base">
                {ui.hero.viewGithub}
                <span aria-hidden="true">-&gt;</span>
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[440px] pb-5">
            <div className="absolute -top-5 right-0 h-28 w-28 border-3 border-navy bg-accent-yellow shadow-brutal-sm" aria-hidden="true" />
            <div className="relative aspect-4/5 w-full overflow-hidden border-3 border-navy bg-cream shadow-brutal-lg">
              <Image
                src="/profile-editorial.png"
                alt={`${PERSONAL.name} portrait`}
                fill
                priority
                sizes="(min-width: 1024px) 440px, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-navy via-navy/75 to-transparent px-6 pb-6 pt-14 text-cream">
                <p className="text-xs font-semibold text-accent-yellow">
                  {ui.hero.currentFocus}
                </p>
                <p className="mt-1 text-base font-semibold sm:text-lg">{PERSONAL.focus}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
