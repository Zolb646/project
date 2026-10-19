import { getNotFoundMetadata } from "@/lib/seo";
import SiteLayout from "@/components/layout/SiteLayout";
import NotFoundScreen from "@/components/NotFoundScreen";

export const metadata = getNotFoundMetadata("en");

export default function GlobalNotFound() {
  return <SiteLayout locale="en"><NotFoundScreen locale="en" /></SiteLayout>;
}
