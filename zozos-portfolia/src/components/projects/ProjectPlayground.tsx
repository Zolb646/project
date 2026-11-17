"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useContent } from "@/lib/i18n/useContent";

export default function ProjectPlayground() {
  const { projects, ui, localizePath } = useContent();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const project = projects[selectedIndex];

  if (!project) return null;

  const image = project.image ?? project.images?.[0];

  return (
    <div className="project-playground" data-project-preview>
      <div className="playground-note">
        <span className="playground-spark" aria-hidden="true">✳</span>
        <span>{ui.playground.invitation}</span>
        <svg aria-hidden="true" viewBox="0 0 62 36" fill="none"><path d="M2 3c28-3 42 4 46 25m-12-7 13 10 9-15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <div className="playground-window">
        <div className="playground-toolbar">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="window-dot bg-accent-orange" /><span className="window-dot bg-accent-yellow" /><span className="window-dot bg-accent-teal" />
          </div>
          <span className="playground-address">zozo / {project.slug}</span>
          <span aria-hidden="true" className="text-sm">↗</span>
        </div>
        <Link href={localizePath(`/projects/${project.slug}`)} aria-label={ui.common.viewCaseStudyFor(project.title)} className="playground-screen">
          <div className="playground-visual" key={project.slug}>
            {image ? <Image src={image} alt={project.title} fill preload={selectedIndex === 0} sizes="(min-width: 1280px) 600px, (min-width: 1024px) 46vw, 90vw" className="object-cover object-top" /> : null}
            <span className="playground-open"><span>{ui.projects.viewCaseStudy}</span><span aria-hidden="true">↗</span></span>
          </div>
        </Link>
        <div className="playground-caption">
          <div aria-live="polite" aria-atomic="true">
            <p className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">{project.title}</p>
            <p className="mt-1 text-xs text-muted sm:text-sm">{project.tags.slice(0, 3).join(" / ")}</p>
          </div>
          <span className="font-mono text-xs text-muted" aria-hidden="true">{String(selectedIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
        </div>
      </div>
      <div className="playground-picker" role="group" aria-label={ui.playground.chooseProject}>
        {projects.map((item, index) => (
          <button key={item.slug} type="button" aria-pressed={selectedIndex === index} onClick={() => setSelectedIndex(index)} className="playground-choice" aria-label={ui.playground.previewProject(item.title)}>
            <span className="playground-choice-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span className="truncate">{item.title.replace(" Mobile App", "").replace(" Web", "")}</span>
            <span aria-hidden="true" className="playground-choice-dot" />
          </button>
        ))}
      </div>
      <p className="playground-hint"><span aria-hidden="true">↖</span> {ui.playground.hint}</p>
    </div>
  );
}
