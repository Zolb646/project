"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ProjectPlayground from "@/components/projects/ProjectPlayground";
import { useContent } from "@/lib/i18n/useContent";
import { SECTION_IDS } from "@/lib/constants";

export default function HeroSection() {
  const { personal, ui } = useContent();

  return (
    <section id={SECTION_IDS.hero} className="portfolio-hero">
      <Container wide>
        <div className="hero-grid">
          <div className="hero-introduction">
            <div className="hero-identity">
              <Image src="/profile.jpg" alt={`${personal.name} portrait`} width={52} height={52} className="hero-avatar" />
              <div><p className="text-sm font-extrabold sm:text-base">{ui.hero.greeting}</p><p className="mt-1 text-xs text-muted sm:text-sm">{personal.location}</p></div>
            </div>
            <h1 className="hero-title">{ui.hero.headlineLines.map((line) => <span key={line} className="block">{line}</span>)}</h1>
            <p className="hero-description">{ui.hero.intro(personal.role)}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={`#${SECTION_IDS.projects}`}>{ui.hero.viewProjects}<span aria-hidden="true">↘</span></Button>
              <a href={personal.resumeUrl} download target="_blank" rel="noreferrer" className="hero-resume">{ui.hero.downloadResume}<span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero-availability" title={personal.employmentStatus}><span aria-hidden="true" /><p>{ui.hero.projectAvailability}</p></div>
          </div>
          <ProjectPlayground />
        </div>
        <div className="hero-footnote"><span>{ui.playground.builtWith}</span><a href={personal.githubUrl} target="_blank" rel="noopener noreferrer">{ui.hero.viewGithub}<span aria-hidden="true">↗</span></a></div>
      </Container>
    </section>
  );
}
