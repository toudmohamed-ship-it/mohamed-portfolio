"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const FIELD = "w-full bg-white border border-line-strong rounded-xl px-4 py-3.5 text-ink text-base placeholder:text-[#8A928E] focus:outline-none focus:border-forest focus:ring-4 focus:ring-sage transition-colors disabled:opacity-60";
const LABEL = "text-sm font-medium text-ink";

export default function ContactForm() {
    const t = useTranslations("ContactForm");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        // Honeypot: real people never fill this hidden field
        if (data.get("_gotcha")) return;
        setStatus("loading");
        try {
            const response = await fetch("https://formspree.io/f/xojajakq", {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" },
            });
            if (response.ok) {
                setStatus("success");
                form.reset();
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const busy = status === "loading";

    return (
        <div className="bg-white border border-line rounded-[22px] p-6 md:p-9">
            <h2 className="m-0 text-2xl md:text-[28px] font-semibold">{t("title")}</h2>
            <p className="m-0 mt-2 text-muted">{t("subtitle")}</p>

            <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5" noValidate={false}>
                <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className={LABEL}>{t("labels.name")}</label>
                        <input id="name" name="name" type="text" autoComplete="name" required disabled={busy} className={FIELD} placeholder={t("placeholders.name")} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className={LABEL}>{t("labels.email")}</label>
                        <input id="email" name="email" type="email" autoComplete="email" required disabled={busy} className={FIELD} placeholder={t("placeholders.email")} dir="ltr" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="website" className={LABEL}>{t("labels.website")} <span className="text-muted font-normal">{t("optional")}</span></label>
                    <input id="website" name="website" type="url" inputMode="url" disabled={busy} className={FIELD} placeholder="https://" dir="ltr" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="service" className={LABEL}>{t("labels.service")}</label>
                    <select id="service" name="service" defaultValue="" disabled={busy} className={`${FIELD} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%235A645F%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-no-repeat bg-[position:right_1rem_center] rtl:bg-[position:left_1rem_center]`}>
                        <option value="" disabled>{t("placeholders.service")}</option>
                        <option value="audit">{t("services.audit")}</option>
                        <option value="local">{t("services.local")}</option>
                        <option value="analytics">{t("services.analytics")}</option>
                        <option value="web">{t("services.web")}</option>
                        <option value="other">{t("services.other")}</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="message" className={LABEL}>{t("labels.message")}</label>
                    <textarea id="message" name="message" required disabled={busy} rows={5} className={`${FIELD} resize-y min-h-[140px]`} placeholder={t("placeholders.message")} />
                </div>

                {/* Honeypot (Formspree drops submissions that fill it) */}
                <div aria-hidden="true" className="sr-only">
                    <label htmlFor="_gotcha">Leave this empty</label>
                    <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <button
                    type="submit"
                    disabled={busy}
                    className="btn mt-1 inline-flex items-center justify-center gap-2 min-h-[52px] px-6 rounded-xl bg-forest text-white font-medium hover:bg-forest-deep disabled:opacity-70"
                >
                    {busy ? t("button.loading") : t("button.idle")} {!busy && <span className="arrow" aria-hidden="true">→</span>}
                </button>
                <p className="m-0 text-sm text-muted">{t("privacy")} <Link href="/privacy" className="text-forest underline underline-offset-2">{t("privacy_link")}</Link></p>

                <div aria-live="polite" className="empty:hidden">
                    {status === "success" && (
                        <p role="status" className="m-0 p-4 rounded-xl bg-sage text-forest-deep font-medium">{t("messages.success")}</p>
                    )}
                    {status === "error" && (
                        <p role="alert" className="m-0 p-4 rounded-xl bg-[#F6E3DE] text-[#7A2E1E] font-medium">{t("messages.error")}</p>
                    )}
                </div>
            </form>
        </div>
    );
}
