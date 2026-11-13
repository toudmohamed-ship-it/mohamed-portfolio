import { OG_CONTENT_TYPE, OG_SIZE, ogMessages, renderOgImage } from "@/lib/og-image";
import { OPEN_FOR_WORK } from "@/lib/constants";

// Share image for the contact page: the free mini-audit offer, or a plain contact card in portfolio mode
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = OPEN_FOR_WORK ? "Free SEO mini-audit by Mohamed Toudghi" : "Contact Mohamed Toudghi";

export function generateStaticParams() {
    return ["en", "fr", "ar"].map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const page = ogMessages(locale).ContactPage;
    if (!OPEN_FOR_WORK) return renderOgImage({ eyebrow: page.header.eyebrow, title: page.closed.title, note: page.closed.subtitle });
    const m = page.mini_audit;
    return renderOgImage({ eyebrow: page.header.eyebrow, title: m.title, highlight: m.points[1], note: m.points[2] });
}
