"use client";

import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import FinalCTA from "@/components/sections/FinalCTA";
import { Search, Globe, MapPin, BarChart2, Code2, LayoutDashboard, Database, Target, LineChart } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function ServicesPage() {
    const t = useTranslations('ServicesPage');

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
            <section className="py-20 bg-white border-b border-navy-100">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-serif font-bold text-navy-900 mb-4">{t('how_it_works.title')}</h2>
                        <p className="text-navy-600">{t('how_it_works.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-navy-50 rounded-2xl p-8 border border-navy-100 relative group hover:shadow-lg transition-all">
                            <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-serif font-bold text-navy-900 leading-none pointer-events-none">1</div>
                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-brand-purple mb-6 shadow-sm">
                                <Database size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-navy-900 mb-4 relative z-10">{t('how_it_works.step1_title')}</h3>
                            <p className="text-navy-600 relative z-10">
                                {t('how_it_works.step1_desc')}
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-navy-50 rounded-2xl p-8 border border-navy-100 relative group hover:shadow-lg transition-all">
                            <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-serif font-bold text-navy-900 leading-none pointer-events-none">2</div>
                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-brand-purple mb-6 shadow-sm">
                                <Target size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-navy-900 mb-4 relative z-10">{t('how_it_works.step2_title')}</h3>
                            <p className="text-navy-600 relative z-10">
                                {t('how_it_works.step2_desc')}
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-navy-50 rounded-2xl p-8 border border-navy-100 relative group hover:shadow-lg transition-all">
                            <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-serif font-bold text-navy-900 leading-none pointer-events-none">3</div>
                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-brand-purple mb-6 shadow-sm">
                                <LineChart size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-navy-900 mb-4 relative z-10">{t('how_it_works.step3_title')}</h3>
                            <p className="text-navy-600 relative z-10">
                                {t('how_it_works.step3_desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Services Section */}
            <section className="py-20 md:py-32 bg-navy-50">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-serif font-bold text-navy-900 mb-4">{t('core_services.title')}</h2>
                        <p className="text-navy-600 font-medium">{t('core_services.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {servicesData.map((service, index) => (
                            <div key={index} className="flex flex-col h-full bg-white border border-navy-100 rounded-2xl p-8 hover:shadow-xl hover:border-brand-purple/20 transition-all duration-300">
                                <div className="w-14 h-14 bg-navy-50 rounded-xl flex items-center justify-center text-brand-purple mb-6">
                                    <service.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-navy-900 mb-2">{t(`core_services.${service.key}.title`)}</h3>
                                <p className="text-sm font-medium text-brand-purple mb-4">{t(`core_services.${service.key}.bestFor`)}</p>
                                <p className="text-navy-600 mb-8 flex-grow leading-relaxed">{t(`core_services.${service.key}.description`)}</p>

                                <div className="bg-navy-50 rounded-xl p-6 mb-8">
                                    <h4 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4">{t('core_services.what_you_get')}</h4>
                                    <ul className="space-y-3">
                                        {[0, 1, 2, 3, 4].map((i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-purple mt-1.5 shrink-0" />
                                                {t(`core_services.${service.key}.deliverables.${i}`)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-auto space-y-4">
                                    <Link href="/contact" className="w-full block">
                                        <Button variant="outline" className="w-full">{t('core_services.cta_quote')}</Button>
                                    </Link>
                                    <Link href="/contact" className="block text-center text-sm font-medium text-navy-500 hover:text-brand-purple transition-colors">
                                        {t('core_services.cta_discuss')}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who It's For Section */}
            <section className="py-20 bg-navy-900 text-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-white">{t('who_i_work_with.title')}</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                                <h3 className="text-xl font-bold mb-2 text-brand-purple-light">{t('who_i_work_with.service_business.title')}</h3>
                                <p className="text-navy-200">{t('who_i_work_with.service_business.desc')}</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                                <h3 className="text-xl font-bold mb-2 text-brand-purple-light">{t('who_i_work_with.startups.title')}</h3>
                                <p className="text-navy-200">{t('who_i_work_with.startups.desc')}</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                                <h3 className="text-xl font-bold mb-2 text-brand-purple-light">{t('who_i_work_with.optimizers.title')}</h3>
                                <p className="text-navy-200">{t('who_i_work_with.optimizers.desc')}</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                                <h3 className="text-xl font-bold mb-2 text-brand-purple-light">{t('who_i_work_with.growth_seekers.title')}</h3>
                                <p className="text-navy-200">{t('who_i_work_with.growth_seekers.desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-white">
                <FinalCTA
                    title={t('final_cta.title')}
                    description={
                        <div className="space-y-6">
                            <p>{t('final_cta.description')}</p>
                            <p className="text-sm md:text-base text-navy-300 max-w-2xl mx-auto italic">
                                {t('final_cta.disclaimer')}
                            </p>
                        </div>
                    }
                    buttonText={t('final_cta.button')}
                />
            </section>
        </>
    );
}
