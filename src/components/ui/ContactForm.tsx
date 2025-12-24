"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { CheckCircle2, AlertCircle, Mail, Linkedin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
    const t = useTranslations("ContactForm");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/xojajakq", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                setStatus("success");
                setMessage(t('messages.success'));
                form.reset();
            } else {
                setStatus("error");
                setMessage(t('messages.error'));
            }
        } catch (error) {
            setStatus("error");
            setMessage(t('messages.generic_error'));
        }
    };

    const isSubmitting = status === "loading";

    return (
        <div className="glass p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-3xl font-serif font-bold text-text-primary mb-3 tracking-tight">{t('title')}</h2>
                <p className="text-text-secondary mb-10 text-lg leading-relaxed">{t('subtitle')}</p>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label htmlFor="name" className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] ml-2">
                                {t('labels.name')}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full bg-black/5 dark:bg-white/[0.03] border border-border-subtle rounded-2xl px-6 py-4 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10 transition-all font-medium"
                                placeholder={t('placeholders.name')}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="space-y-3">
                            <label htmlFor="email" className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] ml-2">
                                {t('labels.email')}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full bg-black/5 dark:bg-white/[0.03] border border-border-subtle rounded-2xl px-6 py-4 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10 transition-all font-medium"
                                placeholder={t('placeholders.email')}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label htmlFor="service" className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] ml-2">
                            {t('labels.service')}
                        </label>
                        <div className="relative">
                            <select
                                id="service"
                                name="service"
                                defaultValue=""
                                className="w-full bg-black/5 dark:bg-white/[0.03] border border-border-subtle rounded-2xl px-6 py-4 text-text-primary appearance-none focus:outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10 transition-all font-medium cursor-pointer"
                                disabled={isSubmitting}
                            >
                                <option value="" disabled className="bg-bg-primary">
                                    {t('placeholders.service')}
                                </option>
                                <option value="seo" className="bg-bg-primary">{t('services.seo')}</option>
                                <option value="marketing" className="bg-bg-primary">{t('services.marketing')}</option>
                                <option value="analytics" className="bg-bg-primary">{t('services.analytics')}</option>
                                <option value="web" className="bg-bg-primary">{t('services.web')}</option>
                                <option value="other" className="bg-bg-primary">{t('services.other')}</option>
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label htmlFor="message" className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] ml-2">
                            {t('labels.message')}
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            className="w-full bg-black/5 dark:bg-white/[0.03] border border-border-subtle rounded-2xl px-6 py-4 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10 transition-all min-h-[150px] font-medium resize-none"
                            placeholder={t('placeholders.message')}
                            required
                            disabled={isSubmitting}
                        ></textarea>
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full h-16 text-sm uppercase tracking-[0.2em] font-black rounded-2xl"
                        isLoading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? t('button.loading') : t('button.idle')}
                    </Button>
                </form>

                <AnimatePresence>
                    {status === "success" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="mt-8 p-6 bg-brand-mint/10 border border-brand-mint/20 rounded-2xl text-brand-mint font-bold text-center flex items-center justify-center gap-3"
                        >
                            <CheckCircle2 size={24} />
                            {message}
                        </motion.div>
                    )}

                    {status === "error" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 font-bold text-center flex items-center justify-center gap-3"
                        >
                            <AlertCircle size={24} />
                            {message}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-purple/5 blur-[100px] rounded-full pointer-events-none" />
        </div>
    );
}
