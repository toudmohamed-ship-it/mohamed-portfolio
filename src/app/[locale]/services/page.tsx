import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import FinalCTA from "@/components/sections/FinalCTA";
import { Search, Globe, MapPin, BarChart2, Code2, LayoutDashboard, Database, Target, LineChart } from "lucide-react";
import { getTranslations, setRequestLocale } from 'next-intl/server';

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ServicesPage.metadata' });

    return {
        title: t('title'),
        description: t('description'),
        alternates: {
            canonical: `https://www.mohamedtoudghi.com/${locale === 'en' ? '' : locale + '/'}services`,
            languages: {
                'en': 'https://www.mohamedtoudghi.com/services',
                'fr': 'https://www.mohamedtoudghi.com/fr/services',
                'ar': 'https://www.mohamedtoudghi.com/ar/services',
            },
        },
    };
}

export default async function ServicesPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'ServicesPage' });

    // Define services data inside the component to use translations
    const servicesData = [
        {
            icon: Search,
            key: "tech_seo",
            deliverablesCount: 5
        },
        {
            icon: LayoutDashboard,
            key: "keyword_strategy",
            deliverablesCount: 5
        },
        {
            icon: MapPin,
            key: "local_seo",
            deliverablesCount: 5
        },
        {
            icon: Globe,
            key: "international_seo",
            deliverablesCount: 5
        },
        {
            icon: BarChart2,
            key: "analytics",
            deliverablesCount: 5
        },
        {
            icon: Code2,
            key: "wp_optimization",
            deliverablesCount: 5
        },
    ];

    return (
        <>
            <PageHeader
                title={t('header.title')}
                subtitle={t('header.subtitle')}
                supportingText={t('header.supportingText')}
            />

            {/* How I Work Section */}
            <section className="py-24 md:py-40 bg-bg-primary border-b border-border-subtle relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-purple/5 blur-[120px] rounded-full -z-0" />

                <div className="container-custom relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-6 tracking-tight">{t('how_it_works.title')}</h2>
                        <p className="text-lg text-text-secondary leading-relaxed">{t('how_it_works.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Step 1 */}
                        <div className="glass rounded-3xl p-10 relative group dark:hover:bg-white/[0.05] hover:bg-black/[0.02] transition-all duration-500 overflow-hidden border-border-subtle">
                            <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] text-[10rem] font-serif font-bold text-text-primary leading-none pointer-events-none group-hover:opacity-[0.06] transition-opacity">1</div>
                            <div className="w-16 h-16 bg-brand-purple/10 rounded-2xl flex items-center justify-center text-brand-purple mb-8 border border-brand-purple/20">
                                <Database size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-text-primary mb-4 relative z-10">{t('how_it_works.step1_title')}</h3>
                            <p className="text-text-secondary relative z-10 leading-relaxed">
                                {t('how_it_works.step1_desc')}
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="glass rounded-3xl p-10 relative group dark:hover:bg-white/[0.05] hover:bg-black/[0.02] transition-all duration-500 overflow-hidden border-border-subtle">
                            <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] text-[10rem] font-serif font-bold text-text-primary leading-none pointer-events-none group-hover:opacity-[0.06] transition-opacity">2</div>
                            <div className="w-16 h-16 bg-brand-mint/10 rounded-2xl flex items-center justify-center text-brand-mint mb-8 border border-brand-mint/20">
                                <Target size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-text-primary mb-4 relative z-10">{t('how_it_works.step2_title')}</h3>
                            <p className="text-text-secondary relative z-10 leading-relaxed">
                                {t('how_it_works.step2_desc')}
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="glass rounded-3xl p-10 relative group dark:hover:bg-white/[0.05] hover:bg-black/[0.02] transition-all duration-500 overflow-hidden border-border-subtle">
                            <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] text-[10rem] font-serif font-bold text-text-primary leading-none pointer-events-none group-hover:opacity-[0.06] transition-opacity">3</div>
                            <div className="w-16 h-16 bg-brand-cyan/10 rounded-2xl flex items-center justify-center text-brand-cyan mb-8 border border-brand-cyan/20">
                                <LineChart size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-text-primary mb-4 relative z-10">{t('how_it_works.step3_title')}</h3>
                            <p className="text-text-secondary relative z-10 leading-relaxed">
                                {t('how_it_works.step3_desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Services Section */}
            <section className="py-24 md:py-40 bg-bg-primary">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-6 tracking-tight">{t('core_services.title')}</h2>
                        <p className="text-lg text-text-secondary font-medium">{t('core_services.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {servicesData.map((service, index) => (
                            <div id={service.key} key={index} className="flex flex-col h-full glass border-border-subtle rounded-[2rem] p-10 hover:shadow-2xl hover:border-brand-purple/30 dark:hover:bg-white/[0.05] hover:bg-black/[0.02] transition-all duration-500 scroll-mt-24 group">
                                <div className="w-16 h-16 bg-black/5 dark:bg-white/5 border border-border-subtle rounded-2xl flex items-center justify-center text-brand-purple mb-8 group-hover:bg-brand-purple group-hover:text-white transition-all duration-500">
                                    <service.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-text-primary mb-2 tracking-tight">{t(`core_services.${service.key}.title`)}</h3>
                                <p className="text-xs font-bold text-brand-mint mb-6 uppercase tracking-widest">{t(`core_services.${service.key}.bestFor`)}</p>
                                <p className="text-text-secondary mb-10 flex-grow leading-relaxed group-hover:text-text-primary transition-colors">{t(`core_services.${service.key}.description`)}</p>

                                <div className="bg-black/5 dark:bg-white/[0.03] border border-border-subtle rounded-2xl p-8 mb-10">
                                    <h4 className="text-[10px] font-bold text-text-primary uppercase tracking-[0.2em] mb-6 opacity-60 font-mono">{t('core_services.what_you_get')}</h4>
                                    <ul className="space-y-4">
                                        {[0, 1, 2, 3, 4].map((i) => (
                                            <li key={i} className="flex items-start gap-4 text-sm text-text-secondary">
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-purple mt-2 shrink-0 shadow-[0_0_8px_rgba(108,99,255,0.5)]" />
                                                {t(`core_services.${service.key}.deliverables.${i}`)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-auto space-y-6">
                                    <Link href="/contact" className="w-full block">
                                        <Button variant="outline" className="w-full h-14 border-border-subtle hover:bg-black/5 dark:hover:bg-white/5 text-sm uppercase tracking-widest text-text-primary">{t('core_services.cta_quote')}</Button>
                                    </Link>
                                    <Link href="/contact" className="block text-center text-sm font-bold text-text-secondary hover:text-brand-purple transition-colors uppercase tracking-widest">
                                        {t('core_services.cta_discuss')}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who It's For Section */}
            <section className="py-24 md:py-40 bg-bg-primary border-t border-border-subtle relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-mint/5 blur-[150px] rounded-full -z-0" />

                <div className="container-custom relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-16 text-text-primary tracking-tight">{t('who_i_work_with.title')}</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
                            <div className="glass rounded-3xl p-10 border-border-subtle dark:hover:bg-white/[0.05] hover:bg-black/[0.02] transition-all">
                                <h3 className="text-2xl font-bold mb-4 text-brand-purple">{t('who_i_work_with.service_business.title')}</h3>
                                <p className="text-text-secondary text-lg leading-relaxed">{t('who_i_work_with.service_business.desc')}</p>
                            </div>
                            <div className="glass rounded-3xl p-10 border-border-subtle dark:hover:bg-white/[0.05] hover:bg-black/[0.02] transition-all">
                                <h3 className="text-2xl font-bold mb-4 text-brand-mint">{t('who_i_work_with.startups.title')}</h3>
                                <p className="text-text-secondary text-lg leading-relaxed">{t('who_i_work_with.startups.desc')}</p>
                            </div>
                            <div className="glass rounded-3xl p-10 border-border-subtle dark:hover:bg-white/[0.05] hover:bg-black/[0.02] transition-all">
                                <h3 className="text-2xl font-bold mb-4 text-brand-cyan">{t('who_i_work_with.optimizers.title')}</h3>
                                <p className="text-text-secondary text-lg leading-relaxed">{t('who_i_work_with.optimizers.desc')}</p>
                            </div>
                            <div className="glass rounded-3xl p-10 border-border-subtle dark:hover:bg-white/[0.05] hover:bg-black/[0.02] transition-all">
                                <h3 className="text-2xl font-bold mb-4 text-purple-400">{t('who_i_work_with.growth_seekers.title')}</h3>
                                <p className="text-text-secondary text-lg leading-relaxed">{t('who_i_work_with.growth_seekers.desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <FinalCTA
                title={t('final_cta.title')}
                description={
                    <div className="space-y-6">
                        <p>{t('final_cta.description')}</p>
                        <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto italic font-medium">
                            {t('final_cta.disclaimer')}
                        </p>
                    </div>
                }
                buttonText={t('final_cta.button')}
            />
        </>
    );
}
