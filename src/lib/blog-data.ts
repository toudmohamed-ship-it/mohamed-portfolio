// Articles. Titles, excerpts and display dates live in messages/*.json under BlogPosts.<slug>.
// `locales`: the languages in which the article is fully written (a src/content/blog/<slug>/<locale>.html file).
// Other languages fall back to a short summary: they stay readable but get noindex and leave hreflang and the sitemap.
// New articles are written in English and French; Arabic is kept for the commercial pages (growth plan, Nov 2026).
export interface BlogPost {
    slug: string;
    /** First publication, ISO date */
    published: string;
    /** Last substantial rewrite, ISO date (defaults to published) */
    modified?: string;
    category: string;
    locales: readonly ("en" | "fr" | "ar")[];
}

export const BLOG_POSTS: BlogPost[] = [
    { slug: "local-seo-guide-businesses", published: "2025-12-12", category: "Local SEO", locales: ["en", "fr", "ar"] },
    { slug: "technical-seo-checklist-2026", published: "2026-01-02", category: "Technical SEO", locales: ["en", "fr", "ar"] },
    { slug: "technical-seo-audit-checklist-lead-gen", published: "2026-01-05", modified: "2026-11-06", category: "Technical SEO", locales: ["en", "fr"] },
    { slug: "why-websites-fail", published: "2025-12-05", modified: "2026-11-06", category: "Strategy", locales: ["en", "fr"] },
    { slug: "ga4-event-tracking", published: "2025-11-28", modified: "2026-11-01", category: "Analytics", locales: ["en", "fr", "ar"] },
    { slug: "keyword-research-process", published: "2025-11-15", modified: "2026-11-06", category: "Keyword Research", locales: ["en", "fr"] },
];

/** Is this article fully written in this language (indexable)? */
export function isFullyWritten(post: BlogPost, locale: string) {
    return (post.locales as readonly string[]).includes(locale);
}
