import { NextRequest, NextResponse } from "next/server";
import { getAllProjectSlugs } from "@/lib/content";

const projectSlugs = new Set(getAllProjectSlugs());

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // Public project screenshots share this prefix with case-study routes.
  if (pathname.startsWith("/projects/") && /\.[^/]+$/.test(pathname)) {
    return NextResponse.next();
  }
  const isMongolian = pathname === "/mn" || pathname.startsWith("/mn/");
  const path = isMongolian ? pathname.slice(3) || "/" : pathname;
  const project = /^\/projects\/([^/]+)$/.exec(path);

  if (path === "/" || (project && projectSlugs.has(project[1]))) {
    return NextResponse.next();
  }

  // Next 16's dynamic notFound() fallback can send an empty HTML shell.
  // Render a static localized page while preserving both the URL and 404 status.
  const destination = request.nextUrl.clone();
  destination.pathname = isMongolian ? "/mn/404" : "/404";
  return NextResponse.rewrite(destination, { status: 404 });
}

export const config = {
  matcher: ["/404", "/projects/:path*", "/mn/:path*"],
};
