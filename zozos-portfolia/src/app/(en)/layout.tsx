import SiteLayout from "@/components/layout/SiteLayout";
import { getHomeMetadata } from "@/lib/seo";

export const metadata = getHomeMetadata("en");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="en">{children}</SiteLayout>;
}
