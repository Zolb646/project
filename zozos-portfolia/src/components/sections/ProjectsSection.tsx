"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useContent } from "@/lib/i18n/useContent";
import { SECTION_IDS } from "@/lib/constants";

export default function ProjectsSection() {
  const { projects, ui, localizePath } = useContent();
  const [filter, setFilter] = useState<"all" | "web" | "mobile">("all");
  const filtered = projects.filter((project) => filter === "all" || (filter === "mobile" ? project.imageLayout === "mobile" : project.imageLayout !== "mobile"));

  return (
    <section id={SECTION_IDS.projects} className="portfolio-section work-section">
      <Container wide>
        <SectionHeading description={ui.projects.description}>{ui.projects.heading}</SectionHeading>
        <div className="project-filter-bar">
          <div className="project-filters" role="group" aria-label={ui.projects.filterLabel}>
            {(["all", "web", "mobile"] as const).map((category) => (
              <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>{ui.projects.filters[category]}</button>
            ))}
          </div>
          <p aria-live="polite" aria-atomic="true">{ui.projects.resultCount(filtered.length)}</p>
        </div>
        <div key={filter} className="project-results">
          {filtered.map((project) => {
            const image = project.image ?? project.images?.[0];
            return (
              <Link key={project.slug} href={localizePath(`/projects/${project.slug}`)} aria-label={ui.common.viewCaseStudyFor(project.title)} className={`work-item work-item--${project.slug}`}>
                <div className="work-image">
                  {image ? <Image src={image} alt={project.title} fill sizes="(min-width: 1280px) 550px, (min-width: 768px) 44vw, 90vw" className="object-cover object-top" /> : null}
                  <span className="work-open" aria-hidden="true">↗</span>
                </div>
                <div className="work-caption"><h3>{project.title}</h3><span>{project.period}</span></div>
                <p className="work-description">{project.description}</p>
                <p className="work-stack">{project.tags.slice(0, 3).join(" / ")}</p>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
