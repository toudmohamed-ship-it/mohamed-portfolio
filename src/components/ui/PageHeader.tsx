"use client";

import { motion } from "framer-motion";
import Breadcrumbs from "./Breadcrumbs";

interface PageHeaderProps {
    title: string;
    subtitle: string;
    supportingText?: string;
}

export default function PageHeader({ title, subtitle, supportingText }: PageHeaderProps) {
    return (
        <section className="pt-40 pb-24 md:pt-48 md:pb-32 bg-bg-primary relative overflow-hidden border-b border-border-subtle">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(108,99,255,0.08),transparent_70%)] -z-0" />

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto">
                    <Breadcrumbs />
                </div>
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
                            {subtitle}
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-text-primary leading-[1.1] tracking-tight">
                            {title}
                        </h1>
                    </motion.div>

                    {supportingText && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-xl md:text-2xl text-text-secondary leading-relaxed font-light"
                        >
                            {supportingText}
                        </motion.p>
                    )}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
        </section>
    );
}
