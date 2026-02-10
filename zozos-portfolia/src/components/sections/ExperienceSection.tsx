import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { EXPERIENCES } from "@/lib/data";
import { SECTION_IDS } from "@/lib/constants";

export default function ExperienceSection() {
  return (
    <section id={SECTION_IDS.experience} className="py-20 sm:py-28">
      <Container>
        <AnimateOnScroll>
          <SectionHeading color="violet">Experience</SectionHeading>
        </AnimateOnScroll>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 sm:left-8 top-0 bottom-0 w-1 bg-navy" />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <AnimateOnScroll key={index}>
                <div className="relative pl-8 sm:pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-0 sm:left-8 top-1 w-4 h-4 bg-accent-orange border-3 border-navy -translate-x-1.5" />

                  <div className="bg-cream border-3 border-navy shadow-brutal p-6">
                    <span className="font-mono text-sm text-accent-orange font-semibold">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-bold text-navy mt-1">
                      {exp.role}
                    </h3>
                    <p className="text-muted font-semibold mb-3">
                      {exp.company}
                    </p>
                    <p className="text-muted leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <Badge key={tag} color="teal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
