// Case studies. Copy (titles, text, results, image captions, market) lives in messages/*.json under CaseStudies.<slug>.
// No client names: screenshots are anonymized (logos, domains and faces blurred) and text stays generic.

export type ServiceAnchor = "tech_seo" | "keyword_strategy" | "local_seo" | "international_seo" | "analytics" | "wp_optimization";

export interface CaseStudy {
    slug: string;
    /** Services page sections this project relates to (internal links) */
    services: ServiceAnchor[];
    /** Blog article that goes deeper on the same topic (internal link) */
    relatedPost: string;
    /** Screenshots in display order; captions are CaseStudies.<slug>.gallery_alts.<index> */
    gallery: { src: string; alt: string }[];
    tools: string[];
    comparisonMetrics?: { label: string; before: string; after: string }[];
}

export const CASE_STUDIES: CaseStudy[] = [
    {
        slug: "global-marketplace-audit",
        services: ["tech_seo"],
        relatedPost: "technical-seo-checklist-2026",
        gallery: [
            { src: "/images/portfolio/luxury-marketplace/traffic-graph.png", alt: "Organic traffic and keyword trend, 2024 to 2025 (US data)" },
            { src: "/images/portfolio/luxury-marketplace/seo-dashboard.png", alt: "SEO dashboard: 562.8K organic traffic and 281.4K ranked keywords (US data)" },
            { src: "/images/portfolio/luxury-marketplace/gsc-performance-v2.png", alt: "Google Search Console, 16 months: 5.99M clicks and 214M impressions" },
        ],
        tools: ["Google Search Console", "Screaming Frog", "Semrush", "Schema.org"],
    },
    {
        slug: "uk-compliance-service-audit",
        services: ["local_seo", "tech_seo", "wp_optimization"],
        relatedPost: "technical-seo-audit-checklist-lead-gen",
        gallery: [
            { src: "/images/portfolio/uk-service/lighthouse-scores.webp", alt: "Lighthouse performance score of 95 on the new landing page" },
            { src: "/images/portfolio/uk-service/pagespeed-metrics.png", alt: "PageSpeed Insights scores after the fixes" },
            { src: "/images/portfolio/uk-service/organic-traffic-trend.png", alt: "Monthly organic traffic, November 2024 to April 2025" },
            { src: "/images/portfolio/uk-service/keyword-map.webp", alt: "Keyword map for the main service page: primary, secondary and question keywords" },
            { src: "/images/portfolio/uk-service/on-page-snippet.webp", alt: "On-page optimization of a blog article in Rank Math (domain hidden)" },
            { src: "/images/portfolio/uk-service/google-ads.webp", alt: "Google Ads, 23 February to 3 April 2025: 625 clicks and 45 conversions" },
        ],
        tools: ["Semrush", "Rank Math", "Google Ads", "Google Tag Manager", "Screaming Frog", "Google Search Console", "Google Business Profile"],
    },
    {
        slug: "saas-digital-launch",
        services: ["keyword_strategy", "analytics"],
        relatedPost: "keyword-research-process",
        gallery: [
            { src: "/images/portfolio/saas-launch/landing-v1.webp", alt: "First launch version of the website, light design (brand hidden)" },
            { src: "/images/portfolio/saas-launch/landing-v2.webp", alt: "Second version of the website, dark design (brand hidden)" },
            { src: "/images/portfolio/saas-launch/chat-widget.webp", alt: "Gist chat widget for lead capture (brand hidden)" },
        ],
        tools: ["Gist", "Canva", "Google Analytics", "No-code builder"],
    },
    {
        slug: "premium-medspa-seo-audit",
        services: ["tech_seo", "local_seo"],
        relatedPost: "local-seo-guide-businesses",
        gallery: [
            { src: "/images/portfolio/medspa/seo-metrics.png", alt: "SEO dashboard: 83 organic visits, 212 keywords, Authority Score 18" },
            { src: "/images/portfolio/medspa/organic-traffic-growth.png", alt: "Organic traffic trend after the technical fixes" },
            { src: "/images/portfolio/medspa/seo-tracking-sheet.png", alt: "SEO tracking sheet with new titles and meta descriptions for service pages" },
        ],
        tools: ["Yoast SEO", "Google Search Console", "Google Sheets", "WebP"],
    },
    {
        slug: "national-sports-org",
        services: ["keyword_strategy"],
        relatedPost: "keyword-research-process",
        gallery: [],
        tools: ["Keyword research", "SEO content", "On-page SEO"],
    },
    {
        slug: "law-firm-local-seo",
        services: ["local_seo"],
        relatedPost: "local-seo-guide-businesses",
        gallery: [],
        tools: ["Local Falcon", "Google Search Console", "Google Business Profile"],
    },
    {
        slug: "moroccan-b2b-seo",
        services: ["keyword_strategy"],
        relatedPost: "keyword-research-process",
        gallery: [
            { src: "/images/portfolio/moroccan-b2b-seo/search-console-3-months.webp", alt: "Google Search Console: last 3 months compared with the previous 3 months" },
        ],
        comparisonMetrics: [
            { label: "Total Clicks", before: "32", after: "74 (+131%)" },
            { label: "Impressions", before: "4.33K", after: "4.49K (+3.7%)" },
            { label: "Avg CTR", before: "0.7%", after: "1.6% (+128%)" },
            { label: "Avg Position", before: "34.2", after: "14.1 (Top 15)" },
        ],
        tools: ["Google Search Console", "Google Keyword Planner", "Semrush", "Schema markup"],
    },
];
