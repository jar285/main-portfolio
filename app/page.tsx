import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionSkeleton } from "@/components/ui/section-skeleton";
import { SectionReveal } from "@/components/ui/section-reveal";

const SkillsSection = dynamic(
  () =>
    import("@/components/sections/skills-section").then(
      (mod) => mod.SkillsSection
    ),
  { loading: () => <SectionSkeleton /> }
);
const ProjectsSection = dynamic(
  () =>
    import("@/components/sections/projects-section").then(
      (mod) => mod.ProjectsSection
    ),
  { loading: () => <SectionSkeleton /> }
);
const AboutSection = dynamic(
  () =>
    import("@/components/sections/about-section").then(
      (mod) => mod.AboutSection
    ),
  { loading: () => <SectionSkeleton /> }
);
const FooterSection = dynamic(
  () =>
    import("@/components/sections/footer-section").then(
      (mod) => mod.FooterSection
    ),
  { loading: () => <SectionSkeleton /> }
);

export default function Home() {
  return (
    <>
      <HeroSection />
      <SectionReveal>
        <SkillsSection />
      </SectionReveal>
      <SectionReveal>
        <ProjectsSection />
      </SectionReveal>
      <SectionReveal>
        <AboutSection />
      </SectionReveal>
      <SectionReveal>
        <FooterSection />
      </SectionReveal>
    </>
  );
}
