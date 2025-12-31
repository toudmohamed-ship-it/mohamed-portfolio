"use client";

import { Link } from "@/i18n/routing";
import { Search, BarChart3, Settings, Layout, ArrowRight, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import { useTranslations } from 'next-intl';
import { motion } from "framer-motion";
import clsx from "clsx";

export default function ServicesSnapshot() {
    const t = useTranslations('HomePage.ServicesSnapshot');

    const services = [
        {
            icon: Search,
            key: "tech_seo",
            color: "text-brand-purple"
        },
        {
            icon: BarChart3,
            key: "analytics",
            color: "text-brand-mint"
        },
        {
            icon: MapPin,
            key: "local_seo",
            color: "text-brand-cyan"
        },
        {
            icon: Layout,
            key: "web_opt",
            color: "text-purple-400"
        },
    ];

    return (
        <section className="py-24 md:py-40 bg-bg-primary relative overflow-hidden">
            <div className="absolute top-1/2 left-0 -z-10 w-96 h-96 bg-brand-purple/5 blur-[120px] rounded-full" />

            <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
                        >
                            Specialized Expertise
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-text-primary mb-6 leading-tight">
                            {t('title')}
                        </h2>
                        <p className="text-lg text-text-secondary leading-relaxed">
                            {t('description')}
                        </p>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div
                                className="glass p-10 rounded-[2rem] border-border-subtle hover:bg-black/[0.02] dark:hover:bg-white/[0.05] hover:-translate-y-2 transition-all duration-500 group block relative overflow-hidden h-full flex flex-col"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-purple/5 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className={clsx(
                                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110",
                                    "bg-black/5 dark:bg-white/5 border border-border-subtle group-hover:bg-brand-purple group-hover:border-brand-purple shadow-sm",
                                    service.color
                                )}>
                                    <service.icon size={28} className="transition-colors group-hover:text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-text-primary mb-4 tracking-tight">
                                    {t(`services.${service.key}.title`)}
                                </h3>
                                <p className="text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors flex-grow">
                                    {t(`services.${service.key}.description`)}
                                </p>


                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
