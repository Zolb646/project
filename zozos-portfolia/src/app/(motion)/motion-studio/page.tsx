import type { Metadata } from "next";
import MotionStudio from "@/components/motion-studio/MotionStudio";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Motion Studio | Zozo",
  description: "Make a 2D animation with layers, a keyframe timeline, instant playback, and video export in your browser.",
  alternates: { canonical: `${SITE_URL}/motion-studio` },
};

export default function MotionStudioPage() {
  return <MotionStudio />;
}
