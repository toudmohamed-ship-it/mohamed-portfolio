import { Link } from "@/i18n/routing";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/data";
import { IMAGE_SIZES } from "@/lib/image-sizes";
import FinalCTA from "@/components/sections/FinalCTA";
import PageHeader from "@/components/ui/PageHeader";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BASE_URL, localizedUrl, pageAlternates, jsonLd } from "@/lib/seo";
import { SERVICE_PAGES, serviceHref } from "@/lib/services";

interface Props {
    params: Promise<{
        slug: string;
        locale: string;
    }>;
}

export async function generateStaticParams() {
    return ['en', 'fr', 'ar'].flatMap((locale) => CASE_STUDIES.map((study) => ({ locale, slug: study.slug })));
}

export async function generateMetadata({ params }: Props) {
    const { slug, locale } = await params;
    const t = await getTranslations({ locale, namespace: 'CaseStudies' });
    const study = CASE_STUDIES.find((s) => s.slug === slug);
    if (!study) return { title: "Case Study Not Found" };

    // Search-friendly title ("Local SEO Case Study: U.S. Law Firm"); the layout template adds the name
    const title = t.has(`${slug}.seo_title`) ? t(`${slug}.seo_title`) : t(`${slug}.title`);
    const image = study.gallery[0]?.src;

    return {
        title,
        description: t(`${slug}.summary`),
        alternates: pageAlternates(locale, `/portfolio/${slug}`),
        openGraph: {
            type: "article",
            title,
            description: t(`${slug}.summary`),
            url: localizedUrl(locale, `/portfolio/${slug}`),
            images: [image || '/og-image.jpg'],
        },
    };
}

