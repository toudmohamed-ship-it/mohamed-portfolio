import PageHeader from "@/components/ui/PageHeader";
import { Link } from "@/i18n/routing";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'BlogPage.metadata' });

    return {
        title: t('title'),
        description: t('description'),
        alternates: {
            canonical: `https://www.mohamedtoudghi.com/${locale === 'en' ? '' : locale + '/'}blog`,
            languages: {
                'en': 'https://www.mohamedtoudghi.com/blog',
                'fr': 'https://www.mohamedtoudghi.com/fr/blog',
                'ar': 'https://www.mohamedtoudghi.com/ar/blog',
            },
        },
    };
}

export default async function BlogPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'BlogPage' });
    const tPosts = await getTranslations({ locale, namespace: 'BlogPosts' });

    return (
        <>
            <PageHeader
                title={t('header.title')}
                subtitle={t('header.subtitle')}
            />

            <section className="py-24 md:py-40 bg-bg-primary min-h-screen">
                <div className="container-custom">
                    <h2 className="sr-only">Latest Insights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {BLOG_POSTS.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col h-full glass rounded-[2.5rem] overflow-hidden border-border-subtle hover:border-brand-purple/30 dark:hover:bg-white/[0.05] hover:bg-black/[0.02] transition-all duration-500 shadow-2xl">
                                <div className="bg-black/5 dark:bg-white/5 aspect-video flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <span className="font-serif text-5xl opacity-5 font-bold tracking-tighter group-hover:scale-110 transition-transform duration-700 text-text-primary">Insights</span>
                                </div>
                                <div className="p-8 md:p-10 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-text-secondary mb-6 uppercase tracking-[0.2em]">
                                        <span className="flex items-center gap-2">
                                            <Calendar size={12} className="text-brand-purple" />
                                            {tPosts(`${post.slug}.date`)}
                                        </span>
                                        <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                                            {tPosts(`${post.slug}.category`)}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-text-primary mb-4 group-hover:text-brand-purple transition-colors leading-tight">
                                        {tPosts(`${post.slug}.title`)}
                                    </h3>
                                    <p className="text-text-secondary text-sm mb-8 flex-grow leading-relaxed group-hover:text-text-primary transition-colors">
                                        {tPosts(`${post.slug}.excerpt`)}
                                    </p>
                                    <div className="flex items-center text-xs font-bold text-text-primary uppercase tracking-[0.2em] group-hover:text-brand-mint transition-colors">
                                        {t('read_article')} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:ml-0 rtl:mr-2 rtl:group-hover:-translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
