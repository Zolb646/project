"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useContent } from "@/lib/i18n/useContent";
import { SECTION_IDS } from "@/lib/constants";

export default function SkillsSection() {
  const { skills, ui } = useContent();

  return (
    <section id={SECTION_IDS.skills} className="portfolio-section skills-section">
      <Container wide>
        <SectionHeading>{ui.skills.heading}</SectionHeading>
        <div className="skill-list">{skills.map((category) => (
          <div key={category.title} className="skill-item">
            <h3>{category.title}</h3>
            <p>{category.description}</p>
            <ul className="skill-tools">{category.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </div>
        ))}</div>
      </Container>
    </section>
  );
}
