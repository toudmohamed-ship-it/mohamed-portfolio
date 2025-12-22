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

            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {BLOG_POSTS.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col h-full border border-navy-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-brand-purple/20 transition-all duration-300 bg-white">
                                <div className="bg-navy-50 aspect-video flex items-center justify-center text-navy-300">
                                    {/* Placeholder generic image */}
                                    <span className="font-serif text-4xl opacity-20 font-bold">Blog</span>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs font-medium text-navy-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {/* Note: In a real app we'd format date by locale using new Date(post.date).toLocaleDateString(locale) 
                                                For now we are reading localized string from JSON or fallback to Data?
                                                Actually, let's use the translated date from JSON if available, as 'date' is in BlogPosts object 
                                            */}
                                            {tPosts(`${post.slug}.date`)}
                                        </span>
                                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-50 text-brand-purple">
                                            <Tag size={12} /> {tPosts(`${post.slug}.category`)}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-brand-purple transition-colors">
                                        {tPosts(`${post.slug}.title`)}
                                    </h3>
                                    <p className="text-navy-600 text-sm mb-6 flex-grow">
                                        {tPosts(`${post.slug}.excerpt`)}
                                    </p>
                                    <div className="flex items-center text-sm font-medium text-navy-900 group-hover:text-brand-purple transition-colors">
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
