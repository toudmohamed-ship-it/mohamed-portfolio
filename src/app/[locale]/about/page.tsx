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

            <section className="py-24 md:py-40 bg-bg-primary">
                <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    {/* Bio Section */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-serif font-bold text-text-primary tracking-tight">
                                {t('journey.title')}
                            </h2>
                            <div className="prose prose-lg text-text-secondary prose-headings:text-text-primary leading-relaxed max-w-none">
                                <p dangerouslySetInnerHTML={{ __html: t.raw('journey.p1') }} />
                                <p dangerouslySetInnerHTML={{ __html: t.raw('journey.p2') }} />
                                <p dangerouslySetInnerHTML={{ __html: t.raw('journey.p3') }} />
                            </div>
                        </div>

                        <div className="pt-8 border-t border-border-subtle">
                            <h3 className="text-xl font-bold text-text-primary mb-6 uppercase tracking-widest text-xs">{t('languages.title')}</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4"><span className="w-24 font-bold text-text-secondary text-sm uppercase tracking-wider">{t('languages.arabic')}</span> <span className="text-brand-mint font-medium">{t('languages.native')}</span></li>
                                <li className="flex items-center gap-4"><span className="w-24 font-bold text-text-secondary text-sm uppercase tracking-wider">{t('languages.english')}</span> <span className="text-text-secondary font-medium">{t('languages.professional')}</span></li>
                                <li className="flex items-center gap-4"><span className="w-24 font-bold text-text-secondary text-sm uppercase tracking-wider">{t('languages.french')}</span> <span className="text-text-secondary font-medium">{t('languages.advanced')}</span></li>
                            </ul>
                        </div>

                        <div className="pt-8">
                            <a href="/resume.pdf" download="Mohamed_Toudghi_Resume.pdf">
                                <Button size="lg" className="rounded-full px-10">
                                    <Download className="mr-2 h-5 w-5" />
                                    {t('resume')}
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="space-y-16">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-text-primary mb-10 tracking-tight">
                                {t('expertise.title')}
                            </h2>
                            <div className="grid grid-cols-1 gap-8">
                                {Object.entries(skills).map(([category, items]) => (
                                    <div key={category} className="glass p-8 rounded-3xl border-border-subtle">
                                        <h3 className="text-xl font-bold text-brand-purple mb-6 tracking-tight">{category}</h3>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {items.map((skill) => (
                                                <li key={skill} className="flex items-start gap-3 text-sm font-medium text-text-secondary">
                                                    <CheckCircle2 className="h-4 w-4 text-brand-mint mt-0.5 shrink-0" />
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
                            <h3 className="text-2xl font-serif font-bold text-text-primary mb-8 tracking-tight">{t('certifications.title')}</h3>
                            <div className="flex flex-wrap gap-3">
                                {certifications.map((cert) => (
                                    <span
                                        key={cert}
                                        className="px-5 py-2.5 bg-black/5 dark:bg-white/5 border border-border-subtle rounded-full text-xs font-bold text-text-secondary tracking-wider uppercase"
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
