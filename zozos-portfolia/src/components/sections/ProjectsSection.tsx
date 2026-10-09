"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { useContent } from "@/lib/i18n/useContent";
import { SECTION_IDS } from "@/lib/constants";
import type { UIDictionary } from "@/lib/i18n/ui";
import type { Project } from "@/lib/types";

function ProjectPreview({ project, ui, lead = false }: { project: Project; ui: UIDictionary; lead?: boolean }) {
  const { localizePath } = useContent();
  const previewImage = project.image ?? project.images?.[0];
  const mobile = project.imageLayout === "mobile";

  return (
    <Link
      href={localizePath(`/projects/${project.slug}`)}
      aria-label={ui.common.viewCaseStudyFor(project.title)}
      className={`group grid h-full border-3 border-navy bg-white shadow-brutal transition-[transform,box-shadow] duration-150 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-brutal-sm ${lead ? "lg:grid-cols-[1.2fr_1fr]" : ""}`}>
      <div className={`flex min-w-0 items-center border-b-3 border-navy p-5 sm:p-7 ${lead ? "bg-cream lg:border-b-0 lg:border-r-3" : mobile ? "bg-accent-orange" : "bg-accent-teal"}`}>
        <div className="w-full overflow-hidden border-2 border-navy bg-white shadow-brutal-sm">
          <div className="flex h-7 items-center gap-1.5 border-b-2 border-navy px-2.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full border border-navy bg-accent-orange" />
            <span className="h-2 w-2 rounded-full border border-navy bg-accent-yellow" />
            <span className="h-2 w-2 rounded-full border border-navy bg-accent-teal" />
          </div>
          <div className="relative aspect-[16/9] overflow-hidden bg-cream">
            {previewImage ? <Image src={previewImage} alt={project.title} fill sizes={lead ? "(min-width: 1024px) 570px, 90vw" : "(min-width: 1024px) 520px, 90vw"} className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.025]" /> : null}
          </div>
        </div>
      </div>
      <div className={`flex flex-col p-6 sm:p-8 ${lead ? "lg:justify-center lg:p-10" : ""}`}>
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-muted">
          <span>{project.role}</span><span>{project.period}</span>
        </div>
        <h3 className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-4xl">{project.title}</h3>
        <p className="mt-4 max-w-[50ch] text-sm leading-[1.8] text-muted sm:text-base">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => <Badge key={tag} color="yellow">{tag}</Badge>)}
        </div>
        <div className="mt-auto flex items-center justify-between gap-4 pt-7">
          <span className="text-sm font-extrabold underline decoration-2 underline-offset-4">{ui.projects.viewCaseStudy}</span>
          <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center border-2 border-navy bg-accent-yellow text-xl transition-colors group-hover:bg-navy group-hover:text-white">↗</span>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsSection() {
  const { projects, ui, localizePath } = useContent();
  const leadProject = projects.find((project) => project.featured) ?? projects[0];
  const remaining = projects.filter((project) => project.slug !== leadProject?.slug);
  const showcase = remaining.slice(0, 2);
  const more = remaining.slice(2);

  return (
    <section id={SECTION_IDS.projects} className="py-16 sm:py-24">
      <Container>
        <SectionHeading color="orange" eyebrow={ui.projects.eyebrow} description={ui.projects.description}>{ui.projects.heading}</SectionHeading>
        {leadProject ? <ProjectPreview project={leadProject} ui={ui} lead /> : null}
        <div className="mt-7 grid gap-7 lg:grid-cols-2">
          {showcase.map((project) => <ProjectPreview key={project.slug} project={project} ui={ui} />)}
        </div>
        {more.length > 0 ? (
          <div className="mt-10 border-t-3 border-navy">
            {more.map((project) => (
              <Link key={project.slug} href={localizePath(`/projects/${project.slug}`)} aria-label={ui.common.viewCaseStudyFor(project.title)} className="group grid items-center gap-4 border-b-3 border-navy py-6 sm:grid-cols-[1fr_1.6fr_auto] sm:gap-8">
                <div><p className="mb-2 text-xs font-bold text-muted">{project.role}</p><h3 className="font-display text-2xl font-extrabold tracking-tight group-hover:underline group-hover:underline-offset-4">{project.title}</h3></div>
                <p className="max-w-[60ch] text-sm leading-relaxed text-muted">{project.description}</p>
                <span className="flex items-center gap-3 text-sm font-extrabold">{ui.projects.viewCaseStudy}<span aria-hidden="true" className="text-2xl">↗</span></span>
              </Link>
            ))}
          </div>
        ) : null}
        <p className="mt-7 max-w-2xl text-sm leading-relaxed text-muted">{ui.projects.footerNote}</p>
      </Container>
    </section>
  );
}
