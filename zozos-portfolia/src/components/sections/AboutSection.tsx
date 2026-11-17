"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useContent } from "@/lib/i18n/useContent";
import { SECTION_IDS } from "@/lib/constants";

export default function AboutSection() {
  const { personal, ui } = useContent();
  const details = [
    { title: ui.about.basedIn, value: personal.location },
    { title: ui.about.currentCompany, value: personal.employer },
    { title: ui.about.bestFit, value: personal.focus },
  ];

  return (
    <section id={SECTION_IDS.about} className="portfolio-section about-section">
      <Container wide>
        <SectionHeading>{ui.about.heading}</SectionHeading>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <p className="about-copy">{personal.about}</p>
          <ul className="about-points">{personal.aboutHighlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
        </div>
        <dl className="about-details">{details.map((detail) => <div key={detail.title}><dt>{detail.title}</dt><dd>{detail.value}</dd></div>)}</dl>
      </Container>
    </section>
  );
}
