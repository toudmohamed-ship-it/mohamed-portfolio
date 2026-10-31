import type { ServiceAnchor } from "./data";

// The three main services get their own page (/services/<slug>). Copy lives in messages/*.json under ServicePages.<slug>;
// deliverables come from ServicesPage.core_services.<key> so the hub and the detail page never disagree.
export interface Entity {
    name: string;
    /** Wikipedia URL that identifies the entity without ambiguity */
    sameAs: string;
}

export interface ServicePage {
    slug: string;
    key: ServiceAnchor;
    /** Case studies shown as proof, most relevant first */
    caseStudies: string[];
    relatedPost: string;
    /** Main topic of the page (schema "about") */
    about: Entity;
    /** Other entities the page explains (schema "mentions") */
    mentions: Entity[];
    /** Industry pages: slug of the main service page they belong to (breadcrumb and links from that page) */
    parent?: string;
}

const wiki = (name: string, page: string): Entity => ({ name, sameAs: `https://en.wikipedia.org/wiki/${page}` });

export const SERVICE_PAGES: ServicePage[] = [
    {
        slug: "technical-seo-audit",
        key: "tech_seo",
        caseStudies: ["global-marketplace-audit", "premium-medspa-seo-audit", "uk-compliance-service-audit"],
        relatedPost: "technical-seo-audit-checklist-lead-gen",
        about: wiki("Search engine optimization", "Search_engine_optimization"),
        mentions: [
            wiki("Googlebot", "Googlebot"),
            wiki("Google Search Console", "Google_Search_Console"),
            wiki("Web performance", "Web_performance"),
            wiki("Largest Contentful Paint", "Largest_Contentful_Paint"),
            wiki("robots.txt", "Robots.txt"),
            wiki("Canonical link element", "Canonical_link_element"),
            wiki("Sitemaps", "Sitemaps"),
            wiki("Schema.org", "Schema.org"),
        ],
    },
    {
        slug: "local-seo",
        key: "local_seo",
        caseStudies: ["law-firm-local-seo", "uk-compliance-service-audit", "premium-medspa-seo-audit"],
        relatedPost: "local-seo-guide-businesses",
        about: wiki("Local search engine optimisation", "Local_search_engine_optimisation"),
        mentions: [
            wiki("Google Business Profile", "Google_Business_Profile"),
            wiki("Google Maps", "Google_Maps"),
            wiki("Google Search Console", "Google_Search_Console"),
            wiki("Google Analytics", "Google_Analytics"),
        ],
    },
    {
        slug: "ga4-tracking",
        key: "analytics",
        caseStudies: ["uk-compliance-service-audit", "saas-digital-launch", "moroccan-b2b-seo"],
        relatedPost: "ga4-event-tracking",
        about: wiki("Google Analytics", "Google_Analytics"),
        mentions: [
            wiki("Google Tag Manager", "Google_Tag_Manager"),
            wiki("Looker Studio", "Looker_Studio"),
            wiki("Google Ads", "Google_Ads"),
            wiki("Conversion marketing", "Conversion_marketing"),
        ],
    },
    // Industry pages come after the three main services (ServicesSnapshot and serviceHref rely on that order)
    {
        slug: "seo-for-law-firms",
        key: "local_seo",
        parent: "local-seo",
        caseStudies: ["law-firm-local-seo", "uk-compliance-service-audit", "premium-medspa-seo-audit"],
        relatedPost: "local-seo-guide-businesses",
        about: wiki("Local search engine optimisation", "Local_search_engine_optimisation"),
        mentions: [
            wiki("Law firm", "Law_firm"),
            wiki("Google Business Profile", "Google_Business_Profile"),
            wiki("Google Maps", "Google_Maps"),
            wiki("Schema.org", "Schema.org"),
            wiki("Google Ads", "Google_Ads"),
        ],
    },
];

/** Industry pages that belong to a main service page */
export function childPages(slug: string) {
    return SERVICE_PAGES.filter((p) => p.parent === slug);
}

/** Link for a services-hub anchor: its own page when it has one, otherwise the section on /services */
export function serviceHref(key: ServiceAnchor) {
    const page = SERVICE_PAGES.find((p) => p.key === key);
    return page ? `/services/${page.slug}` : `/services#${key}`;
}
