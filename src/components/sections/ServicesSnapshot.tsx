"use client";

import { Link } from "@/i18n/routing";
import { Search, BarChart3, Settings, Layout, ArrowRight, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import { useTranslations } from 'next-intl';

export default function ServicesSnapshot() {
    const t = useTranslations('HomePage.ServicesSnapshot');

    const services = [
        {
            icon: Search,
            key: "tech_seo"
        },
        {
            icon: BarChart3,
            key: "analytics"
        },
        {
            icon: MapPin,
            key: "local_seo"
        },
        {
            icon: Layout,
            key: "web_opt"
        },
    ];

    return (
        <section className="py-20 md:py-32 bg-navy-50">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4">
                            {t('title')}
                        </h2>
                        <p className="text-navy-600">
                            {t('description')}
                        </p>
                    </div>
                    <Link href="/services">
                        <Button variant="outline">
                            {t('cta')}
                            <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <Link
                            key={index}
                            href={`/services#${service.key}`}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group block"
                        >
                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-brand-purple mb-6 group-hover:bg-brand-purple group-hover:text-white transition-colors">
                                <service.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-navy-900 mb-3">
                                {t(`services.${service.key}.title`)}
                            </h3>
                            <p className="text-sm text-navy-600 leading-relaxed">
                                {t(`services.${service.key}.description`)}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
