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
        <section className="relative overflow-hidden py-16 md:py-20 lg:py-28">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-purple-50 to-transparent opacity-50" />
            <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-96 bg-gradient-to-t from-navy-50 to-transparent opacity-30" />

            <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy-900 leading-tight">
                        {t('role')}
                    </h1>

                    <h2 className="text-xl md:text-2xl font-medium text-navy-800">
                        {t('subheadline')}
                    </h2>

                    <p className="text-lg text-navy-600 max-w-xl leading-relaxed">
                        {t('description')}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <Link href="/contact">
                            <Button size="lg" className="group">
                                {t('cta_contact')}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                        <Link href="/portfolio">
                            <Button variant="outline" size="lg">
                                {t('cta_projects')}
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Image / Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative text-center lg:text-right flex justify-center lg:justify-end"
                >
                    <div className="relative inline-block rounded-2xl overflow-hidden shadow-2xl bg-navy-100 border-[8px] border-white max-w-[400px]">
                        <Image
                            src="/images/profile.png"
                            alt="Mohamed Toudghi - SEO & Digital Marketing Specialist"
                            width={450}
                            height={550}
                            priority
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
