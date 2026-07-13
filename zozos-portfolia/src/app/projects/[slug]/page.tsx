import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/projects/ProjectDetail";
import { CONTENT, getAllProjectSlugs, getProjectBySlug } from "@/lib/content";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug("en", slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | ${CONTENT.en.personal.name}`,
    description: project.description,
    openGraph: {
      title: `${project.title} | ${CONTENT.en.personal.name}`,
      description: project.description,
      type: "article",
      images: project.image ? [project.image] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug("en", slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail slug={slug} />;
}
