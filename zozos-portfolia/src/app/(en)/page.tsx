import { getHomeMetadata } from "@/lib/seo";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";

export const metadata = getHomeMetadata("en");

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
