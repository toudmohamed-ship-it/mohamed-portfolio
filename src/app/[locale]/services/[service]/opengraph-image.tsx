import { SERVICE_PAGES } from "@/lib/services";
import { OG_CONTENT_TYPE, OG_SIZE, ogLabel, ogMessages, renderOgImage } from "@/lib/og-image";

// Share image for a service page: service title, price and its one-line promise
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Mohamed Toudghi service";

export function generateStaticParams() {
    return ["en", "fr", "ar"].flatMap((locale) => SERVICE_PAGES.map((s) => ({ locale, service: s.slug })));
}

type Copy = { title: string; lead: string; price?: string };

export default async function Image({ params }: { params: Promise<{ locale: string; service: string }> }) {
    const { locale, service } = await params;
    const c = (ogMessages(locale).ServicePages as unknown as Record<string, Copy>)[service];
    return renderOgImage({ eyebrow: ogLabel(locale, "service"), title: c.title, highlight: c.price, note: c.lead });
}
