import { CASE_STUDIES } from "@/lib/data";
import { OG_CONTENT_TYPE, OG_SIZE, ogLabel, ogMessages, renderOgImage } from "@/lib/og-image";

// Share image for a case study: client type, title and the headline result
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Mohamed Toudghi case study";

export function generateStaticParams() {
    return ["en", "fr", "ar"].flatMap((locale) => CASE_STUDIES.map((s) => ({ locale, slug: s.slug })));
}

type Study = { client: string; title: string; results: Record<string, string> };

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const c = (ogMessages(locale).CaseStudies as unknown as Record<string, Study>)[slug];
    return renderOgImage({ eyebrow: `${ogLabel(locale, "case")} · ${c.client}`, title: c.title, highlight: Object.values(c.results)[0] });
}
