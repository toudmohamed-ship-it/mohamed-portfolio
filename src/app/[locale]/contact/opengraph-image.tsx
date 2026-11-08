import { OG_CONTENT_TYPE, OG_SIZE, ogMessages, renderOgImage } from "@/lib/og-image";

// Share image for the contact page: the free mini-audit offer
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Free SEO mini-audit by Mohamed Toudghi";

export function generateStaticParams() {
    return ["en", "fr", "ar"].map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const m = ogMessages(locale).ContactPage.mini_audit;
    return renderOgImage({ eyebrow: ogMessages(locale).ContactPage.header.eyebrow, title: m.title, highlight: m.points[1], note: m.points[2] });
}
