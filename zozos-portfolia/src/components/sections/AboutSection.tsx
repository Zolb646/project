import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { PERSONAL } from "@/lib/data";
import { SECTION_IDS } from "@/lib/constants";

const detailCards = [
  {
    title: "Based in",
    value: PERSONAL.location,
    tone: "bg-accent-orange",
  },
  {
    title: "Looking for",
    value: "Internship, junior, and full-stack software engineering roles",
    tone: "bg-accent-teal",
  },
  {
    title: "Strongest with",
    value: PERSONAL.focus,
    tone: "bg-accent-yellow",
  },
];

export default function AboutSection() {
  return (
    <section id={SECTION_IDS.about} className="py-20 sm:py-28">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            color="teal"
            eyebrow="Profile"
            description="A little more context on how I work, what I am learning, and the kind of software engineering role I am looking for."
          >
            About Me
          </SectionHeading>
        </AnimateOnScroll>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <AnimateOnScroll>
            <Card hover={false} className="h-full">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-orange">
                Who I am
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
