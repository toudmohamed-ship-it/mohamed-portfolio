import { Link } from "@/i18n/routing";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/data";
import { IMAGE_SIZES } from "@/lib/image-sizes";
import FinalCTA from "@/components/sections/FinalCTA";
import PageHeader from "@/components/ui/PageHeader";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localizedUrl, pageAlternates } from "@/lib/seo";

interface Props {
    params: Promise<{
        slug: string;
        locale: string;
    }>;
}

type Study = (typeof CASE_STUDIES)[number] & {
    gallery?: { src: string; alt: string }[];
    comparisonMetrics?: { label: string; before: string; after: string }[];
};

export async function generateStaticParams() {
    return ['en', 'fr', 'ar'].flatMap((locale) => CASE_STUDIES.map((study) => ({ locale, slug: study.slug })));
}

export async function generateMetadata({ params }: Props) {
    const { slug, locale } = await params;
    const t = await getTranslations({ locale, namespace: 'CaseStudies' });
    const study = CASE_STUDIES.find((s) => s.slug === slug);
    if (!study) return { title: "Case Study Not Found" };

    return {
        title: t(`${slug}.title`),
        description: t(`${slug}.summary`),
        alternates: pageAlternates(locale, `/portfolio/${slug}`),
        openGraph: {
            title: t(`${slug}.title`),
            description: t(`${slug}.summary`),
            url: localizedUrl(locale, `/portfolio/${slug}`),
            images: ['/og-image.jpg'],
        },
    };
}

export default async function CaseStudyPage({ params }: Props) {
    const { slug, locale } = await params;
    setRequestLocale(locale);

    const study = CASE_STUDIES.find((s) => s.slug === slug) as Study | undefined;
    if (!study) notFound();

    const t = await getTranslations({ locale, namespace: 'CaseStudies' });
    const tUI = await getTranslations({ locale, namespace: 'CaseStudyPage' });
    const tCrumbs = await getTranslations({ locale, namespace: 'Breadcrumbs' });

    // Translated lists are stored as {"0": "...", "1": "..."} objects
    const list = (key: string): string[] => {
        if (!t.has(key)) return [];
        try {
            const raw = t.raw(key) as Record<string, string> | string[] | undefined;
            return raw ? Object.values(raw).filter(Boolean) : [];
        } catch {
            return [];
        }
    };

    const results = list(`${slug}.results`);
    const galleryAlts = list(`${slug}.gallery_alts`);
    const tags = t(`${slug}.tags`).split(' • ');
    const gallery = study.gallery || [];
    const metrics = (study.comparisonMetrics || []).map((m, i) => {
        if (!t.has(`${slug}.comparisonMetrics.${i}`)) return m;
        try {
            return (t.raw(`${slug}.comparisonMetrics.${i}`) as typeof m) || m;
        } catch {
            return m;
        }
    });
    const others = CASE_STUDIES.filter((s) => s.slug !== slug).slice(0, 3);

    return (
        <>
            <PageHeader
                locale={locale}
                crumbs={[
                    { label: tCrumbs('home'), href: '/' },
                    { label: tCrumbs('portfolio'), href: '/portfolio' },
                    { label: t(`${slug}.client`) },
                ]}
                eyebrow={tags.join(' · ')}
                title={t(`${slug}.title`)}
                lead={t(`${slug}.summary`)}
            />

            {results.length > 0 && (
                <section aria-labelledby="results-title" className="container-custom pt-14 md:pt-16">
                    <h2 id="results-title" className="m-0 mb-6 text-sm font-mono font-normal text-muted tracking-normal">{tUI('key_results')}</h2>
                    <ul className="list-none m-0 p-0 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
                        {results.map((r) => (
                            <li key={r} className="in d2 bg-white border border-line rounded-2xl p-6 text-[17px] font-medium text-ink leading-snug border-s-4 border-s-forest">
                                {r}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <div className="container-custom py-14 md:py-20 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 items-start">
                <div className="min-w-0 max-w-[740px] flex flex-col gap-14">
                    <section className="reveal flex flex-col gap-4">
                        <h2 className="m-0 text-[28px] font-semibold">{tUI('challenge')}</h2>
                        <p className="m-0 text-[18px] leading-relaxed text-ink-soft">{t(`${slug}.challenge`)}</p>
                    </section>

                    <section className="reveal flex flex-col gap-4">
                        <h2 className="m-0 text-[28px] font-semibold">{tUI('approach')}</h2>
                        <p className="m-0 text-[18px] leading-relaxed text-ink-soft">{t(`${slug}.approach`)}</p>
                    </section>

                    {metrics.length > 0 && (
                        <section className="reveal flex flex-col gap-5">
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

                    {gallery.length > 0 && (
                        <section className="flex flex-col gap-6">
                            <h2 className="reveal m-0 text-[28px] font-semibold">{tUI('performance_evidence')}</h2>
                            {gallery.map((image, i) => {
                                const [w, h] = IMAGE_SIZES[image.src] || [1200, 800];
                                const alt = galleryAlts[i] || image.alt;
                                return (
                                    <figure key={image.src} className="reveal m-0 bg-white border border-line rounded-2xl p-3 md:p-4">
                                        <Image
                                            src={image.src}
                                            alt={alt}
                                            width={w}
                                            height={h}
                                            sizes="(min-width: 1024px) 740px, 100vw"
                                            className="w-full h-auto rounded-xl"
                                        />
                                        <figcaption className="pt-3 px-1 text-sm text-muted">{alt}</figcaption>
                                    </figure>
                                );
                            })}
                        </section>
                    )}
                </div>

                <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
                    <div className="bg-white border border-line rounded-[20px] p-6 flex flex-col gap-5">
                        <div className="flex flex-col gap-1">
                            <span className="font-mono text-xs text-muted">{tUI('client')}</span>
                            <span className="font-semibold">{t(`${slug}.client`)}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-mono text-xs text-muted">{tUI('tools_used')}</span>
                            <ul className="list-none m-0 p-0 flex flex-wrap gap-2">
                                {study.tools.map((tool) => (
                                    <li key={tool} className="text-sm px-3 py-1.5 rounded-full bg-paper border border-line">{tool}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
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
        </>
    );
}
