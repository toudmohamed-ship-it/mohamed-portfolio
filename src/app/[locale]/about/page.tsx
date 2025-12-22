import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import { Download, CheckCircle2 } from "lucide-react";
import { getTranslations, setRequestLocale } from 'next-intl/server';

interface Props {
    params: {
        locale: string;
    };
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'AboutPage.metadata' });

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('og_title'),
            description: t('og_description'),
            images: ['/og-image.jpg'],
        },
        alternates: {
            canonical: `https://www.mohamedtoudghi.com/${locale}/about`,
        },
    };
}

export default async function AboutPage({ params }: Props) {
    const { locale } = await params;
    // Enable static rendering
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'AboutPage' });

    // Helper to get arrays from translations
    const getList = (key: string) => {
        const items = [];
        let i = 0;
        // Try fetching array items until one fails. 
        // Note: Ideally we structure JSON as array but direct array access via simple keys 
        // or just hardcoded known keys is safer if we don't have list length.
        // For 'certifications.items', it's an array in JSON. next-intl handles arrays if we use t.raw() or iterate.
        // However, t.raw is not available in the async getTranslations by default in same way.
        // Let's use the keys defined in JSON.
        // "certifications": { "items": ["...", "..."] }
        // We can fetch the raw object if we want or just map manually if we know indices.
        // Actually, best way for arrays in SC with next-intl is often just having known keys or using `await getTranslations` scope.
        // But `t` function itself can't return array usually unless specific config.
        // Let's use a workaround: we know the structure in JSON.
        // Let's fetch the keys we defined in JSON explicitly where possible or use a known number.
        // For this file I will manually map the structure I created.
        return [];
    };

    const certifications = [
        t('certifications.items.0'),
        t('certifications.items.1'),
        t('certifications.items.2'),
        t('certifications.items.3'),
        t('certifications.items.4'),
    ];

    const skills = {
        [t('expertise.categories.seo_content')]: [
            t('expertise.skills.technical_seo_audits'),
            t('expertise.skills.on_page_optimization'),
            t('expertise.skills.keyword_research'),
            t('expertise.skills.content_clustering'),
            t('expertise.skills.local_seo'),
            t('expertise.skills.international_seo'),
        ],
        [t('expertise.categories.analytics_data')]: [
            t('expertise.skills.ga4'),
            t('expertise.skills.gtm'),
            t('expertise.skills.gsc'),
            t('expertise.skills.looker_studio'),
            t('expertise.skills.cro'),
            t('expertise.skills.user_behavior'),
        ],
        [t('expertise.categories.tools_platforms')]: [
            t('expertise.skills.semrush_ahrefs'),
            t('expertise.skills.screaming_frog'),
            t('expertise.skills.wordpress_elementor'),
            t('expertise.skills.shopify_seo'),
            t('expertise.skills.hubspot_crm'),
            t('expertise.skills.google_ads'),
        ],
    };

    return (
        <>
            <PageHeader
                title={t('hero.title')}
                subtitle={t('hero.subtitle')}
            />

            <section className="py-20 bg-white">
                <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Bio Section */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-serif font-bold text-navy-900">
                            {t('journey.title')}
                        </h2>
                        <div className="prose prose-lg text-navy-600 prose-headings:text-navy-900">
                            <p dangerouslySetInnerHTML={{ __html: t.raw('journey.p1') }} />
                            <p dangerouslySetInnerHTML={{ __html: t.raw('journey.p2') }} />
                            <p dangerouslySetInnerHTML={{ __html: t.raw('journey.p3') }} />
                        </div>

                        <div className="pt-4">
                            <h3 className="text-xl font-bold text-navy-900 mb-4">{t('languages.title')}</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2"><span className="w-24 font-semibold text-navy-900">{t('languages.arabic')}</span> <span className="text-navy-500">{t('languages.native')}</span></li>
                                <li className="flex items-center gap-2"><span className="w-24 font-semibold text-navy-900">{t('languages.english')}</span> <span className="text-navy-500">{t('languages.professional')}</span></li>
                                <li className="flex items-center gap-2"><span className="w-24 font-semibold text-navy-900">{t('languages.french')}</span> <span className="text-navy-500">{t('languages.advanced')}</span></li>
                            </ul>
                        </div>

                        <div className="pt-6">
                            <a href="/resume.pdf" download="Mohamed_Toudghi_Resume.pdf">
                                <Button>
                                    <Download className="mr-2 h-4 w-4" />
                                    {t('resume')}
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-8">
                                {t('expertise.title')}
                            </h2>
                            <div className="grid grid-cols-1 gap-8">
                                {Object.entries(skills).map(([category, items]) => (
                                    <div key={category} className="bg-navy-50 p-6 rounded-xl">
                                        <h3 className="text-xl font-bold text-brand-purple mb-4">{category}</h3>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {items.map((skill) => (
                                                <li key={skill} className="flex items-start gap-2 text-sm font-medium text-navy-700">
                                                    <CheckCircle2 className="h-4 w-4 text-brand-purple mt-0.5 shrink-0" />
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Certifications */}
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-navy-900 mb-6">{t('certifications.title')}</h3>
                            <div className="flex flex-wrap gap-3">
                                {certifications.map((cert) => (
                                    <span
                                        key={cert}
                                        className="px-4 py-2 bg-white border border-navy-200 rounded-full text-sm font-medium text-navy-600 shadow-sm"
                                    >
                                        {cert}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
