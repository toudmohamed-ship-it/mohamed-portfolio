import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { SERVICE_PAGES } from "@/lib/services";

// Contextual link from an article to the service it supports (blog = supporting content, service page = core page).
const POST_TO_SERVICE: Record<string, string> = {
    "technical-seo-checklist-2026": "technical-seo-audit",
    "technical-seo-audit-checklist-lead-gen": "technical-seo-audit",
    "why-websites-fail": "technical-seo-audit",
    "local-seo-guide-businesses": "local-seo",
    "ga4-event-tracking": "ga4-tracking",
};

export default async function ServiceBridge({ postSlug, locale }: { postSlug: string; locale: string }) {
    const slug = POST_TO_SERVICE[postSlug];
    const page = SERVICE_PAGES.find((p) => p.slug === slug);
    if (!page) return null;

    const t = await getTranslations({ locale, namespace: "ServicePages" });
    const lead = t(`${slug}.lead`);

    return (
        <aside data-tone="white" className="bg-sage border border-sage-mid rounded-[20px] p-6 md:p-7 flex flex-col gap-3">
            <p className="m-0 font-mono text-xs text-forest">{t("ui.bridge_label")}</p>
            <p className="m-0 text-xl font-semibold leading-snug">{t(`${slug}.title`)}</p>
            <p className="m-0 text-[16px] text-ink-soft">{lead}</p>
            <Link href={`/services/${slug}`} className="btn self-start mt-1 font-medium no-underline">
                {t("ui.learn_more")} <span className="arrow" aria-hidden="true">→</span>
            </Link>
        </aside>
    );
}
