import PageHeader from "@/components/ui/PageHeader";
import { Link } from "@/i18n/routing";
import FinalCTA from "@/components/sections/FinalCTA";
import { CASE_STUDIES } from "@/lib/data";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedUrl, pageAlternates } from "@/lib/seo";

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'PortfolioPage.metadata' });

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('og_title'),
            description: t('og_description'),
            url: localizedUrl(locale, '/portfolio'),
            images: ['/og-image.jpg'],
        },
        alternates: pageAlternates(locale, '/portfolio'),
    };
}

export default async function PortfolioPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'PortfolioPage' });
    const tStudies = await getTranslations({ locale, namespace: 'CaseStudies' });
    const tCrumbs = await getTranslations({ locale, namespace: 'Breadcrumbs' });

    return (
        <>
            <PageHeader
                locale={locale}
                crumbs={[{ label: tCrumbs('home'), href: '/' }, { label: tCrumbs('portfolio') }]}
                eyebrow={t('header.eyebrow')}
                title={t('header.title')}
                lead={t('header.subtitle')}
            />

            <section className="container-custom py-16 md:py-24">
                <h2 className="sr-only">{t('list_title')}</h2>
                <ul className="list-none m-0 p-0 grid gap-5 md:grid-cols-2">
                    {CASE_STUDIES.map((study, i) => (
                        <li key={study.slug} className={`reveal ${i === 0 ? 'md:col-span-2' : ''}`}>
                            <Link
                                href={`/portfolio/${study.slug}`}
                                className={`lift h-full bg-white border border-line rounded-[20px] p-7 md:p-8 flex flex-col gap-4 text-ink no-underline hover:text-ink ${i === 0 ? 'md:grid md:grid-cols-[1.1fr_1fr] md:gap-10' : ''}`}
                            >
                                <span className="flex flex-col gap-3">
                                    <span className="font-mono text-[13px] text-forest">{tStudies(`${study.slug}.client`)}</span>
                                    <span className={`font-semibold leading-snug tracking-[-0.01em] ${i === 0 ? 'text-[26px] md:text-[30px]' : 'text-[22px]'}`}>{tStudies(`${study.slug}.title`)}</span>
                                </span>
                                <span className="flex flex-col gap-4 flex-1">
                                    <span className="text-muted text-base">{tStudies(`${study.slug}.summary`)}</span>
                                    <span className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                                        <span className="flex flex-wrap gap-2">
                                            {tStudies(`${study.slug}.tags`).split(' • ').map((tag) => (
                                                <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-paper border border-line text-ink-soft">{tag}</span>
                                            ))}
                                        </span>
                                        <span className="btn font-medium text-forest text-[15px]">{t('view_study')} <span className="arrow" aria-hidden="true">→</span></span>
                                    </span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <p className="reveal m-0 mt-10 text-sm text-muted max-w-[640px]">{t('footer_note')}</p>
            </section>

            <FinalCTA />
        </>
    );
}
