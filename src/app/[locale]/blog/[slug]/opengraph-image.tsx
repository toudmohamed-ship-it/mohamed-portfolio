import { BLOG_POSTS } from "@/lib/blog-data";
import { OG_CONTENT_TYPE, OG_SIZE, ogLabel, ogMessages, renderOgImage } from "@/lib/og-image";

// Share image for an article: category, title and excerpt
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Mohamed Toudghi article";

export function generateStaticParams() {
    return ["en", "fr", "ar"].flatMap((locale) => BLOG_POSTS.map((p) => ({ locale, slug: p.slug })));
}

type Post = { title: string; excerpt: string; category: string };

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const p = (ogMessages(locale).BlogPosts as unknown as Record<string, Post>)[slug];
    return renderOgImage({ eyebrow: `${ogLabel(locale, "guide")} · ${p.category}`, title: p.title, note: p.excerpt });
}
