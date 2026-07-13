"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import ProjectGallery from "@/components/projects/ProjectGallery";
import { useContent } from "@/lib/i18n/useContent";
import { getProjectBySlug } from "@/lib/content";
import type { Project } from "@/lib/types";

interface ProjectDetailProps {
  slug: string;
}

function buildProjectImages(project: Project) {
  const images = project.images?.filter(Boolean) ?? [];
  if (images.length > 0) {
    return images;
  }

  return project.image ? [project.image] : [];
}

export default function ProjectDetail({ slug }: ProjectDetailProps) {
  const { locale, projects, ui } = useContent();
  const project = getProjectBySlug(locale, slug);

  if (!project) {
    notFound();
  }

  const images = buildProjectImages(project);
  const heroImage = images[0];
  const mobileShowcaseImages =
    project.imageLayout === "mobile" ? images.slice(1) : [];
  const relatedProjects = projects
    .filter((candidate) => candidate.slug !== project.slug)
    .slice(0, 2);

  return (
    <section className="pb-20 pt-24 sm:pb-28 sm:pt-28">
      <Container className="space-y-8 sm:space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted transition-colors duration-150 hover:text-accent-orange-ink">
            <span
              aria-hidden="true"
              className="inline-flex h-8 w-8 items-center justify-center border-3 border-navy bg-accent-yellow text-sm text-navy shadow-brutal-sm">
              ←
            </span>
            {ui.projectDetail.backToProjects}
          </Link>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} color={project.featured ? "yellow" : "teal"}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div
          className={`grid items-start gap-8 lg:gap-10 ${
            project.imageLayout === "mobile"
              ? "lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.72fr)]"
              : "lg:grid-cols-[minmax(0,1fr)_280px]"
          }`}>
          <div
            className={`space-y-6 ${
              project.imageLayout !== "mobile" ? "max-w-4xl" : ""
            }`}>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                {project.role ? (
                  <span className="inline-flex border-3 border-navy bg-accent-yellow px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-navy shadow-brutal-sm">
                    {project.role}
                  </span>
                ) : null}
                {project.period ? (
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    {project.period}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[0.92] tracking-tight text-navy sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.liveUrl ? (
                <Button
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  {ui.projectDetail.liveDemo}
                </Button>
              ) : null}
              {project.githubUrl ? (
                <Button
                  href={project.githubUrl}
                  variant="secondary"
                  target="_blank"
                  rel="noopener noreferrer">
                  {ui.projectDetail.sourceCode}
                </Button>
              ) : null}
              <Button href="/#contact" variant="outline">
                {ui.projectDetail.emailMe}
              </Button>
            </div>

            <Card
              hover={false}
              className={`p-5 sm:p-6 ${
                project.imageLayout !== "mobile" ? "max-w-4xl" : ""
              }`}>
              <div className="space-y-6">
                <div className="grid gap-3 border-b-3 border-navy/10 pb-6 md:grid-cols-[160px_minmax(0,1fr)] md:gap-6">
                  <div>
                    <div className="h-3 w-14 border-2 border-navy bg-accent-orange" />
                    <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      {ui.projectDetail.challenge}
                    </p>
                  </div>
                  <p className="max-w-[56ch] text-base leading-8 text-muted">
                    {project.challenge ?? project.description}
                  </p>
                </div>

                <div className="grid gap-3 border-b-3 border-navy/10 pb-6 md:grid-cols-[160px_minmax(0,1fr)] md:gap-6">
                  <div>
                    <div className="h-3 w-14 border-2 border-navy bg-accent-teal" />
                    <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      {ui.projectDetail.whatIOwned}
                    </p>
                  </div>
                  <p className="max-w-[56ch] text-base leading-8 text-muted">
                    {project.ownership ?? ui.projectDetail.whatIOwnedFallback}
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-[160px_minmax(0,1fr)] md:gap-6">
                  <div>
                    <div className="h-3 w-14 border-2 border-navy bg-accent-yellow" />
                    <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                      {ui.projectDetail.outcome}
                    </p>
                  </div>
                  <p className="max-w-[56ch] text-base leading-8 text-muted">
                    {project.outcome ?? ui.projectDetail.outcomeFallback}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {project.imageLayout === "mobile" ? (
            <div className="relative mx-auto w-full max-w-[320px] pb-8 sm:max-w-[360px] sm:pb-10 lg:justify-self-end">
              <div className="absolute -top-5 right-4 z-0 h-20 w-20 border-3 border-navy bg-accent-yellow shadow-brutal-sm sm:h-24 sm:w-24" />
              <div className="absolute -bottom-2 left-4 z-0 h-20 w-20 border-3 border-navy bg-accent-teal shadow-brutal-sm sm:h-24 sm:w-24" />

              {heroImage ? (
                <div className="relative z-10 mx-auto aspect-[9/19.5] max-w-[18rem] overflow-hidden border-3 border-navy bg-cream shadow-brutal-lg sm:max-w-[20rem]">
                  <Image
                    src={heroImage}
                    alt={ui.projectDetail.heroScreenshotAlt(project.title)}
                    fill
                    priority
                    sizes="(min-width: 1024px) 320px, 76vw"
                    className="object-cover object-top"
                  />
                </div>
              ) : (
                <Card
                  hover={false}
                  className="relative z-10 ml-auto p-5 sm:p-6">
                  <div className="h-3 w-14 border-2 border-navy bg-accent-orange" />
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    {ui.projectDetail.projectType}
                  </p>
                  <p className="mt-3 text-base font-semibold leading-relaxed text-navy">
                    {ui.projectDetail.mobileFirstBuild}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
                    {ui.projectDetail.mobileFirstDesc}
                  </p>
                </Card>
              )}
            </div>
          ) : (
            <div className="relative mx-auto hidden w-full max-w-[280px] pb-8 lg:block">
              <div className="absolute -top-4 right-4 z-0 h-20 w-20 border-3 border-navy bg-accent-yellow shadow-brutal-sm" />
              <div className="absolute -bottom-2 left-3 z-0 h-18 w-18 border-3 border-navy bg-accent-teal shadow-brutal-sm" />

              <Card
                hover={false}
                className="relative z-10 ml-auto space-y-5 p-5 sm:p-6">
                <div>
                  <div className="h-3 w-14 border-2 border-navy bg-accent-orange" />
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    {ui.projectDetail.projectType}
                  </p>
                  <p className="mt-3 text-base font-semibold leading-relaxed text-navy">
                    {ui.projectDetail.responsiveWeb}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    {ui.projectDetail.builtWith}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={`${project.slug}-hero-${tag}`} color="teal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="text-sm leading-7 text-muted">
                  {ui.projectDetail.desktopDesc}
                </p>
              </Card>
            </div>
          )}
        </div>

        {project.imageLayout !== "mobile" ? (
          <ProjectGallery
            images={images}
            layout={project.imageLayout}
            title={project.title}
          />
        ) : null}

        {project.imageLayout === "mobile" && mobileShowcaseImages.length ? (
          <div className="space-y-4 sm:space-y-5 no-scrollbar">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div className="max-w-2xl">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  {ui.projectDetail.appScreens}
                </p>
                <h2 className="mt-2 text-3xl font-black leading-[0.96] text-navy sm:text-4xl">
                  {ui.projectDetail.insideTheFlow}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted sm:text-base">
                  {ui.projectDetail.appScreensDesc}
                </p>
              </div>

              <div className="inline-flex border-3 border-navy bg-accent-yellow px-3 py-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-navy shadow-brutal-sm">
                {ui.projectDetail.moreScreens(mobileShowcaseImages.length)}
              </div>
            </div>

            <div className="relative left-1/2 w-screen -translate-x-1/2">
              <div className="overflow-x-auto overflow-y-hidden px-4 py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:px-8 lg:px-12">
                <div className="flex w-max items-start gap-4 py-6 sm:gap-5">
                  {mobileShowcaseImages.map((image, index) => (
                    <div
                      key={`${project.slug}-showcase-${index}`}
                      className={`shrink-0 ${
                        index % 4 === 1
                          ? "sm:translate-y-6"
                          : index % 4 === 2
                            ? "sm:-translate-y-2"
                            : index % 4 === 3
                              ? "sm:translate-y-3"
                              : ""
                      }`}>
                      <div className="w-[8.9rem] rounded-[1.65rem] border-3 border-navy bg-white p-1.5 shadow-brutal-sm sm:w-[9.8rem] lg:w-[10.5rem]">
                        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1rem] border-2 border-navy bg-white">
                          <Image
                            src={image}
                            alt={ui.projectDetail.appScreenAlt(
                              project.title,
                              index + 2,
                            )}
                            fill
                            sizes="(min-width: 1024px) 168px, (min-width: 640px) 157px, 142px"
                            className="object-cover object-top"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid items-start gap-6 lg:grid-cols-2">
          <Card hover={false} className="self-start">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent-orange-ink">
              {ui.projectDetail.highlights}
            </p>
            <ul className="mt-5 space-y-4">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-4 text-sm leading-7 text-muted sm:text-base">
                  <span className="mt-2 h-3 w-3 shrink-0 border-2 border-navy bg-accent-orange" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </Card>

          {project.architecture ? (
            <Card hover={false} className="self-start">
              <div className="h-3 w-14 border-2 border-navy bg-accent-teal" />
              <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {ui.projectDetail.architecture}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
                {project.architecture}
              </p>
            </Card>
          ) : null}
        </div>

        {project.lessons?.length ? (
          <Card hover={false}>
            <div className="h-3 w-14 border-2 border-navy bg-accent-yellow" />
            <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {ui.projectDetail.lessonsLearned}
            </p>
            <ul className="mt-4 grid gap-4 lg:grid-cols-3">
              {project.lessons.map((lesson) => (
                <li
                  key={lesson}
                  className="flex gap-3 text-sm leading-7 text-muted sm:text-base">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 border-2 border-navy bg-accent-yellow" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </Card>
        ) : null}

        {project.process?.length ? (
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-3 w-14 border-2 border-navy bg-accent-orange" />
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {ui.projectDetail.process}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {project.process.map((step, index) => (
                <Card key={`${project.slug}-process-${index}`} hover={false}>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    {ui.projectDetail.step(index + 1)}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
                    {step}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        ) : null}

        {relatedProjects.length ? (
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-3 w-14 border-2 border-navy bg-accent-teal" />
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {ui.projectDetail.moreProjects}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.slug}
                  href={`/projects/${relatedProject.slug}`}
                  className="block h-full"
                  aria-label={ui.common.viewCaseStudyFor(relatedProject.title)}>
                  <Card className="group h-full overflow-hidden p-0">
                    <div className="space-y-5 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                          {relatedProject.role}
                          {relatedProject.period
                            ? ` | ${relatedProject.period}`
                            : ""}
                        </p>
                        <div className="h-3 w-14 border-2 border-navy bg-accent-yellow" />
                      </div>
                      <h2 className="text-2xl font-black text-navy">
                        {relatedProject.title}
                      </h2>
                      <p className="text-sm leading-7 text-muted sm:text-base">
                        {relatedProject.description}
                      </p>
                      <div className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm font-semibold text-accent-orange-ink transition-all duration-200 group-hover:translate-x-1 group-hover:border-current">
                        {ui.projects.viewCaseStudy}
                        <span aria-hidden="true">-&gt;</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
