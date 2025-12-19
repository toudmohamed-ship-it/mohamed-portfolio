import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mohamedtoudghi.com'),
  title: {
    default: "Mohamed Toudghi | SEO Specialist & Digital Marketing Consultant in Morocco",
    template: "%s | Mohamed Toudghi"
  },
  description: "Expert SEO Specialist and Digital Marketing Consultant based in Morocco. Specializing in Technical SEO, Local SEO, Analytics, and Website Optimization. Proven results across international clients.",
  keywords: [
    "SEO Specialist Morocco",
    "Digital Marketing Consultant",
    "Technical SEO Expert",
    "Local SEO Morocco",
    "Google Analytics Setup",
    "Website Optimization",
    "SEO Audit Services",
    "Mohamed Toudghi",
    "Conversion Rate Optimization",
    "International SEO"
  ],
  authors: [{ name: "Mohamed Toudghi" }],
  creator: "Mohamed Toudghi",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mohamedtoudghi.com',
    title: 'Mohamed Toudghi | SEO Specialist & Digital Marketing Consultant',
    description: 'Expert SEO Specialist based in Morocco with proven results in Technical SEO, Local SEO, and Analytics. Helping businesses grow through data-driven digital marketing.',
    siteName: 'Mohamed Toudghi Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mohamed Toudghi - SEO & Digital Marketing Specialist',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohamed Toudghi | SEO Specialist & Digital Marketing Consultant',
    description: 'Expert SEO Specialist based in Morocco. Specializing in Technical SEO, Analytics, and Website Optimization.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://mohamedtoudghi.com',
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import SchemaMarkup from "@/components/seo/SchemaMarkup";

// ... (previous imports)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${dmSerif.variable} antialiased bg-slate-50 text-slate-900 flex flex-col min-h-screen`}
      >
        <SchemaMarkup />
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
