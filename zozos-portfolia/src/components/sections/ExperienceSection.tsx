"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { useContent } from "@/lib/i18n/useContent";
import { SECTION_IDS } from "@/lib/constants";

export default function ExperienceSection() {
  const { experiences, ui } = useContent();

  return (
    <section id={SECTION_IDS.experience} className="py-16 sm:py-24">
      <Container>
        <SectionHeading color="orange" eyebrow={ui.experience.eyebrow} description={ui.experience.description}>{ui.experience.heading}</SectionHeading>
        <div className="border-t-3 border-navy">
          {experiences.map((experience) => (
            <article key={`${experience.company}-${experience.period}`} className="grid gap-5 border-b-3 border-navy py-7 sm:py-9 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
              <div>
                <p className="mb-3 text-xs font-bold text-muted">{experience.period}</p>
                <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{experience.company}</h3>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="text-sm font-bold">{experience.role}</span>
                  {experience.current ? <Badge color="yellow">{ui.experience.current}</Badge> : null}
                </div>
              </div>
              <div>
                <p className="max-w-[65ch] text-sm leading-[1.8] text-muted sm:text-base">{experience.description}</p>
                <ul className="mt-4 space-y-2.5">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-muted"><span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 bg-navy" /><span>{highlight}</span></li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
