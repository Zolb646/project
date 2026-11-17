"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useContent } from "@/lib/i18n/useContent";
import { SECTION_IDS } from "@/lib/constants";

export default function HeroSection() {
  const { personal, ui } = useContent();

  return (
    <section id={SECTION_IDS.hero} className="portfolio-hero">
      <Container wide>
        <div className="hero-topline">
          <p>{ui.hero.greeting}</p>
          <p className="hero-availability" title={personal.employmentStatus}><span aria-hidden="true" />{ui.hero.projectAvailability}</p>
        </div>
        <div className="hero-main">
          <div>
            <h1 className="hero-title"><span>Zolbayar</span><span>Byambajav.</span></h1>
            <p className="hero-description">{ui.hero.intro(personal.role)}</p>
            <div className="hero-actions">
              <Button href={`#${SECTION_IDS.projects}`}>{ui.hero.viewProjects}<span aria-hidden="true">↘</span></Button>
              <a href={personal.resumeUrl} download target="_blank" rel="noreferrer" className="text-link">{ui.hero.downloadResume}<span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <figure className="hero-portrait">
            <div className="hero-photo"><Image src="/profile.jpg" alt={`${personal.name} portrait`} fill preload sizes="(min-width: 1024px) 280px, (min-width: 640px) 240px, 160px" className="object-cover" /></div>
            <figcaption><span>{personal.location}</span><a href={personal.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={ui.hero.viewGithub}>GitHub <span aria-hidden="true">↗</span></a></figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
