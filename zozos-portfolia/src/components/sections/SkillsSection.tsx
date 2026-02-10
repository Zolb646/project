import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { SKILLS } from "@/lib/data";
import { SECTION_IDS } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  frontend: (
    <svg
      className="w-8 h-8 text-accent-orange"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  backend: (
    <svg
      className="w-8 h-8 text-accent-teal"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
      />
    </svg>
  ),
  tools: (
    <svg
      className="w-8 h-8 text-accent-violet"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
};

const badgeColors: Record<string, "yellow" | "teal" | "orange" | "violet"> = {
  frontend: "orange",
  backend: "teal",
  tools: "violet",
};

export default function SkillsSection() {
  return (
    <section id={SECTION_IDS.skills} className="py-20 sm:py-28">
      <Container>
        <AnimateOnScroll>
          <SectionHeading color="yellow">Skills</SectionHeading>
        </AnimateOnScroll>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((category) => (
            <AnimateOnScroll key={category.title}>
              <Card>
                <div className="mb-4">{iconMap[category.icon]}</div>
                <h3 className="text-xl font-bold text-navy mb-4">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} color={badgeColors[category.icon]}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
