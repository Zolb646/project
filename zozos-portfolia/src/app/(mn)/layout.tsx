import SiteLayout from "@/components/layout/SiteLayout";
import { getHomeMetadata } from "@/lib/seo";

export const metadata = getHomeMetadata("mn");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="mn">{children}</SiteLayout>;
}
