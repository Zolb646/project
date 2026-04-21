"use client";

import * as React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { PROJECTS } from "@/lib/data";
import { SECTION_IDS } from "@/lib/constants";
import type { Project } from "@/lib/types";

const linkClassName =
  "inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm font-semibold transition-all duration-200 hover:translate-x-1 hover:border-current";

function ProjectLinks({
  liveUrl,
  githubUrl,
  onNavigate,
}: {
  liveUrl?: string;
  githubUrl?: string;
  onNavigate?: () => void;
}) {
  const handleClick =
    (url: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      event.stopPropagation();
      onNavigate?.();
      window.open(url, "_blank", "noopener,noreferrer");
    };

  return (
    <div className="flex flex-wrap gap-4">
      {liveUrl ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick(liveUrl)}
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
          onClick={handleClick(githubUrl)}
          className={`${linkClassName} text-navy`}>
          Source Code
          <span aria-hidden="true">-&gt;</span>
        </a>
      ) : null}
    </div>
  );
}

function ProjectDialogImage({
  images,
  activeIndex,
  layout = "desktop",
  onSelectImage,
  title,
}: {
  images: string[];
  activeIndex: number;
  layout?: "desktop" | "mobile";
  onSelectImage: (index: number) => void;
  title: string;
}) {
  const image = images[activeIndex];
  const isMobileLayout = layout === "mobile";

  if (!image) {
    return (
      <div className="flex min-h-[260px] items-center justify-center bg-[linear-gradient(135deg,rgba(255,107,53,0.18),rgba(78,205,196,0.18))] p-8">
        <span className="text-center text-2xl font-black uppercase tracking-[0.2em] text-navy/60">
          {title}
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-[radial-gradient(circle_at_top,rgba(78,205,196,0.18),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.18))] p-4 sm:p-6">
      <div
        className={`relative mx-auto overflow-hidden border-2 border-navy/80 bg-white shadow-[8px_8px_0_0_rgba(22,34,57,0.16)] ${
          isMobileLayout ? "w-full max-w-[320px] rounded-[2rem]" : "w-full max-w-[720px]"
        }`}>
        <div className="flex items-center justify-between gap-3 border-b border-navy/15 bg-cream px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border border-navy/20 bg-accent-orange/80" />
            <span className="h-3 w-3 rounded-full border border-navy/20 bg-accent-yellow/80" />
            <span className="h-3 w-3 rounded-full border border-navy/20 bg-accent-teal/80" />
          </div>
          {images.length > 1 ? (
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
              Shot {activeIndex + 1} / {images.length}
            </p>
          ) : null}
        </div>
        <div
          className={`relative bg-white ${
            isMobileLayout ? "aspect-[9/19.5]" : "aspect-video"
          }`}>
          <Image
            src={image}
            alt={`${title} screenshot ${activeIndex + 1}`}
            fill
            sizes={
              isMobileLayout
                ? "(min-width: 1024px) 320px, 80vw"
                : "(min-width: 1280px) 700px, (min-width: 1024px) 58vw, 100vw"
            }
            className="object-contain object-center"
          />

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() =>
                  onSelectImage(
                    activeIndex === 0 ? images.length - 1 : activeIndex - 1,
                  )
                }
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border-2 border-navy bg-cream/95 text-xl text-navy shadow-brutal-sm transition-transform duration-150 hover:translate-y-[calc(-50%+2px)]"
                aria-label={`Show previous ${title} screenshot`}>
                <FiChevronLeft />
              </button>
              <button
                type="button"
                onClick={() =>
                  onSelectImage(
                    activeIndex === images.length - 1 ? 0 : activeIndex + 1,
                  )
                }
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border-2 border-navy bg-cream/95 text-xl text-navy shadow-brutal-sm transition-transform duration-150 hover:translate-y-[calc(-50%+2px)]"
                aria-label={`Show next ${title} screenshot`}>
                <FiChevronRight />
              </button>
            </>
          ) : null}
        </div>
      </div>

      {images.length > 1 ? (
        <div className="mx-auto max-w-[720px] overflow-x-auto pb-2">
          <div className="flex w-max gap-3 pr-2">
          {images.map((galleryImage, index) => (
            <button
              key={`${title}-thumb-${index}`}
              type="button"
              onClick={() => onSelectImage(index)}
              className={`relative shrink-0 overflow-hidden border-2 bg-white text-left transition-all duration-150 ${
                index === activeIndex
                  ? "border-navy shadow-brutal-sm"
                  : "border-navy/30 hover:border-navy/70"
              }`}
              aria-label={`Show screenshot ${index + 1} for ${title}`}>
              <div
                className={`relative bg-white ${
                  isMobileLayout ? "h-36 w-20" : "h-24 w-40"
                }`}>
                <Image
                  src={galleryImage}
                  alt=""
                  fill
                  sizes={
                    isMobileLayout
                      ? "(min-width: 768px) 80px, 80px"
                      : "(min-width: 768px) 160px, 160px"
                  }
                  className="object-cover object-top"
                />
              </div>
            </button>
          ))}
        </div>
        </div>
      ) : null}
    </div>
  );
}

