import type { Metadata } from "next";
import { Inter, DM_Serif_Display, Cairo } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});

// Helper type for params
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params;

  const descriptions: Record<string, string> = {
    en: "Mohamed Toudghi is an SEO Specialist & Digital Marketing Consultant based in Morocco. Expert in Technical SEO, Analytics (GA4, GTM), Local SEO, and data-driven growth strategies for businesses worldwide.",
    fr: "Mohamed Toudghi est un spécialiste SEO et consultant en marketing digital basé au Maroc. Expert en SEO technique, Analytics (GA4, GTM), SEO local et stratégies de croissance basées sur les données.",
    ar: "محمد تودغي متخصص في تحسين محركات البحث ومستشار تسويق رقمي من المغرب. خبير في SEO التقني، التحليلات (GA4، GTM)، SEO المحلي، واستراتيجيات النمو المبنية على البيانات."
  };

  const titles: Record<string, string> = {
    en: "Mohamed Toudghi | SEO Specialist & Digital Marketing Consultant",
    fr: "Mohamed Toudghi | Spécialiste SEO & Consultant Marketing Digital",
    ar: "محمد تودغي | متخصص SEO ومستشار تسويق رقمي"
  };

  const baseUrl = 'https://www.mohamedtoudghi.com';
  const canonicalPath = locale === 'en' ? '' : `/${locale}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: titles[locale] || titles.en,
      template: "%s | Mohamed Toudghi"
    },
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
      languages: {
        'en': '/en',
        'fr': '/fr',
        'ar': '/ar',
      },
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${baseUrl}${canonicalPath}`,
      siteName: 'Mohamed Toudghi',
      locale: locale === 'ar' ? 'ar_MA' : locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // RTL Logic
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className={`${inter.variable} ${dmSerif.variable} ${cairo.variable} antialiased bg-slate-50 text-slate-900 flex flex-col min-h-screen`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SchemaMarkup />
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
