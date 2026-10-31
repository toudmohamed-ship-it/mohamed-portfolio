import type { ServiceAnchor } from "./data";

// The three main services get their own page (/services/<slug>). Copy lives in messages/*.json under ServicePages.<slug>;
// deliverables come from ServicesPage.core_services.<key> so the hub and the detail page never disagree.
export interface ServicePage {
    slug: string;
    key: ServiceAnchor;
    /** Case studies shown as proof, most relevant first */
    caseStudies: string[];
    relatedPost: string;
}

export const SERVICE_PAGES: ServicePage[] = [
    {
        slug: "technical-seo-audit",
        key: "tech_seo",
        caseStudies: ["global-marketplace-audit", "premium-medspa-seo-audit", "uk-compliance-service-audit"],
        relatedPost: "technical-seo-audit-checklist-lead-gen",
    },
    {
        slug: "local-seo",
        key: "local_seo",
        caseStudies: ["law-firm-local-seo", "uk-compliance-service-audit", "premium-medspa-seo-audit"],
        relatedPost: "local-seo-guide-businesses",
    },
    {
        slug: "ga4-tracking",
        key: "analytics",
        caseStudies: ["uk-compliance-service-audit", "saas-digital-launch", "moroccan-b2b-seo"],
        relatedPost: "ga4-event-tracking",
    },
];

/** Link for a services-hub anchor: its own page when it has one, otherwise the section on /services */
export function serviceHref(key: ServiceAnchor) {
    const page = SERVICE_PAGES.find((p) => p.key === key);
    return page ? `/services/${page.slug}` : `/services#${key}`;
}
