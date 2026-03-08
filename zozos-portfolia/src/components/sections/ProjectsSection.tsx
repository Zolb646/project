import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { PROJECTS } from "@/lib/data";
import { SECTION_IDS } from "@/lib/constants";

const linkClassName =
  "inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-accent-violet";

function ProjectLinks({
  liveUrl,
  githubUrl,
}: {
  liveUrl?: string;
  githubUrl?: string;
}) {
  return (
    <div className="flex flex-wrap gap-4">
      {liveUrl ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClassName} text-accent-orange`}>
          Live Demo
          <span aria-hidden="true">-&gt;</span>
        </a>
      ) : null}
      {githubUrl ? (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkClassName} text-navy`}>
          Source Code
          <span aria-hidden="true">-&gt;</span>
        </a>
      ) : null}
    </div>
  );
}

function ProjectImage({ image, title }: { image?: string; title: string }) {
  if (!image) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(255,107,53,0.24),rgba(78,205,196,0.24))] p-6">
        <span className="text-center text-2xl font-black uppercase tracking-[0.2em] text-navy/60">
          {title}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={image}
      alt={`${title} screenshot`}
      fill
      sizes="(min-width: 1280px) 520px, (min-width: 768px) 50vw, 100vw"
      className="object-cover object-top"
    />
  );
}

export default function ProjectsSection() {
  const featuredProjects = PROJECTS.filter((project) => project.featured);
  const otherProjects = PROJECTS.filter((project) => !project.featured);

  return (
    <section id={SECTION_IDS.projects} className="py-20 sm:py-28">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            color="orange"
            eyebrow="Selected work"
            description="These are the projects that best show how I structure frontend work, handle product flows, and turn ideas into shipped interfaces.">
            Projects
          </SectionHeading>
        </AnimateOnScroll>

        <div className="grid gap-8 xl:grid-cols-2">
          {featuredProjects.map((project) => (
            <AnimateOnScroll key={project.title}>
              <Card className="group h-full overflow-hidden p-0">
                <div className="relative aspect-16/10 border-b-3 border-navy bg-navy/5">
                  <ProjectImage image={project.image} title={project.title} />
                  <div className="absolute left-5 top-5 inline-flex border-3 border-navy bg-accent-yellow px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-navy shadow-brutal-sm">
                    Featured
                  </div>
                </div>
                <div className="space-y-5 p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                        {project.role}{" "}
                        {project.period ? `| ${project.period}` : ""}
                      </p>
                      <h3 className="mt-2 text-2xl font-black text-navy">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-base leading-relaxed text-muted">
                    {project.description}
                  </p>

                  <ul className="space-y-3">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span className="mt-1.5 h-2.5 w-2.5 shrink-0 border-2 border-navy bg-accent-orange" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} color="yellow">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <ProjectLinks
                    liveUrl={project.liveUrl}
                    githubUrl={project.githubUrl}
                  />
                </div>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>

        {otherProjects.length > 0 ? (
          <div className="mt-12">
            <AnimateOnScroll>
              <div className="mb-6 flex items-center gap-4">
                <span className="h-3 w-14 border-2 border-navy bg-accent-teal" />
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  More Projects
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid gap-6 lg:grid-cols-2">
              {otherProjects.map((project) => (
                <AnimateOnScroll key={project.title}>
                  <Card className="group flex h-full flex-col overflow-hidden p-0">
                    <div className="relative aspect-video border-b-3 border-navy bg-navy/5">
                      <ProjectImage
                        image={project.image}
                        title={project.title}
                      />
                    </div>
                    <div className="flex h-full flex-col space-y-4 p-6">
                      <div>
                        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                          {project.role}{" "}
                          {project.period ? `| ${project.period}` : ""}
                        </p>
                        <h3 className="mt-2 text-2xl font-black text-navy">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-sm leading-relaxed text-muted">
                        {project.description}
                      </p>

                      <ul className="space-y-2">
                        {project.highlights.slice(0, 2).map((highlight) => (
                          <li
                            key={highlight}
                            className="flex gap-3 text-sm leading-relaxed text-muted">
                            <span className="mt-1.5 h-2.5 w-2.5 shrink-0 border-2 border-navy bg-accent-teal" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.tags.map((tag) => (
                          <Badge key={tag} color="teal">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="pt-2">
                        <ProjectLinks
                          liveUrl={project.liveUrl}
                          githubUrl={project.githubUrl}
                        />
                      </div>
                    </div>
                  </Card>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
