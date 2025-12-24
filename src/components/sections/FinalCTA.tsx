"use client";

import { Link } from "@/i18n/routing";
import Button from "@/components/ui/Button";
import { useTranslations } from 'next-intl';
import { motion } from "framer-motion";

interface FinalCTAProps {
    title?: string;
    description?: React.ReactNode;
    buttonText?: string;
}

export default function FinalCTA({
    title,
    description,
    buttonText
}: FinalCTAProps) {
    const t = useTranslations('HomePage.FinalCTA');

    const contentTitle = title || t('title');
    const contentDescription = description || (
        <>
            {t.rich('description', {
                br: () => <br className="hidden md:block" />
            })}
        </>
    );
    const contentButtonText = buttonText || t('button');

    return (
        <section className="py-32 md:py-48 bg-bg-primary text-text-primary text-center relative overflow-hidden">
            {/* Mesh Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[150%] bg-[radial-gradient(circle_at_50%_40%,rgba(108,99,255,0.1),transparent_60%)] -z-0" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-mint/30 to-transparent" />

            <div className="container-custom relative z-10 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8 text-text-primary tracking-tight leading-[1.1]">
                        {contentTitle}
                    </h2>
                    <div className="text-xl md:text-2xl text-text-secondary mb-12 leading-relaxed max-w-2xl mx-auto">
                        {contentDescription}
                    </div>

                    <Link href="/contact" className="relative group inline-block">
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple to-brand-mint rounded-full blur opacity-20 dark:opacity-40 group-hover:opacity-100 transition duration-700" />
                        <Button variant="primary" size="lg" className="relative bg-brand-purple text-white hover:bg-brand-purple/90 text-xl px-12 py-5 h-auto font-black rounded-full transition-all duration-300 transform group-hover:scale-105 active:scale-95 shadow-2xl">
                            {contentButtonText}
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Background Decorative Grid/Shapes */}
            <div className="absolute inset-x-0 bottom-0 h-64 bg-grid-white/[0.02] [mask-image:linear-gradient(to_top,black,transparent)] pointer-events-none" />
        </section>
    );
}
