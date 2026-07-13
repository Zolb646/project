"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { useContent } from "@/lib/i18n/useContent";
import { SECTION_IDS } from "@/lib/constants";

export default function AboutSection() {
  const { personal: PERSONAL, ui } = useContent();

  const detailCards = [
    {
      title: ui.about.basedIn,
      value: PERSONAL.location,
      tone: "bg-accent-orange",
    },
    {
      title: ui.about.targeting,
      value: ui.about.targetingValue,
      tone: "bg-accent-teal",
    },
    {
      title: ui.about.bestFit,
      value: PERSONAL.focus,
      tone: "bg-accent-yellow",
    },
  ];

  return (
    <section id={SECTION_IDS.about} className="py-20 sm:py-28">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            color="teal"
            eyebrow={ui.about.eyebrow}
            description={ui.about.description}
          >
            {ui.about.heading}
          </SectionHeading>
        </AnimateOnScroll>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <AnimateOnScroll>
            <Card hover={false} className="h-full">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-orange-ink">
                {ui.about.whatIBring}
              </p>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                {PERSONAL.about}
              </p>
            </Card>
          </AnimateOnScroll>

          <div className="grid gap-4">
            {PERSONAL.aboutHighlights.map((highlight, index) => (
              <AnimateOnScroll key={highlight}>
                <Card hover={false} className="h-full">
                  <div className="flex gap-4">
                    <div
                      className={`mt-1 h-3 w-3 shrink-0 border-2 border-navy ${
                        index === 0
                          ? "bg-accent-orange"
                          : index === 1
                            ? "bg-accent-teal"
                            : "bg-accent-yellow"
                      }`}
                    />
                    <p className="leading-relaxed text-muted">{highlight}</p>
                  </div>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {detailCards.map((card) => (
            <AnimateOnScroll key={card.title}>
              <Card hover={false} className="h-full">
                <div className={`h-3 w-14 border-2 border-navy ${card.tone}`} />
                <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  {card.title}
                </p>
                <p className="mt-2 text-base font-semibold leading-relaxed text-navy">
                  {card.value}
                </p>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
