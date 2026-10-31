import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { BLOG_POSTS } from "@/lib/blog-data";

const FEATURED = ["technical-seo-audit-checklist-lead-gen", "local-seo-guide-businesses", "ga4-event-tracking"];

export default function BlogPreview() {
    const t = useTranslations("HomePage.blog");
    const tPosts = useTranslations("BlogPosts");
    const posts = FEATURED.map((slug) => BLOG_POSTS.find((p) => p.slug === slug)).filter((p) => p !== undefined);

    return (
        <section id="blog" className="cv container-custom pb-24 md:pb-[104px]">
            <div className="reveal flex flex-wrap justify-between items-end gap-4 mb-7">
                <h2 className="m-0 text-3xl md:text-4xl font-semibold">{t("title")}</h2>
                <Link href="/blog" className="btn font-medium no-underline">
                    {t("all")} <span className="arrow" aria-hidden="true">→</span>
                </Link>
            </div>
            <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="reveal lift bg-white border border-line rounded-2xl p-[26px] flex flex-col gap-3 text-ink no-underline hover:text-ink"
                    >
                        <span className="font-mono text-xs text-forest">{post.category}</span>
                        <span className="text-[19px] font-semibold leading-snug">{tPosts(`${post.slug}.title`)}</span>
                        <span className="text-[15px] text-muted">{tPosts(`${post.slug}.excerpt`)}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
