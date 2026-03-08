import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { EXPERIENCES } from "@/lib/data";
import { SECTION_IDS } from "@/lib/constants";

export default function ExperienceSection() {
  return (
    <section id={SECTION_IDS.experience} className="py-20 sm:py-28">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            color="violet"
            eyebrow="Timeline"
            description="The path from graduation into bootcamp work and ongoing internship experience at Pinecone Academy."
          >
            Experience
          </SectionHeading>
        </AnimateOnScroll>

        <div className="relative">
          <div className="absolute left-[7px] top-3 bottom-3 w-1 bg-navy/25 sm:left-8" />

          <div className="space-y-8">
            {EXPERIENCES.map((exp) => (
              <AnimateOnScroll key={`${exp.company}-${exp.period}`}>
                <div className="relative pl-10 sm:pl-20">
                  <div className="absolute left-0 top-2 h-4 w-4 border-3 border-navy bg-accent-orange sm:left-6" />

                  <Card hover={false} className="h-full">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-orange">
                          {exp.period}
                        </p>
                        <h3 className="mt-2 text-2xl font-black text-navy">
                          {exp.role}
                        </h3>
                        <p className="mt-1 text-sm font-semibold uppercase tracking-[0.08em] text-muted">
                          {exp.company}
                        </p>
                      </div>
                      {exp.period.includes("Present") ? (
                        <span className="inline-flex border-3 border-navy bg-accent-yellow px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-navy shadow-brutal-sm">
                          Current
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-5 leading-relaxed text-muted">{exp.description}</p>

                    <ul className="mt-5 space-y-3">
                      {exp.highlights.map((highlight, index) => (
                        <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-muted">
                          <span
                            className={`mt-1.5 h-2.5 w-2.5 shrink-0 border-2 border-navy ${
                              index === 0
                                ? "bg-accent-teal"
                                : index === 1
                                  ? "bg-accent-yellow"
                                  : "bg-accent-violet"
                            }`}
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <Badge key={tag} color="teal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
