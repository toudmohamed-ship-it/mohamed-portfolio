export const CASE_STUDIES = [
    {
        slug: "global-marketplace-audit",
        imageColor: "bg-blue-900",
        results: ["", "", "", ""],
        gallery: [
            {
                src: "/images/portfolio/luxury-marketplace/traffic-graph.png",
                alt: "Organic traffic growth trend showing steady increase over 6 months (US Data)"
            },
            {
                src: "/images/portfolio/luxury-marketplace/seo-dashboard.png",
                alt: "SEO dashboard showing 562.8K organic traffic and 42 AI visibility score (US Data)"
            },
            {
                src: "/images/portfolio/luxury-marketplace/gsc-performance-v2.png",
                alt: "Google Search Console performance: 5.99M Total Clicks and 214M Impressions over 16 months"
            }
        ],
        tools: ["Semrush", "Screaming Frog", "Schema.org"], // Python removed as it wasn't in list; Schema.org added
    },
    {
        slug: "uk-compliance-service-audit",
        imageColor: "bg-green-800",
        results: ["", "", ""],
        gallery: [
            {
                src: "/images/portfolio/uk-service/performance-score.png",
                alt: "Google Lighthouse Performance Score of 95/100"
            },
            {
                src: "/images/portfolio/uk-service/pagespeed-metrics.png",
                alt: "PageSpeed Insights Breakdown confirming 90+ scores"
            },
            {
                src: "/images/portfolio/uk-service/organic-traffic-trend.png",
                alt: "Organic Traffic Trend showing consistent growth"
            }
        ],
        tools: ["Google Tag Manager", "Google Ads", "Screaming Frog", "Google Search Console"],
    },
    {
        slug: "saas-digital-launch",
        imageColor: "bg-orange-800",
        results: ["", "", ""],
        gallery: [
            {
                src: "/images/portfolio/saas-launch/landing-page-light.jpg",
                alt: "Initial Launch Version - Clean Light Mode Design"
            },
            {
                src: "/images/portfolio/saas-launch/landing-page-dark.png",
                alt: "High-Converting Dark Mode Iteration"
            },
            {
                src: "/images/portfolio/saas-launch/gist-chatbot.png",
                alt: "Gist Chatbot Integration for Automated Lead Capture"
            }
        ],
        tools: ["Gist", "Canva", "Google Analytics", "No-Code Builder"],
    },
    {
        slug: "premium-medspa-seo-audit",
        imageColor: "bg-purple-800",
        results: ["", "", "", ""],
        gallery: [
            {
                src: "/images/portfolio/medspa/seo-metrics.png",
                alt: "SEO Dashboard showing 83 organic traffic visits, 212 keywords, and Authority Score of 18"
            },
            {
                src: "/images/portfolio/medspa/organic-traffic-growth.png",
                alt: "Organic traffic trend showing recovery and stabilization after technical fixes"
            },
            {
                src: "/images/portfolio/medspa/seo-tracking-sheet.png",
                alt: "SEO Implementation Tracking Sheet showing optimized titles and meta descriptions for service pages"
            }
        ],
        tools: ["Yoast SEO", "Google Search Console", "SEO Audit Tools", "Google Sheets"],
    },
    {
        slug: "national-sports-org",
        imageColor: "bg-red-900",
        results: ["", "", ""],
        gallery: [],
    },
    {
        slug: "medical-spa-seo",
        imageColor: "bg-cyan-800",
        results: ["", "", ""],
        gallery: [],
    },
    {
        slug: "law-firm-local-seo",
        imageColor: "bg-slate-800",
        results: ["", "", ""],
        gallery: [],
    },
    {
        slug: "moroccan-b2b-seo",
        imageColor: "bg-teal-900",
        results: ["", "", ""],
        comparisonMetrics: [
            { label: "Total Clicks", before: "32", after: "74 (+131%)" },
            { label: "Impressions", before: "4.33K", after: "4.49K (+3.7%)" },
            { label: "Avg CTR", before: "0.7%", after: "1.6% (+128%)" },
            { label: "Avg Position", before: "34.2", after: "14.1 (Top 15)" },
        ],
        tools: ["Google Search Console", "On-Page SEO", "Keyword Research"],
    },


];