function ProjectDetail({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div className="border-t border-navy/15 pt-4">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
        {value}
      </p>
    </div>
  );
}

function ProjectPreview({
  project,
  featured = false,
}: {
  project: Project;
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
                  Featured
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
          <ProjectLinks
            liveUrl={project.liveUrl}
            githubUrl={project.githubUrl}
            onNavigate={() => undefined}
          />
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

        <ProjectLinks
          liveUrl={project.liveUrl}
          githubUrl={project.githubUrl}
          onNavigate={() => undefined}
        />
      </div>
    </Card>
  );
}

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = React.useState<Project | null>(
    null,
  );
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const featuredProjects = PROJECTS.filter((project) => project.featured);
  const otherProjects = PROJECTS.filter((project) => !project.featured);
  const activeProjectImages = React.useMemo(() => {
    if (!activeProject) return [];

    const images = activeProject.images?.filter(Boolean) ?? [];
    if (images.length > 0) {
      return images;
    }

    return activeProject.image ? [activeProject.image] : [];
  }, [activeProject]);

  React.useEffect(() => {
    setActiveImageIndex(0);
  }, [activeProject]);

  React.useEffect(() => {
    if (activeImageIndex >= activeProjectImages.length) {
      setActiveImageIndex(0);
    }
  }, [activeImageIndex, activeProjectImages.length]);

  return (
    <section id={SECTION_IDS.projects} className="py-20 sm:py-28">
      <Container>
        <Dialog
          open={Boolean(activeProject)}
          onOpenChange={(open) => {
            if (!open) {
              setActiveProject(null);
            }
          }}>
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
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="block h-full w-full text-left"
                    onClick={() => setActiveProject(project)}
                    aria-label={`Open details for ${project.title}`}>
                    <ProjectPreview project={project} featured />
                  </button>
                </DialogTrigger>
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
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="block h-full w-full text-left"
                        onClick={() => setActiveProject(project)}
                        aria-label={`Open details for ${project.title}`}>
                        <ProjectPreview project={project} />
                      </button>
                    </DialogTrigger>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          ) : null}

          {activeProject ? (
            <DialogContent className="max-w-5xl overflow-hidden border-2 border-navy/80 bg-[#f8f1e5] p-0 shadow-[10px_10px_0_0_rgba(22,34,57,0.9)]">
              <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(255,255,255,0.08))] px-5 py-5 sm:px-7 sm:py-7">
                <DialogHeader className="mb-0 pr-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex border-2 border-navy bg-accent-yellow px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-navy">
                      {activeProject.role}
                    </span>
                    {activeProject.period ? (
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
                        {activeProject.period}
                      </span>
                    ) : null}
                  </div>
                  <DialogTitle className="text-3xl font-black leading-[0.95]">
                    {activeProject.title}
                  </DialogTitle>
                  <DialogDescription className="max-w-full leading-relaxed">
                    {activeProject.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-5 space-y-5">
                  <div className="border-b border-navy/15 pb-5 lg:float-left lg:mb-6 lg:mr-8 lg:w-[58%] lg:border-b-0 lg:pb-0">
                    <ProjectDialogImage
                      images={activeProjectImages}
                      activeIndex={activeImageIndex}
                      layout={activeProject.imageLayout}
                      onSelectImage={setActiveImageIndex}
                      title={activeProject.title}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {activeProject.tags.map((tag) => (
                      <Badge
                        key={tag}
                        color={activeProject.featured ? "yellow" : "teal"}>
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      Project links
                    </p>
                    <ProjectLinks
                      liveUrl={activeProject.liveUrl}
                      githubUrl={activeProject.githubUrl}
                      onNavigate={() => setActiveProject(null)}
                    />
                  </div>

                  <ProjectDetail
                    label="Challenge"
                    value={activeProject.challenge}
                  />
                  <ProjectDetail
                    label="What I owned"
                    value={activeProject.ownership}
                  />
                  <ProjectDetail
                    label="Outcome"
                    value={activeProject.outcome}
                  />

                  <div className="border-t border-navy/15 pt-4">
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      Highlights
                    </p>
                    <ul className="mt-3 space-y-3">
                      {activeProject.highlights.map((highlight, index) => (
                        <li
                          key={`${activeProject.title}-${index}`}
                          className="grid grid-cols-[18px_1fr] gap-3 text-sm leading-relaxed text-muted sm:text-base">
                          <span className="mt-1.5 h-2.5 w-2.5 border-2 border-navy bg-accent-orange" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="clear-both" />
              </div>
            </DialogContent>
          ) : null}
        </Dialog>
      </Container>
    </section>
  );
}
