export const CASE_STUDIES = [
    {
        slug: "global-marketplace-audit",
        client: "Premier Luxury Marketplace",
        title: "Technical SEO Audit & Optimization for a Luxury Marketplace",
        summary: "Improved crawl efficiency, content discoverability, and technical reliability for a large-scale marketplace.",
        tags: ["Technical SEO", "Site Architecture", "Indexation"],
        imageColor: "bg-blue-900",
        challenge: "The client is a large-scale marketplace requiring robust technical SEO improvements. The focus was on metadata optimization across core pages, resolving site health issues like broken internal links, restructuring on-page hierarchy, accessible HTML, and implementing advanced schema markup to strengthen organic performance.",
        approach: "Executed a multi-phase technical audit. Phase 1 focused on metadata optimization (titles/H1 consistency). Phase 2 addressed site health by fixing 'no response' errors and implementing self-referencing canonicals on Vehicle Detail Pages. Phase 3 involved updating Schema.org markup and optimizing internal linking equity.",
        results: [
            "Organic Traffic +6% (562.8K monthly visits - US Data)",
            "Keyword Visibility +3.3% (281.4K ranked keywords - US Data)",
            "Authority Score maintained at 48 (Very Good)",
            "Improved Crawl Efficiency & Indexation Stability",
        ],
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
        client: "UK Compliance Service",
        title: "SEO & Conversion Optimization for a UK Service Business",
        summary: "Doubled conversions and achieved top 10 rankings for key service pages via targeted landing page optimization.",
        tags: ["Local SEO", "CRO", "Technical SEO"],
        imageColor: "bg-green-800",
        challenge: "A UK-based service provider in the competitive London market faced low conversions on high-traffic pages. The site suffered from technical debt, with 1,170 pages crawled showing 'no response' errors, lack of H1 tags on key pages, and duplicate meta descriptions. Mobile performance was poor (PageSpeed 66), and the business was invisible in local map packs.",
        approach: "Executed a granular 'Landlord Safety' campaign. Designed a dedicated landing page with clear trust signals, improving Mobile PageSpeed to 93. Optimized 26 core pages and 20 existing blog posts, while publishing 10 new long-tail keyword articles. Fixed 10+ critical technical issues (blocked pages, broken links) using Screaming Frog and GSC.",
        results: [
            "Conversions > doubled in Month 1 (High-traffic service page)",
            "PageSpeed: Mobile 66 → 93, Desktop 90 → 97",
            "18.3K+ Search Impressions (Avg Pos #10)",
        ],
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
        client: "SaaS Inventory Startup",
        title: "End-to-End Digital Launch for a SaaS Startup",
        summary: "Jan–May 2024: Built the digital foundation from scratch, deliverying a mobile-responsive site and automated lead workflows.",
        tags: ["SEO Strategy", "Web Design", "Marketing Automation"],
        imageColor: "bg-orange-800",
        challenge: "A new inventory management brand needed a complete digital ecosystem from the ground up. The requirement was a mobile-responsive no-code website, a robust SEO foundation (On-page + Structure), and automated lead generation channels to capture early interest.",
        approach: "Acting as the SEO & Digital Marketing Consultant, I developed a fully responsive website using a no-code builder. Implemented a comprehensive SEO strategy, structuring navigation for user intent. Integrated Gist for chatbot and email automation workflows to nurture leads. Established a multi-channel social presence on Facebook, Instagram, and LinkedIn.",
        results: [
            "Successful Launch of Mobile-Responsive Site",
            "Implemented Email Automation Workflows (Gist)",
            "Established Multi-Channel Social Presence",
        ],
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
        client: "Premium Medical Spa",
        title: "Technical SEO Audit & Local Optimization for Medical Spa",
        summary: "Resolved critical technical SEO issues blocking Google indexation and developed comprehensive local SEO strategy.",
        tags: ["Technical SEO", "Local SEO", "Site Audit"],
        imageColor: "bg-purple-800",
        challenge: "A medical spa website was experiencing poor visibility despite offering premium services. Initial investigation revealed that SEO metadata (titles & descriptions) were not appearing in the HTML source due to a plugin conflict between RankMath and Yoast SEO. Additionally, canonical tags were misconfigured—some self-referenced incorrectly, while others pointed to local development domains instead of the live site. These issues prevented Google from properly crawling, indexing, and ranking the site's service pages.",
        approach: "Conducted a comprehensive SEO audit covering technical, on-page, and local SEO factors. Built an SEO Implementation Tracking Sheet to organize all optimizations and monitor progress. Resolved the metadata visibility issue by deactivating RankMath and maintaining Yoast SEO as the single source of truth. Fixed all canonical tag errors to ensure each page properly referenced its authoritative URL. Drafted optimized titles, meta descriptions, and heading structures for service and location pages. Developed a detailed Local SEO Strategy covering on-page optimization, local citations, link building, and content strategy.",
        results: [
            "Fixed Plugin Conflict: Restored SEO metadata visibility in HTML",
            "Corrected All Canonical Tags: Proper URL signals to Google",
            "Drafted On-Page Optimizations: Titles, descriptions, headings ready for approval",
            "Developed Local SEO Roadmap: Complete strategy for sustained growth",
        ],
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
        client: "National Sports Organization",
        title: "SEO & Content Strategy for a National Sports Organization",
        summary: "Developed a structured content strategy, improved internal linking, and optimized website architecture.",
        tags: ["Content Strategy", "SEO", "Internal Linking"],
        imageColor: "bg-red-900",
        challenge: "Content was unstructured and difficult to find. Users were churning due to poor navigation and lack of clear content pathways.",
        approach: "Analyzed user search behavior to create a new content taxonomy. Implemented schema markup for events and matches and reorganized internal linking.",
        results: [
            "Improved User Engagement Time by 40%",
            "Structured Data appearance (Rich Snippets) in SERPs",
            "Better internal search functionality",
        ],
        tools: ["Semrush", "Google Trends", "Schema Markup Generator"],
    },
    {
        slug: "medical-spa-seo",
        client: "U.S.-Based Medical Spa",
        title: "SEO & Website Optimization for a U.S.-Based Medical Spa",
        summary: "Improved SEO foundations, optimized service pages, and strengthened local search visibility for a healthcare services website.",
        tags: ["Local SEO", "Content Optimization", "Technical SEO"],
        imageColor: "bg-cyan-800",
        challenge: "The medical spa was struggling to rank for local service terms and faced strong competition in the area. Service pages lacked depth and optimization.",
        approach: "Conducted a full site audit and optimized service pages with localized keywords and schema. Enhanced Google Business Profile signals and citation consistency.",
        results: [
            "Increased local organic traffic by 45%",
            "Ranked in top 3 for key local service terms",
            "Significant uplift in booked appointments via organic search",
        ],
        tools: ["Google Business Profile", "Ahrefs", "Google Analytics 4"],
    },
    {
        slug: "law-firm-local-seo",
        client: "U.S.-Based Law Firm",
        title: "Local SEO & Website Optimization for a U.S.-Based Law Firm",
        summary: "Optimized service pages, strengthened local SEO signals, and improved website structure for legal services.",
        tags: ["Local SEO", "On-Page SEO", "Website Optimization"],
        imageColor: "bg-slate-800",
        challenge: "The firm needed to establish authority in a specific practice area but had a disjointed site structure and weak local signals.",
        approach: "Restructured the website to create clear practice area silos. Optimized on-page content for local intent and built high-quality local citations.",
        results: [
            "Generated 30% more qualified leads from local search",
            "Achieved first-page rankings for 'City + Practice Area' keywords",
            "Improved domain authority and local trust signals",
        ],
        tools: ["Semrush", "Google Search Console", "BrightLocal"],
    },
    {
        slug: "moroccan-b2b-seo",
        client: "Moroccan B2B Website",
        title: "On-Page SEO Optimization for a Moroccan B2B Website",
        summary: "Improved homepage rankings, CTR, and organic clicks through targeted on-page SEO and structural optimization.",
        tags: ["On-Page SEO", "CTR Optimization", "Internal Linking"],
        imageColor: "bg-teal-900",
        challenge: "The homepage was ranking outside top positions, receiving impressions but few clicks, and underperforming in CTR despite visibility. The goal was to increase qualified organic traffic without adding new pages.",
        approach: "I improved keyword targeting within homepage content and rewrote meta titles/descriptions to align with search intent. I also improved page clarity and strengthened internal linking structure.",
        results: [
            "Clicks +130% (32 → 74) in 3 Months",
            "CTR +128% (0.7% → 1.6%)",
            "Avg Position Improved from 34.2 to 14.1",
        ],
        comparisonMetrics: [
            { label: "Total Clicks", before: "32", after: "74 (+131%)" },
            { label: "Impressions", before: "4.33K", after: "4.49K (+3.7%)" },
            { label: "Avg CTR", before: "0.7%", after: "1.6% (+128%)" },
            { label: "Avg Position", before: "34.2", after: "14.1 (Top 15)" },
        ],
        tools: ["Google Search Console", "On-Page SEO", "Keyword Research"],
    },


];
