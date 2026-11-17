import type { Metadata } from "next";
import ReleaseDesk from "@/components/release-desk/ReleaseDesk";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Release Desk | Zozo",
  description: "Bring pull requests, CI checks, QA, and sign-offs into one release. Try the interactive demo or import a public GitHub repository.",
  alternates: { canonical: `${SITE_URL}/release-desk` },
};

export default function ReleaseDeskPage() {
  return <ReleaseDesk />;
}