// "First sentence. Second sentence." -> steps. Keeps the exact wording; works for EN, FR and AR.
function toSteps(text: string) {
    return text.split(/(?<=[.!?؟])\s+(?=[A-ZÀ-ÖØ-Þ؀-ۿ"'«(])/u).map((s) => s.trim()).filter(Boolean);
}

export default async function CaseStudyPage({ params }: Props) {
    const { slug, locale } = await params;
    setRequestLocale(locale);

    const study = CASE_STUDIES.find((s) => s.slug === slug);
    if (!study) notFound();

    const t = await getTranslations({ locale, namespace: 'CaseStudies' });
    const tUI = await getTranslations({ locale, namespace: 'CaseStudyPage' });
    const tCrumbs = await getTranslations({ locale, namespace: 'Breadcrumbs' });
    const tServices = await getTranslations({ locale, namespace: 'ServicesPage.core_services' });
    const tPosts = await getTranslations({ locale, namespace: 'BlogPosts' });
    const tPages = await getTranslations({ locale, namespace: 'ServicePages' });
    // Industry pages that use this study as their main proof (e.g. the law firm study -> SEO for law firms)
    const industryPages = SERVICE_PAGES.filter((p) => p.parent && p.caseStudies[0] === study.slug);
    // Market pages that use this study as their proof
    const tMorocco = await getTranslations({ locale, namespace: 'MoroccoPage' });
    const marketPages = study.slug === "moroccan-b2b-seo" ? [{ href: "/consultant-seo-maroc", label: tMorocco('crumb') }] : [];

    // Translated lists are stored as {"0": "...", "1": "..."} objects
    const list = (key: string): string[] => {
        if (!t.has(key)) return [];
        const raw = t.raw(key) as Record<string, string> | string[];
        return Object.values(raw).filter(Boolean);
    };

    const title = t(`${slug}.title`);
    const summary = t(`${slug}.summary`);
    const client = t(`${slug}.client`);
    const results = list(`${slug}.results`);
    const captions = list(`${slug}.gallery_alts`);
    const tags = t(`${slug}.tags`).split(' • ');
    const steps = toSteps(t(`${slug}.approach`));
    const market = t.has(`${slug}.market`) ? t(`${slug}.market`) : null;
    const period = t.has(`${slug}.period`) ? t(`${slug}.period`) : null;
    const metrics = (study.comparisonMetrics || []).map((m, i) =>
        t.has(`${slug}.comparisonMetrics.${i}`) ? (t.raw(`${slug}.comparisonMetrics.${i}`) as typeof m) : m
    );
    const others = CASE_STUDIES.filter((s) => s.slug !== slug).slice(0, 3);
    const url = localizedUrl(locale, `/portfolio/${slug}`);

    // Structured data: the case study as an Article written by Mohamed (client stays anonymous)
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: summary,
        inLanguage: locale,
        url,
        mainEntityOfPage: url,
        ...(study.gallery[0] ? { image: `${BASE_URL}${study.gallery[0].src}` } : {}),
        author: { "@id": `${BASE_URL}/#person` },
        publisher: { "@id": `${BASE_URL}/#person` },
        about: tags,
        keywords: tags.join(", "),
    };

    const facts: { label: string; value: React.ReactNode }[] = [
        { label: tUI('client'), value: client },
        ...(market ? [{ label: tUI('market'), value: market }] : []),
        ...(period ? [{ label: tUI('period'), value: period }] : []),
        { label: tUI('services'), value: tags.join(' · ') },
        { label: tUI('tools_used'), value: study.tools.join(' · ') },
    ];

    return (
        <>
            <PageHeader
                locale={locale}
                crumbs={[
                    { label: tCrumbs('home'), href: '/' },
                    { label: tCrumbs('portfolio'), href: '/portfolio' },
                    { label: client },
                ]}
                eyebrow={tags.join(' · ')}
                title={title}
                lead={summary}
            >
                <dl aria-label={tUI('at_a_glance')} className="m-0 mt-4 grid gap-px bg-line border border-line rounded-[18px] overflow-hidden [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
                    {facts.map((f) => (
                        <div key={f.label} className="bg-white px-5 py-4 flex flex-col gap-1">
                            <dt className="font-mono text-xs text-muted">{f.label}</dt>
                            <dd className="m-0 text-[15px] font-medium text-ink">{f.value}</dd>
                        </div>
                    ))}
                </dl>
            </PageHeader>

            {/* Results first: what a reader came for */}
            {results.length > 0 && (
                <section aria-labelledby="results-title" className="container-custom pt-14 md:pt-16">
                    <h2 id="results-title" className="m-0 mb-6 text-2xl md:text-[28px] font-semibold">{tUI('key_results')}</h2>
                    <ul className="list-none m-0 p-0 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
                        {results.map((r) => (
                            <li key={r} className="bg-white border border-line border-s-4 border-s-forest rounded-2xl p-6 text-[17px] font-medium text-ink leading-snug">
                                {r}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <div className="container-custom py-14 md:py-20 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 items-start">
                <article className="min-w-0 max-w-[740px] flex flex-col gap-14">
                    <section className="flex flex-col gap-4">
                        <h2 className="m-0 text-[28px] font-semibold">{tUI('challenge')}</h2>
                        <p className="m-0 text-[18px] leading-relaxed text-ink-soft">{t(`${slug}.challenge`)}</p>
                    </section>

                    <section className="flex flex-col gap-5">
                        <h2 className="m-0 text-[28px] font-semibold">{tUI('approach')}</h2>
                        {steps.length > 1 ? (
                            <ol className="list-none m-0 p-0 flex flex-col gap-4">
                                {steps.map((step, i) => (
                                    <li key={i} className="flex gap-4 items-start">
                                        <span aria-hidden="true" className="shrink-0 w-8 h-8 rounded-full bg-sage text-forest font-semibold text-sm flex items-center justify-center mt-0.5">{i + 1}</span>
                                        <span className="text-[17px] leading-relaxed text-ink-soft">{step}</span>
                                    </li>
                                ))}
                            </ol>
                        ) : (
                            <p className="m-0 text-[18px] leading-relaxed text-ink-soft">{steps[0]}</p>
                        )}
                    </section>

                    {metrics.length > 0 && (
                        <section className="flex flex-col gap-5">
                            <h2 className="m-0 text-[28px] font-semibold">{tUI('before_after')}</h2>
                            <div className="overflow-x-auto bg-white border border-line rounded-2xl">
                                <table className="w-full text-start border-collapse text-[15px]">
                                    <thead>
                                        <tr className="bg-paper">
                                            <th scope="col" className="text-start font-semibold p-4 border-b border-line">{tUI('metric')}</th>
                                            <th scope="col" className="text-start font-semibold p-4 border-b border-line">{tUI('before')}</th>
                                            <th scope="col" className="text-start font-semibold p-4 border-b border-line text-forest">{tUI('after_optimization')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {metrics.map((m, i) => (
                                            <tr key={i} className="border-b border-line last:border-0">
                                                <th scope="row" className="text-start font-medium p-4">{m.label}</th>
                                                <td className="p-4 font-mono text-muted" dir="ltr">{m.before}</td>
                                                <td className="p-4 font-mono text-forest font-medium" dir="ltr">{m.after}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {study.gallery.length > 0 && (
                        <section className="flex flex-col gap-6">
                            <h2 className="m-0 text-[28px] font-semibold">{tUI('performance_evidence')}</h2>
                            {study.gallery.map((image, i) => {
                                const [w, h] = IMAGE_SIZES[image.src] || [1200, 800];
                                const caption = captions[i] || image.alt;
                                return (
                                    <figure key={image.src} className="m-0 bg-white border border-line rounded-2xl p-3 md:p-4">
                                        <Image
                                            src={image.src}
                                            alt={caption}
                                            width={w}
                                            height={h}
                                            sizes="(min-width: 1024px) 740px, 100vw"
                                            className="w-full h-auto rounded-xl"
                                            style={{ maxWidth: w }}
                                        />
                                        <figcaption className="pt-3 px-1 text-sm text-muted">{caption}</figcaption>
                                    </figure>
                                );
                            })}
                        </section>
                    )}
                </article>

                <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
                    <nav aria-label={tUI('related_title')} className="bg-white border border-line rounded-[20px] p-6 flex flex-col gap-5">
                        <p className="m-0 font-mono text-xs text-muted">{tUI('related_title')}</p>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-muted">{tUI('related_service')}</span>
                            <ul className="list-none m-0 p-0 flex flex-col gap-2">
                                {study.services.map((s) => (
                                    <li key={s}>
                                        <Link href={serviceHref(s)} className="btn font-medium no-underline text-[15px]">
                                            {tServices(`${s}.title`)} <span className="arrow" aria-hidden="true">→</span>
                                        </Link>
                                    </li>
                                ))}
                                {industryPages.map((p) => (
                                    <li key={p.slug}>
                                        <Link href={`/services/${p.slug}`} className="btn font-medium no-underline text-[15px]">
                                            {tPages(`${p.slug}.title`)} <span className="arrow" aria-hidden="true">→</span>
                                        </Link>
                                    </li>
                                ))}
                                {marketPages.map((p) => (
                                    <li key={p.href}>
                                        <Link href={p.href} className="btn font-medium no-underline text-[15px]">
                                            {p.label} <span className="arrow" aria-hidden="true">→</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-2 pt-4 border-t border-line">
                            <span className="text-sm text-muted">{tUI('related_article')}</span>
                            <Link href={`/blog/${study.relatedPost}`} className="font-medium text-[15px] text-ink no-underline hover:text-forest leading-snug">
                                {tPosts(`${study.relatedPost}.title`)}
                            </Link>
                        </div>
                    </nav>
                    <p className="m-0 text-sm text-muted px-1">
                        <strong className="text-ink-soft font-medium">{tUI('confidentiality.title')}.</strong> {tUI('confidentiality.text')}
                    </p>
                </aside>
            </div>

            <section data-tone="white" className="bg-white border-t border-line">
                <div className="container-custom py-16 md:py-20">
                    <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
                        <h2 className="m-0 text-2xl md:text-[28px] font-semibold">{tUI('more_studies')}</h2>
                        <Link href="/portfolio" className="btn font-medium no-underline">{tUI('back_to_portfolio')} <span className="arrow" aria-hidden="true">→</span></Link>
                    </div>
                    <ul className="list-none m-0 p-0">
                        {others.map((s, i) => (
                            <li key={s.slug}>
                                <Link
                                    href={`/portfolio/${s.slug}`}
                                    className={`row-link flex flex-wrap items-center gap-x-8 gap-y-2 py-6 border-t border-line rounded-xl text-ink no-underline hover:text-ink ${i === others.length - 1 ? 'border-b' : ''}`}
                                >
                                    <span className="basis-[170px] shrink-0 font-mono text-[13px] text-muted">{t(`${s.slug}.client`)}</span>
                                    <span className="flex-[1_1_380px] min-w-0 text-[19px] font-semibold leading-snug">{t(`${s.slug}.title`)}</span>
                                    <span className="arrow text-xl shrink-0" aria-hidden="true">→</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <FinalCTA />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
        </>
    );
}
