import AboutPreview from "@/components/sections/AboutPreview";
import FinalCTA from "@/components/sections/FinalCTA";
import CaseStudyPreview from "@/components/sections/CaseStudyPreview";
import Hero from "@/components/sections/Hero";
import ServicesSnapshot from "@/components/sections/ServicesSnapshot";
import TrustStrip from "@/components/sections/TrustStrip";

export default async function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesSnapshot />
      <CaseStudyPreview />
      <AboutPreview />
      <FinalCTA />
    </>
  );
}
