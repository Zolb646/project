"use client";

import Image from "next/image";
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
  const previewImage = project.image ?? project.images?.[0];

  return (
    <Card padded={false} className="group flex h-full flex-col overflow-hidden">
      {previewImage ? (
        <div className="relative aspect-[16/9] overflow-hidden border-b-3 border-navy bg-navy">
          <Image
            src={previewImage}
            alt={project.title}
            fill
            sizes="(min-width: 1280px) 560px, (min-width: 768px) 46vw, 94vw"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.025]"
          />
          {featured ? (
            <span className="absolute left-4 top-4 border-2 border-navy bg-accent-yellow px-3 py-1 text-xs font-bold text-navy shadow-brutal-sm">
              {ui.projects.featured}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs font-semibold text-muted">
          <span>{project.role}</span>
          {project.period ? <span>{project.period}</span> : null}
        </div>
        <h3 className="mt-3 text-2xl font-black leading-tight tracking-tight text-navy sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-muted sm:text-base">
          {project.description}
        </p>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} color={featured ? "yellow" : "teal"}>
                {tag}
              </Badge>
            ))}
          </div>
          <span className="mt-6 inline-flex items-center gap-2 border-b-2 border-current pb-1 text-sm font-semibold text-accent-orange-ink">
            {ui.projects.viewCaseStudy}
            <span aria-hidden="true">→</span>
          </span>
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

        <div className="grid gap-6 xl:grid-cols-2">
          {featuredProjects.map((project) => (
            <AnimateOnScroll key={project.slug} className="h-full">
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
            <h3 className="mb-6 text-lg font-bold text-navy">
              {ui.projects.moreProjects}
            </h3>
            <div className="grid gap-6 lg:grid-cols-2">
              {otherProjects.map((project) => (
                <AnimateOnScroll key={project.slug} className="h-full">
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

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t-3 border-navy/15 pt-8">
          <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {ui.projects.footerNote}
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 border-b-2 border-current pb-1 text-sm font-semibold text-accent-orange-ink">
            {ui.projects.talkCta}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
