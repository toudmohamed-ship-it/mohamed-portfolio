"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

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

    return (
        <div className="bg-white border border-navy-100 p-8 md:p-10 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-serif font-bold text-navy-900 mb-2">{t('title')}</h2>
            <p className="text-navy-500 mb-8">{t('subtitle')}</p>

            {status === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <p className="text-green-800 text-sm">{message}</p>
                </div>
            )}

            {status === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
                    <p className="text-red-800 text-sm">{message}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-semibold text-navy-700">
                            {t('labels.name')}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-4 py-3 rounded-lg bg-navy-50 border border-navy-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                            placeholder={t('placeholders.name')}
                            required
                            disabled={status === "loading"}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-semibold text-navy-700">
                            {t('labels.email')}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-3 rounded-lg bg-navy-50 border border-navy-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                            placeholder={t('placeholders.email')}
                            required
                            disabled={status === "loading"}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-semibold text-navy-700">
                        {t('labels.service')}
                    </label>
                    <select
                        id="service"
                        name="service"
                        defaultValue=""
                        className="w-full px-4 py-3 rounded-lg bg-navy-50 border border-navy-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none transition-all appearance-none"
                        disabled={status === "loading"}
                    >
                        <option value="" disabled>
                            {t('placeholders.service')}
                        </option>
                        <option value="seo">{t('services.seo')}</option>
                        <option value="marketing">{t('services.marketing')}</option>
                        <option value="analytics">{t('services.analytics')}</option>
                        <option value="web">{t('services.web')}</option>
                        <option value="other">{t('services.other')}</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-navy-700">
                        {t('labels.message')}
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        className="w-full px-4 py-3 rounded-lg bg-navy-50 border border-navy-200 focus:border-brand-purple focus:ring-2 focus:ring-purple-100 outline-none transition-all min-h-[150px]"
                        placeholder={t('placeholders.message')}
                        required
                        disabled={status === "loading"}
                    ></textarea>
                </div>

                <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={status === "loading"}
                >
                    {status === "loading" ? t('button.loading') : t('button.idle')}
                </Button>
            </form>
        </div>
    );
}
