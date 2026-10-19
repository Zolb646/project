import { getNotFoundMetadata } from "@/lib/seo";
import NotFoundScreen from "@/components/NotFoundScreen";

export const metadata = getNotFoundMetadata("en");

export default function NotFoundPage() {
  return <NotFoundScreen locale="en" />;
}
