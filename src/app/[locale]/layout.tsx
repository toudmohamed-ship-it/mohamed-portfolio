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

  // Basic robust metadata (can be improved with translations later if needed)
  return {
    metadataBase: new URL('https://www.mohamedtoudghi.com'),
    title: {
      default: "Mohamed Toudghi | SEO Specialist & Digital Marketing Consultant",
      template: "%s | Mohamed Toudghi"
    },
    description: "Expert SEO Specialist based in Morocco.",
    alternates: {
      languages: {
        'en': '/en',
        'fr': '/fr',
        'ar': '/ar',
      },
    }
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
