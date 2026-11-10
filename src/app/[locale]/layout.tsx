import type { Metadata } from "next";
import Analytics from "@/components/seo/Analytics";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { IS_INDEXABLE } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import CursorFollower from "@/components/ui/CursorFollower";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  // Small labels only: "optional" never swaps after first paint, so it cannot shift the layout (it caused CLS 0.21 on articles)
  display: "optional",
  preload: false,
});

// Helper type for params
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params;

  const descriptions: Record<string, string> = {
    en: "SEO and growth specialist in Morocco. Technical SEO, local SEO, conversion and GA4 tracking for service businesses, B2B and SaaS.",
    fr: "Spécialiste SEO et croissance au Maroc. SEO technique, SEO local, conversion et suivi GA4 pour les entreprises de services, B2B et SaaS.",
    ar: "أخصائي SEO والنمو في المغرب. SEO تقني وSEO محلي وتحسين التحويل وتتبع GA4 لشركات الخدمات وB2B وSaaS."
  };

  const titles: Record<string, string> = {
    en: "Mohamed Toudghi | SEO & Growth Specialist",
    fr: "Mohamed Toudghi | Spécialiste SEO et croissance",
    ar: "محمد تودغي | أخصائي SEO والنمو"
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
        'en': `${baseUrl}/`,
        'fr': `${baseUrl}/fr`,
        'ar': `${baseUrl}/ar`,
        'x-default': `${baseUrl}/`,
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
      index: IS_INDEXABLE,
      follow: IS_INDEXABLE,
    },
    verification: {
      google: "SGUSHuPBmaMkgTXn53ifmKreVw6C7d_TcwlOQYpjBq8",
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

  // Only the namespaces that client components read are sent to the browser; server components read the rest directly
  const messages = await getMessages();
  const clientMessages = Object.fromEntries(
    ['HomePage', 'ContactForm'].filter((k) => k in messages).map((k) => [k, messages[k]])
  );

  // RTL Logic
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint, so entrance animations never hide content without JS */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        {/* GA4 loads after the first interaction (see Analytics). The GTM container (GTM-53XVQ2J6) was empty,
            so it was removed; add it back here if tags are ever configured in it. */}
        <Analytics />
          <NextIntlClientProvider messages={clientMessages} locale={locale}>
            <SchemaMarkup />
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
            <CursorFollower />
          </NextIntlClientProvider>
      </body>
    </html>
  );
}
