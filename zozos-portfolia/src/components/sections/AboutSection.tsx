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
    <section id={SECTION_IDS.about} className="border-y-3 border-navy bg-accent-teal/25 py-16 sm:py-24">
      <Container>
        <SectionHeading color="teal" eyebrow={ui.about.eyebrow} description={ui.about.description}>{ui.about.heading}</SectionHeading>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <p className="max-w-[56ch] text-lg font-medium leading-[1.9] sm:text-xl">{personal.about}</p>
            <dl className="mt-8 border-t-2 border-navy">
              {details.map((detail) => (
                <div key={detail.title} className="grid gap-2 border-b-2 border-navy py-4 sm:grid-cols-[110px_1fr] sm:gap-5">
                  <dt className="text-sm font-bold text-muted">{detail.title}</dt>
                  <dd className="text-sm font-bold leading-relaxed">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="self-start border-3 border-navy bg-white p-6 shadow-brutal sm:p-8">
            <h3 className="font-display text-2xl font-extrabold">{ui.about.whatIBring}</h3>
            <ul className="mt-5 space-y-6">
              {personal.aboutHighlights.map((highlight) => (
                <li key={highlight} className="flex gap-4 text-sm leading-[1.8] text-muted sm:text-base">
                  <span aria-hidden="true" className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border-2 border-navy bg-accent-yellow text-sm font-bold text-navy">↗</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
