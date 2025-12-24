"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from 'next-intl';
import { motion } from "framer-motion";

export default function AboutPreview() {
    const t = useTranslations('HomePage.AboutPreview');

    return (
        <section className="py-24 md:py-40 bg-bg-primary">
            <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="order-2 md:order-1 relative"
                >
                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl max-w-md mx-auto md:mx-0 border border-border-subtle group">
                        <Image
                            src="/images/profile.png"
                            alt="Mohamed Toudghi"
                            width={500}
                            height={600}
                            sizes="(max-width: 768px) 100vw, 500px"
                            className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent dark:from-bg-primary dark:opacity-60" />
                    </div>
                    {/* Premium Decor Elements */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-purple/10 rounded-full blur-[80px] -z-10" />
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-mint/10 rounded-full blur-[60px] -z-10" />

                    {/* Floating Info Card */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="absolute top-1/2 -right-12 md:-right-8 translate-y-[-50%] glass p-6 rounded-2xl hidden lg:block shadow-2xl"
                    >
                        <p className="text-brand-mint font-bold text-2xl uppercase tracking-tighter leading-none">Global</p>
                        <p className="text-text-primary text-xs font-bold uppercase tracking-widest mt-1">Partnerships</p>
                    </motion.div>
                </motion.div>

                <div className="order-1 md:order-2 space-y-8">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-[10px] font-bold tracking-[0.2em] uppercase"
                        >
                            The Journey
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-text-primary leading-tight">
                            {t('title')}
                        </h2>
                    </div>
                    <div className="space-y-6 text-lg text-text-secondary leading-relaxed">
                        <p>
                            {t('description')}
                        </p>
                    </div>

                    <div className="pt-6">
                        <Link href="/about">
                            <Button variant="outline" className="group border-border-subtle hover:bg-black/5 dark:hover:bg-white/5 px-10 py-4 h-auto text-base font-bold rounded-full text-text-primary">
                                {t('cta')}
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
