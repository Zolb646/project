import { PROJECTS } from "./data";

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getAllProjectSlugs() {
  return PROJECTS.map((project) => project.slug);
}
