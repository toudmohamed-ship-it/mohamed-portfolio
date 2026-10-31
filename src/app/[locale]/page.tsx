import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Results from "@/components/sections/Results";
import ServicesSnapshot from "@/components/sections/ServicesSnapshot";
import CaseStudyPreview from "@/components/sections/CaseStudyPreview";
import Process from "@/components/sections/Process";
import AboutPreview from "@/components/sections/AboutPreview";
import BlogPreview from "@/components/sections/BlogPreview";
import FinalCTA from "@/components/sections/FinalCTA";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { localizedUrl, pageAlternates } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

// The layout title template does not apply to the page in its own segment, so the name is written out here
const TITLES: Record<string, string> = {
  en: "SEO Consultant in Morocco | Mohamed Toudghi",
  fr: "Consultant SEO au Maroc | Mohamed Toudghi",
  ar: "مستشار SEO في المغرب | محمد تودغي",
};

const DESCRIPTIONS: Record<string, string> = {
  en: "Technical SEO, local SEO and GA4 tracking for law firms, clinics, B2B and SaaS. Based in Morocco, working in English, French and Arabic.",
  fr: "SEO technique, SEO local et suivi GA4 pour cabinets d'avocats, cliniques, B2B et SaaS. Basé au Maroc, je travaille en français, anglais et arabe.",
  ar: "SEO تقني وSEO محلي وتتبع GA4 لمكاتب المحاماة والعيادات وشركات B2B وSaaS. مقيم في المغرب وأعمل بالعربية والفرنسية والإنجليزية.",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title = TITLES[locale] || TITLES.en;
  const description = DESCRIPTIONS[locale] || DESCRIPTIONS.en;

  return {
    title: { absolute: title },
    description,
    alternates: pageAlternates(locale, ''),
    openGraph: {
      title,
      description,
      url: localizedUrl(locale, ''),
      images: ['/og-image.jpg'],
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustStrip />
      <Results />
      <ServicesSnapshot />
      <CaseStudyPreview />
      <Process />
      <AboutPreview />
      <BlogPreview />
      <FinalCTA />
    </>
  );
}
