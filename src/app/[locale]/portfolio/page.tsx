import PageHeader from "@/components/ui/PageHeader";
import { Link } from "@/i18n/routing";
import Button from "@/components/ui/Button";
import FinalCTA from "@/components/sections/FinalCTA";
import { ArrowRight } from "lucide-react";
import { CASE_STUDIES } from "@/lib/data";
import { getTranslations, setRequestLocale } from "next-intl/server";

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
            images: ['/og-image.jpg'],
        },
        alternates: {
            canonical: `https://www.mohamedtoudghi.com/${locale === 'en' ? '' : locale + '/'}portfolio`,
        },
    };
}

export default async function PortfolioPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'PortfolioPage' });
    const tStudies = await getTranslations({ locale, namespace: 'CaseStudies' }); // Namespace for dynamic data
    const tFinalCTA = await getTranslations({ locale, namespace: 'HomePage.FinalCTA' }); // Namespace for common CTA

    return (
        <>
            <PageHeader
                title={t('header.title')}
                subtitle={t('header.subtitle')}
                supportingText={t('header.supporting_text')}
            />

            <section className="py-24 md:py-40 bg-bg-primary">
                <div className="container-custom">
                    <h2 className="sr-only">Our Case Studies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                        {CASE_STUDIES.map((study) => (
                            <Link
                                key={study.slug}
                                href={`/portfolio/${study.slug}`}
                                className="group flex flex-col h-full glass rounded-[2.5rem] overflow-hidden border-border-subtle hover:border-brand-purple/30 dark:hover:bg-white/[0.05] hover:bg-black/[0.02] hover:-translate-y-2 transition-all duration-500 shadow-2xl"
                            >
                                <div className="p-10 md:p-12 flex flex-col h-full relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-purple/5 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="flex flex-wrap gap-3 mb-8">
                                        {tStudies(`${study.slug}.tags`).split(' • ').map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-4 py-1.5 text-[10px] font-bold text-brand-mint bg-brand-mint/5 border border-brand-mint/10 rounded-full uppercase tracking-wider"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold text-text-primary mb-4 group-hover:text-brand-purple transition-colors leading-tight">
                                        {tStudies(`${study.slug}.title`)}
                                    </h3>
                                    <p className="text-text-secondary text-base leading-relaxed mb-10 flex-grow group-hover:text-text-primary transition-colors">
                                        {tStudies(`${study.slug}.summary`)}
                                    </p>
                                    <div className="mt-auto">
                                        <div className="inline-flex items-center gap-2 text-text-primary font-bold text-xs uppercase tracking-[0.2em] group-hover:text-brand-mint transition-colors">
                                            {t('view_study')} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-24 text-center max-w-2xl mx-auto">
                        <p className="text-sm text-text-secondary leading-relaxed font-medium uppercase tracking-[0.1em] opacity-60">
                            {t('footer_note')}
                        </p>
                    </div>
                </div>
            </section>

            <FinalCTA
                title={tFinalCTA('title')}
                description={tFinalCTA('description')}
                buttonText={tFinalCTA('button')}
            />
        </>
    );
}
