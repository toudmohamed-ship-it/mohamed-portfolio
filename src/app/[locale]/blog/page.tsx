import PageHeader from "@/components/ui/PageHeader";
import FinalCTA from "@/components/sections/FinalCTA";
import { Link } from "@/i18n/routing";
import { BLOG_POSTS } from "@/lib/blog-data";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageAlternates } from "@/lib/seo";

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'BlogPage.metadata' });

    return {
        title: t('title'),
        description: t('description'),
        alternates: pageAlternates(locale, '/blog'),
    };
}

export default async function BlogPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'BlogPage' });
    const tPosts = await getTranslations({ locale, namespace: 'BlogPosts' });
    const tCrumbs = await getTranslations({ locale, namespace: 'Breadcrumbs' });
    const [featured, ...rest] = BLOG_POSTS;

    return (
        <>
            <PageHeader
                locale={locale}
                crumbs={[{ label: tCrumbs('home'), href: '/' }, { label: tCrumbs('blog') }]}
                eyebrow={t('header.eyebrow')}
                title={t('header.title')}
                lead={t('header.subtitle')}
            />

            <section className="container-custom py-16 md:py-24 flex flex-col gap-14">
                <h2 className="sr-only">{t('list_title')}</h2>

                {/* Featured: the first post, wide */}
                <Link
                    href={`/blog/${featured.slug}`}
                    className="reveal lift grid md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 bg-white border border-line rounded-[22px] p-7 md:p-10 text-ink no-underline hover:text-ink"
                >
                    <span className="flex flex-col gap-4">
                        <span className="font-mono text-[13px] text-forest">{tPosts(`${featured.slug}.category`)} · {tPosts(`${featured.slug}.date`)}</span>
                        <span className="text-[26px] md:text-[34px] font-semibold leading-tight tracking-[-0.02em]">{tPosts(`${featured.slug}.title`)}</span>
                    </span>
                    <span className="flex flex-col justify-between gap-6">
                        <span className="text-muted text-[17px]">{tPosts(`${featured.slug}.excerpt`)}</span>
                        <span className="btn font-medium text-forest">{t('read_article')} <span className="arrow" aria-hidden="true">→</span></span>
                    </span>
                </Link>

                {/* The rest: a calm list */}
                <ul className="list-none m-0 p-0">
                    {rest.map((post, i) => (
                        <li key={post.slug} className="reveal">
                            <Link
                                href={`/blog/${post.slug}`}
                                className={`row-link flex flex-wrap items-baseline gap-x-8 gap-y-2 py-7 border-t border-line rounded-xl text-ink no-underline hover:text-ink ${i === rest.length - 1 ? 'border-b' : ''}`}
                            >
                                <span className="basis-[180px] shrink-0 font-mono text-[13px] text-muted">{tPosts(`${post.slug}.category`)}<br />{tPosts(`${post.slug}.date`)}</span>
                                <span className="flex-[1_1_420px] min-w-0">
                                    <span className="block text-[21px] font-semibold leading-snug">{tPosts(`${post.slug}.title`)}</span>
                                    <span className="block text-muted text-base mt-1">{tPosts(`${post.slug}.excerpt`)}</span>
                                </span>
                                <span className="arrow text-xl shrink-0" aria-hidden="true">→</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <FinalCTA />
        </>
    );
}
