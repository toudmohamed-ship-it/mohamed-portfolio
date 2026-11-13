import fs from "fs";
import path from "path";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import FinalCTA from "@/components/sections/FinalCTA";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BlogSerp, { type SerpPost, type SerpQuestion } from "@/components/blog/BlogSerp";
import { BLOG_POSTS, isFullyWritten } from "@/lib/blog-data";
import { PERSONAL_INFO } from "@/lib/constants";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageAlternates, localizedUrl, metaTitle } from "@/lib/seo";

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'BlogPage.metadata' });

    return {
        title: metaTitle(t('title')),
        description: t('description'),
        openGraph: { title: t('title'), description: t('description'), url: localizedUrl(locale, '/blog'), images: ['/og-image.jpg'] },
        alternates: pageAlternates(locale, '/blog'),
    };
}

// First FAQ of each article that has one, in the page's language, for the "People also ask" box
function loadQuestions(locale: string): SerpQuestion[] {
    const out: SerpQuestion[] = [];
    for (const post of BLOG_POSTS.filter((p) => isFullyWritten(p, locale))) {
        const dir = path.resolve(process.cwd(), "src/content/blog", post.slug);
        for (const file of [`metadata.${locale}.json`, "metadata.json"]) {
            const p = path.join(dir, file);
            if (!fs.existsSync(p)) continue;
            try {
                const faqs = (JSON.parse(fs.readFileSync(p, "utf-8")).faqs || []) as { question: string; answer: string }[];
                if (faqs[0]) out.push({ ...faqs[0], slug: post.slug });
            } catch {
                /* ignore a broken metadata file */
            }
            break;
        }
    }
    return out.slice(0, 4);
}

export default async function BlogPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'BlogPage' });
    const tPosts = await getTranslations({ locale, namespace: 'BlogPosts' });
    const tCrumbs = await getTranslations({ locale, namespace: 'Breadcrumbs' });
    const tNav = await getTranslations({ locale, namespace: 'HomePage.nav' });

    // Only articles fully written in this language are listed (the others are summaries, kept out of Google)
    const posts: SerpPost[] = BLOG_POSTS.filter((p) => isFullyWritten(p, locale)).map((p) => ({
        slug: p.slug,
        title: tPosts(`${p.slug}.title`),
        excerpt: tPosts(`${p.slug}.excerpt`),
        date: tPosts(`${p.slug}.date`),
        category: tPosts(`${p.slug}.category`),
    }));

    return (
        <>
            <section className="relative border-b border-line bg-paper">
                <div className="container-custom pt-10 md:pt-12 pb-8 flex flex-col gap-5">
                    <Breadcrumbs items={[{ label: tCrumbs('home'), href: '/' }, { label: tCrumbs('blog') }]} locale={locale} />
                    <div className="flex flex-col gap-2 max-w-[690px]">
                        <p className="m-0 font-mono text-[13px] text-forest">{t('header.eyebrow')}</p>
                        <h1 className="m-0 text-[32px] sm:text-[40px] leading-[1.1] font-semibold tracking-[-0.02em]">{t('header.title')}</h1>
                        <p className="m-0 text-[17px] text-muted">{t('header.subtitle')}</p>
                    </div>
                </div>
            </section>

            <section className="container-custom py-8 md:py-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16 items-start">
                <BlogSerp
                    posts={posts}
                    questions={loadQuestions(locale)}
                    labels={{
                        search_label: t('serp.search_label'),
                        placeholder: t('serp.placeholder'),
                        clear: t('serp.clear'),
                        all: t('serp.all'),
                        results: t('serp.results', { count: '{count}' }),
                        no_results: t('serp.no_results', { query: '{query}' }),
                        paa_title: t('serp.paa_title'),
                        paa_read: t('serp.paa_read'),
                        site_name: "Mohamed Toudghi",
                    }}
                />

                {/* Knowledge panel: who writes this blog */}
                <aside aria-label={t('author.label')} className="bg-white border border-line rounded-[18px] overflow-hidden lg:sticky lg:top-24">
                    <div className="flex items-center gap-4 p-5 border-b border-line">
                        <Image src="/images/mohamed-toudghi-face.webp" alt="" width={64} height={64} sizes="64px" className="w-16 h-16 rounded-full object-cover bg-sage" />
                        <div className="flex flex-col">
                            <span className="text-[20px] font-semibold leading-tight">Mohamed Toudghi</span>
                            <span className="text-[14px] text-muted">{tNav('role')}</span>
                        </div>
                    </div>
                    <p className="m-0 p-5 text-[14px] leading-relaxed text-ink-soft border-b border-line">{t('author.bio')}</p>
                    <ul className="list-none m-0 p-0 text-[14px]">
                        {[
                            { href: '/services', label: tNav('services') },
                            { href: '/portfolio', label: tNav('work') },
                            { href: '/about', label: tNav('about') },
                        ].map((l) => (
                            <li key={l.href} className="border-b border-line">
                                <Link href={l.href} className="row-link flex justify-between items-center px-5 py-3 text-ink no-underline hover:text-ink">
                                    {l.label} <span className="arrow" aria-hidden="true">→</span>
                                </Link>
                            </li>
                        ))}
                        <li>
                            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="row-link flex justify-between items-center px-5 py-3 text-ink no-underline hover:text-ink">
                                LinkedIn <span className="arrow" aria-hidden="true">→</span>
                            </a>
                        </li>
                    </ul>
                </aside>
            </section>

            <FinalCTA />
        </>
    );
}
