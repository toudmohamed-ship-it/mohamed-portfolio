"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from 'next-intl';

import { CASE_STUDIES } from "@/lib/data";

import { motion } from "framer-motion";
import clsx from "clsx";

export default function CaseStudyPreview() {
    const t = useTranslations('HomePage.CaseStudyPreview');
    const tStudies = useTranslations('CaseStudies');

    return (
        <section className="py-24 md:py-40 bg-bg-primary relative">
            <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-brand-mint/5 blur-[120px] rounded-full" />

            <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-mint text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
                        >
                            Recent Work
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-text-primary mb-6 leading-tight">
                            {t('title')}
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
                    {CASE_STUDIES.slice(0, 3).map((study, index) => {
                        const tags = tStudies(`${study.slug}.tags`).split(' • ');

                        return (
                            <motion.div
                                key={study.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={`/portfolio/${study.slug}`}
                                    className="group block"
                                >
                                    <div className="relative overflow-hidden rounded-[2rem] mb-8 border border-border-subtle bg-bg-secondary aspect-[4/3]">
                                        {/* Image Container with Hover Effect */}
                                        <div className={clsx(
                                            "w-full h-full transition-all duration-700 group-hover:scale-110",
                                            study.imageColor
                                        )}>
                                            <div className="absolute inset-0 bg-black/10 dark:bg-navy-950/20 group-hover:bg-transparent transition-colors duration-700" />
                                            <div className="w-full h-full flex items-center justify-center p-12">
                                                <span className="font-serif text-3xl md:text-4xl font-bold text-white text-center drop-shadow-2xl">
                                                    {tStudies(`${study.slug}.client`)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Overlay Info */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>

                                    <div className="space-y-4 px-2">
                                        <div className="flex flex-wrap gap-3">
                                            {tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 text-[10px] font-bold text-brand-mint bg-brand-mint/5 border border-brand-mint/10 rounded-full uppercase tracking-wider"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-2xl font-bold text-text-primary group-hover:text-brand-mint transition-colors tracking-tight">
                                            {tStudies(`${study.slug}.title`)}
                                        </h3>
                                        <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                                            {tStudies(`${study.slug}.summary`)}
                                        </p>
                                        <div className="pt-4 flex items-center gap-2 text-text-primary font-bold text-xs uppercase tracking-widest group-hover:text-brand-mint transition-colors">
                                            {t('view_case')} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="text-center">
                    <Link href="/portfolio">
                        <Button variant="outline" size="lg" className="border-border-subtle hover:bg-black/5 dark:hover:bg-white/5 px-12 py-4 h-auto text-base font-bold rounded-full text-text-primary">
                            {t('view_all')}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
