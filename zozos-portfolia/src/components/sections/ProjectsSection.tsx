"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { useContent } from "@/lib/i18n/useContent";
import { SECTION_IDS } from "@/lib/constants";
import type { UIDictionary } from "@/lib/i18n/ui";
import type { Project } from "@/lib/types";

function ProjectPreview({
  project,
  ui,
  featured = false,
}: {
  project: Project;
  ui: UIDictionary;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <Card className="group h-full overflow-hidden p-0">
        <div className="space-y-5 p-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="w-full">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  {project.role} {project.period ? `| ${project.period}` : ""}
                </p>
                <div className="inline-flex border-3 border-navy bg-accent-yellow px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-navy shadow-brutal-sm">
                  {ui.projects.featured}
                </div>
              </div>
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

          <div className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm font-semibold text-accent-orange-ink transition-all duration-200 group-hover:translate-x-1 group-hover:border-current">
            {ui.projects.viewCaseStudy}
            <span aria-hidden="true">-&gt;</span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group flex h-full flex-col overflow-hidden p-0 cursor-pointer">
      <div className="flex h-full flex-col space-y-4 p-3">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            {project.role} {project.period ? `| ${project.period}` : ""}
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

        <div className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm font-semibold text-accent-orange-ink transition-all duration-200 group-hover:translate-x-1 group-hover:border-current">
          {ui.projects.viewCaseStudy}
          <span aria-hidden="true">-&gt;</span>
        </div>
      </div>
    </Card>
  );
}

export default function ProjectsSection() {
  const { projects: PROJECTS, ui } = useContent();
  const featuredProjects = PROJECTS.filter((project) => project.featured);
  const otherProjects = PROJECTS.filter((project) => !project.featured);

  return (
    <section id={SECTION_IDS.projects} className="py-20 sm:py-28">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            color="orange"
            eyebrow={ui.projects.eyebrow}
            description={ui.projects.description}>
            {ui.projects.heading}
          </SectionHeading>
        </AnimateOnScroll>

        <div className="grid gap-8 xl:grid-cols-2">
          {featuredProjects.map((project) => (
            <AnimateOnScroll key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="block h-full"
                aria-label={ui.common.viewCaseStudyFor(project.title)}>
                <ProjectPreview project={project} ui={ui} featured />
              </Link>
            </AnimateOnScroll>
          ))}
        </div>

        {otherProjects.length > 0 ? (
          <div className="mt-12">
            <AnimateOnScroll>
              <div className="mb-6 flex items-center gap-4">
                <span className="h-3 w-14 border-2 border-navy bg-accent-teal" />
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  {ui.projects.moreProjects}
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid gap-6 lg:grid-cols-2">
              {otherProjects.map((project) => (
                <AnimateOnScroll key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block h-full"
                    aria-label={ui.common.viewCaseStudyFor(project.title)}>
                    <ProjectPreview project={project} ui={ui} />
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        ) : null}

        <AnimateOnScroll>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t-3 border-navy/15 pt-8">
            <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {ui.projects.footerNote}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm font-semibold text-accent-orange-ink transition-all duration-200 hover:translate-x-1 hover:border-current">
              {ui.projects.talkCta}
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
