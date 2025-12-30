import AboutPreview from "@/components/sections/AboutPreview";
import FinalCTA from "@/components/sections/FinalCTA";
import CaseStudyPreview from "@/components/sections/CaseStudyPreview";
import Hero from "@/components/sections/Hero";
import ServicesSnapshot from "@/components/sections/ServicesSnapshot";
import TrustStrip from "@/components/sections/TrustStrip";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const descriptions: Record<string, string> = {
    en: "Mohamed Toudghi is an SEO Specialist & Digital Marketing Consultant helping businesses improve organic visibility through Technical SEO, Analytics, and data-driven strategies. Serving clients worldwide.",
    fr: "Mohamed Toudghi est un spécialiste SEO et consultant en marketing digital aidant les entreprises à améliorer leur visibilité organique grâce au SEO technique, à l'Analytics et aux stratégies basées sur les données.",
    ar: "محمد تودغي متخصص في تحسين محركات البحث ومستشار تسويق رقمي يساعد الشركات على تحسين ظهورها العضوي من خلال SEO التقني والتحليلات والاستراتيجيات المبنية على البيانات."
  };

  const titles: Record<string, string> = {
    en: "Mohamed Toudghi | SEO Specialist & Digital Marketing Consultant",
    fr: "Mohamed Toudghi | Spécialiste SEO & Consultant Marketing Digital",
    ar: "محمد تودغي | متخصص SEO ومستشار تسويق رقمي"
  };

  const baseUrl = 'https://www.mohamedtoudghi.com';
  const canonicalPath = locale === 'en' ? '' : `/${locale}`;

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${baseUrl}${canonicalPath}`,
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
      <ServicesSnapshot />
      <CaseStudyPreview />
      <AboutPreview />
      <FinalCTA />
    </>
  );
}

