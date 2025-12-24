import { Link } from "@/i18n/routing";
import { ArrowRight, Calendar } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface RelatedPostsProps {
    currentSlug: string;
    relatedSlugs: string[];
    locale: string;
}

export default async function RelatedPosts({ currentSlug, relatedSlugs, locale }: RelatedPostsProps) {
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'BlogPage' });
    const tPosts = await getTranslations({ locale, namespace: 'BlogPosts' });

    const relatedPosts = BLOG_POSTS.filter(post => relatedSlugs.includes(post.slug) && post.slug !== currentSlug);

    if (relatedPosts.length === 0) return null;

    return (
        <section className="pt-24 border-t border-border-subtle">
            <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-serif font-bold text-text-primary tracking-tight">{t('related_posts.title') || "You Might Also Like"}</h2>
                <Link href="/blog" className="text-xs font-bold text-brand-purple hover:text-brand-mint transition-colors uppercase tracking-[0.2em] flex items-center gap-2">
                    {t('view_all') || "View All Posts"} <ArrowRight size={14} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group glass p-8 rounded-[2rem] border-border-subtle hover:border-brand-purple/30 transition-all duration-500 flex flex-col h-full"
                    >
                        <div className="flex items-center gap-4 text-[10px] font-bold text-text-secondary mb-6 uppercase tracking-[0.2em]">
                            <span className="flex items-center gap-2">
                                <Calendar size={12} className="text-brand-purple" />
                                {tPosts(`${post.slug}.date`)}
                            </span>
                        </div>
                        <h3 className="text-xl font-serif font-bold text-text-primary mb-4 group-hover:text-brand-purple transition-colors leading-tight">
                            {tPosts(`${post.slug}.title`)}
                        </h3>
                        <p className="text-text-secondary text-sm mb-8 flex-grow leading-relaxed group-hover:text-text-primary transition-colors">
                            {tPosts(`${post.slug}.excerpt`)}
                        </p>
                        <div className="flex items-center text-[10px] font-bold text-text-primary uppercase tracking-[0.2em] group-hover:text-brand-mint transition-colors">
                            Read Article <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
