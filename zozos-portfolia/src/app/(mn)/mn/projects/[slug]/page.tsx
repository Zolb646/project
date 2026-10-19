import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/projects/ProjectDetail";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/content";
import { getProjectMetadata } from "@/lib/seo";
import StructuredData from "@/components/StructuredData";
import { getProjectStructuredData } from "@/lib/structured-data";

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
  const project = getProjectBySlug("mn", slug);

  if (!project) {
    return {};
  }

  return getProjectMetadata("mn", project);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug("mn", slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <StructuredData data={getProjectStructuredData("mn", project)} />
      <ProjectDetail slug={slug} />
    </>
  );
}
