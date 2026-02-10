import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { PERSONAL } from "@/lib/data";
import { SECTION_IDS } from "@/lib/constants";

export default function AboutSection() {
  return (
    <section id={SECTION_IDS.about} className="py-20 sm:py-28">
      <Container>
        <AnimateOnScroll>
          <SectionHeading color="teal">About Me</SectionHeading>
        </AnimateOnScroll>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <AnimateOnScroll>
            <p className="text-muted text-lg leading-relaxed">
              {PERSONAL.about}
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <Card hover={false}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-accent-orange" />
                  <span className="font-mono text-sm text-muted">
                    Based in Mongolia
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-accent-teal" />
                  <span className="font-mono text-sm text-muted">
                    Open to opportunities
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-accent-yellow" />
                  <span className="font-mono text-sm text-muted">
                    Loves clean code & good UX
                  </span>
                </div>
              </div>
            </Card>
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
}
