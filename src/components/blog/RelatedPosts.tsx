import { Link } from "@/i18n/routing";
import { BLOG_POSTS, isFullyWritten } from "@/lib/blog-data";
import { getTranslations } from "next-intl/server";

interface RelatedPostsProps {
    currentSlug: string;
    relatedSlugs: string[];
    locale: string;
}

export default async function RelatedPosts({ currentSlug, relatedSlugs, locale }: RelatedPostsProps) {
    const t = await getTranslations({ locale, namespace: "BlogPage" });
    const tPosts = await getTranslations({ locale, namespace: "BlogPosts" });

    // Use the article's picks, then fill with other posts so there are always two
    const pool = BLOG_POSTS.filter((p) => isFullyWritten(p, locale));
    const picks = pool.filter((p) => (relatedSlugs || []).includes(p.slug) && p.slug !== currentSlug);
    const fill = pool.filter((p) => p.slug !== currentSlug && !picks.includes(p));
    const posts = [...picks, ...fill].slice(0, 2);

    return (
        <section aria-labelledby="related-title" className="flex flex-col gap-6">
            <div className="flex flex-wrap justify-between items-end gap-4">
                <h2 id="related-title" className="m-0 text-2xl md:text-[28px] font-semibold">{t("related_posts.title")}</h2>
                <Link href="/blog" className="btn font-medium no-underline">
                    {t("view_all")} <span className="arrow" aria-hidden="true">→</span>
                </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="lift bg-white border border-line rounded-2xl p-6 flex flex-col gap-3 text-ink no-underline hover:text-ink"
                    >
                        <span className="font-mono text-xs text-forest">{post.category}</span>
                        <span className="text-lg font-semibold leading-snug">{tPosts(`${post.slug}.title`)}</span>
                        <span className="text-[15px] text-muted">{tPosts(`${post.slug}.excerpt`)}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
