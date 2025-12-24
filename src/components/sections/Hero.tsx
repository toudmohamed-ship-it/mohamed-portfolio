"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function Hero() {
    const t = useTranslations('HomePage.hero');

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden py-20 lg:py-32 bg-bg-primary">
            {/* Mesh Gradients & Abstract Shapes */}
            <div className="absolute top-0 right-0 -z-10 w-[60%] h-[70%] bg-[radial-gradient(circle_at_50%_50%,rgba(108,99,255,0.25),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(108,99,255,0.15),transparent_70%)] blur-3xl opacity-60" />
            <div className="absolute bottom-0 left-0 -z-10 w-[60%] h-[70%] bg-[radial-gradient(circle_at_30%_70%,rgba(0,245,160,0.2),transparent_70%)] dark:bg-[radial-gradient(circle_at_30%_70%,rgba(0,245,160,0.1),transparent_70%)] blur-3xl opacity-40" />

            {/* Animated Decorative Elements */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-10 w-64 h-64 bg-brand-purple/5 rounded-full blur-3xl -z-10"
            />
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    rotate: [0, -20, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-mint/5 rounded-full blur-3xl -z-10"
            />

            <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-7 space-y-8 relative z-10"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-border-subtle text-brand-mint text-xs font-bold tracking-widest uppercase"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-mint opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-mint"></span>
                        </span>
                        {t('available')}
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1] tracking-tight text-text-primary">
                        {t('role').split(' ').map((word, i) => (
                            <span key={i} className={i === 0 ? "block" : word.includes("SEO") ? "text-gradient-mint" : ""}>
                                {word}{' '}
                            </span>
                        ))}
                    </h1>

                    <h2 className="text-2xl md:text-3xl font-medium text-text-secondary max-w-2xl leading-relaxed">
                        {t('subheadline')}
                    </h2>

                    <p className="text-lg md:text-xl text-text-secondary/80 max-w-xl leading-relaxed">
                        {t('description')}
                    </p>

                    <div className="flex flex-wrap gap-6 pt-4">
                        <Link href="/contact" className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-purple to-brand-mint rounded-full blur opacity-20 dark:opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                            <Button size="lg" className="relative bg-brand-purple hover:bg-brand-purple/90 border-none px-10 py-4 h-auto text-base text-white">
                                {t('cta_contact')}
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                            </Button>
                        </Link>
                        <Link href="/portfolio">
                            <Button variant="outline" size="lg" className="px-10 py-4 h-auto text-base">
                                {t('cta_projects')}
                            </Button>
                        </Link>
                    </div>

                </motion.div>

                {/* Image / Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 30 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="lg:col-span-5 relative flex justify-center lg:justify-end"
                >
                    <div className="relative group">
                        {/* Glowing Backgrounds */}
                        <div className="absolute -inset-4 bg-brand-purple/20 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[conic-gradient(from_0deg,transparent,rgba(108,99,255,0.2),transparent)] animate-[spin_10s_linear_infinite] -z-10" />

                        <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-border-subtle shadow-2xl bg-bg-secondary transition-transform duration-700 group-hover:scale-[1.02] group-hover:-rotate-1">
                            <Image
                                src="/images/profile.png"
                                alt="Mohamed Toudghi - SEO & Digital Marketing Specialist"
                                width={400}
                                height={500}
                                priority
                                className="w-full h-full object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent dark:from-bg-primary dark:opacity-60" />
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-6 -right-6 lg:-right-12 glass p-4 rounded-2xl shadow-2xl z-20 hidden md:block whitespace-nowrap"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-mint/20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <div className="w-4 h-4 bg-brand-mint rounded-sm rotate-45" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xs text-text-secondary font-bold uppercase tracking-tight">Growth Expert</p>
                                    <p className="text-sm font-bold text-text-primary leading-none mt-0.5">ROI Driven</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
