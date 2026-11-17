"use client";

import Image from "next/image";
import { useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useContent } from "@/lib/i18n/useContent";
import { SECTION_IDS } from "@/lib/constants";

export default function HeroSection() {
  const { personal, ui } = useContent();
  const [portraitSrc, setPortraitSrc] = useState("/profile-editorial.png");
  const [showProfile, setShowProfile] = useState(false);

  return (
    <section id={SECTION_IDS.hero} className="flex flex-col justify-center border-b-3 border-navy pb-[var(--section-space)] pt-[var(--page-top-space)] lg:min-h-svh">
      <Container wide>
        <div className="grid items-center gap-[clamp(2.5rem,5vw,6rem)] md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <p className="mb-7 flex items-center gap-3 text-sm font-bold sm:text-base">
              <span className="h-3 w-3 border-2 border-navy bg-accent-orange" aria-hidden="true" />
              {ui.hero.greeting}
            </p>
            <h1 className="font-display text-[clamp(2.35rem,min(7vw,13dvh),6.75rem)] font-extrabold leading-[0.99] tracking-[-0.055em]">
              {ui.hero.headlineLines.map((line) => <span key={line} className="block">{line}</span>)}
            </h1>
            <p className="mt-8 max-w-[49ch] text-base leading-[1.8] text-muted sm:text-lg xl:text-xl">{ui.hero.intro(personal.role)}</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Button href={`#${SECTION_IDS.projects}`}>
                {ui.hero.viewProjects}<span aria-hidden="true">↘</span>
              </Button>
              <Button href={personal.resumeUrl} variant="outline" download target="_blank" rel="noreferrer">
                {ui.hero.downloadResume}<span aria-hidden="true">↓</span>
              </Button>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-bold sm:text-sm">
              <span className="flex items-center gap-2 text-muted">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
                {personal.location}
              </span>
              <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-2 underline-offset-4 hover:decoration-4">{ui.hero.viewGithub}</a>
            </div>
          </div>

          <div className="portrait-stage relative mx-auto w-full max-w-[clamp(15rem,60dvh,32.5rem)] border-2 border-navy/20 bg-accent-orange/30 p-[clamp(1rem,4vw,2.25rem)]">
            <figure className="relative rotate-[-3deg] border-3 border-navy bg-white p-3 shadow-brutal-lg">
              <div className="portrait-window relative aspect-[4/4.6] overflow-hidden border-2 border-navy bg-cream">
                <div className="portrait-card absolute inset-0" data-flipped={showProfile}>
                  <div className="portrait-face absolute inset-0" aria-hidden={showProfile}>
                    <Image
                      src={portraitSrc}
                      alt={`${personal.name} portrait`}
                      fill
                      preload
                      sizes="(min-width: 768px) min(36vw, 60dvh, 420px), min(75vw, 420px)"
                      className="object-cover"
                      onError={() => {
                        if (portraitSrc !== "/profile.jpg") setPortraitSrc("/profile.jpg");
                      }}
                    />
                  </div>
                  <div id="hero-profile" aria-hidden={!showProfile} inert={!showProfile} className="portrait-face portrait-back absolute inset-0 overflow-y-auto bg-cream p-[clamp(0.75rem,3vw,2rem)]">
                    <div className="flex min-h-full flex-col justify-center gap-[clamp(0.65rem,2vw,1.5rem)]">
                      <p className="font-display text-[clamp(1.2rem,3vw,2rem)] font-extrabold leading-tight">{ui.hero.profileDetails}</p>
                      <dl className="space-y-2 text-xs sm:text-sm">
                        <div><dt className="text-muted">{ui.about.currentCompany}</dt><dd className="font-bold">{personal.employer}</dd></div>
                        <div><dt className="text-muted">{ui.about.basedIn}</dt><dd className="font-bold">{personal.location}</dd></div>
                        <div><dt className="text-muted">{ui.hero.currentFocus}</dt><dd className="font-bold">{personal.focus}</dd></div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <figcaption className="flex items-center justify-between gap-4 px-1 pb-1 pt-4">
                <div>
                  <p className="font-display text-3xl font-extrabold tracking-tight">{personal.name}.</p>
                  <p className="mt-1 text-xs font-bold text-muted">{personal.role}</p>
                </div>
                <span aria-hidden="true" className="font-mono text-3xl font-bold text-accent-orange-ink">&lt;/&gt;</span>
              </figcaption>
            </figure>
            <a href={`#${SECTION_IDS.contact}`} className="absolute -top-4 left-4 max-w-[calc(100%-2rem)] rotate-[3deg] border-3 border-navy bg-accent-yellow px-3 py-2 text-xs font-extrabold shadow-brutal-sm hover:underline sm:left-7 sm:text-sm" title={personal.employmentStatus}>
              <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full border-2 border-navy bg-accent-teal-ink" aria-hidden="true" />
              {ui.hero.projectAvailability}
            </a>
            <button type="button" aria-controls="hero-profile" aria-pressed={showProfile} aria-label={ui.hero.flipPortrait} title={ui.hero.flipPortrait} onClick={() => setShowProfile((visible) => !visible)} className="absolute -bottom-5 -right-2 grid size-[clamp(3.75rem,8vw,7rem)] cursor-pointer place-items-center transition-transform hover:rotate-12 active:scale-95">
              <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true" className="absolute inset-0 size-full rotate-[8deg] text-accent-orange">
                <path d="m50 2 9 25 24-13-7 27 24 9-24 9 7 27-24-13-9 25-9-25-24 13 7-27-24-9 24-9-7-27 24 13Z" stroke="var(--color-navy)" strokeWidth="2.5" strokeLinejoin="miter" />
              </svg>
              <span aria-hidden="true" className={`relative text-xl font-extrabold transition-transform duration-[380ms] sm:text-2xl ${showProfile ? "rotate-180" : ""}`}>↻</span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
