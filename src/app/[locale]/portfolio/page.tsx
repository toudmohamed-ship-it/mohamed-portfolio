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

            <section className="py-20 bg-F9FAFB">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {CASE_STUDIES.map((study) => (
                            <Link
                                key={study.slug}
                                href={`/portfolio/${study.slug}`}
                                className="group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-navy-100 hover:-translate-y-1"
                            >
                                <div className="p-8 flex flex-col h-full">
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {/* Tags: fetching from translations instead of raw data */}
                                        {/* Note: In data.ts tags might be string array, 
                                            but in json translations we often store them as a single string separated by bullets or something
                                            Let's check consistency. In data.ts it is string[]. In json it is one string with bullets?
                                            Wait, earlier I used t(`${study.slug}.tags`).split(' • ') in CaseStudyPage.
                                            Let's stick to that pattern if JSON has it as string.
                                            Let's check previous files... YES, in CaseStudyPage we used .split property.
                                            So we should do the same here.
                                        */}
                                        {tStudies(`${study.slug}.tags`).split(' • ').map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-xs font-medium text-navy-600 bg-navy-50 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-brand-purple transition-colors">
                                        {tStudies(`${study.slug}.title`)}
                                    </h3>
                                    <p className="text-navy-600 text-sm leading-relaxed mb-8 flex-grow">
                                        {tStudies(`${study.slug}.summary`)}
                                    </p>
                                    <div className="mt-auto">
                                        <Button variant="ghost" size="sm" className="pl-0 hover:bg-transparent text-brand-purple font-semibold flex items-center gap-2">
                                            {t('view_study')} <ArrowRight size={16} className="rtl:rotate-180" />
                                        </Button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-16 text-center max-w-2xl mx-auto">
                        <p className="text-sm text-navy-400 leading-relaxed">
                            {t('footer_note')}
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <FinalCTA
                    title={tFinalCTA('title')}
                    description={tFinalCTA('description')}
                    buttonText={tFinalCTA('button')}
                />
            </section>
        </>
    );
}
