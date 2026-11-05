import { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/data";
import { BLOG_POSTS, isFullyWritten } from "@/lib/blog-data";
import { SERVICE_PAGES } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.mohamedtoudghi.com";

    const locales = ['en', 'fr', 'ar'];

    const staticRoutes = locales.flatMap(locale => [
        "",
        "/about",
        "/services",
        "/consultant-seo-maroc",
        ...SERVICE_PAGES.map((p) => `/services/${p.slug}`),
        "/privacy",
        "/portfolio",
        "/contact",
        "/blog",
    ].map((route) => ({
        url: locale === 'en' ? `${baseUrl}${route}` : `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.8,
    })));

    const projectRoutes = locales.flatMap(locale => CASE_STUDIES.map((study) => ({
        url: locale === 'en' ? `${baseUrl}/portfolio/${study.slug}` : `${baseUrl}/${locale}/portfolio/${study.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    })));

    // Articles only in the languages they are fully written in (see BLOG_POSTS.locales)
    const blogRoutes = locales.flatMap(locale => BLOG_POSTS.filter((post) => isFullyWritten(post, locale)).map((post) => ({
        url: locale === 'en' ? `${baseUrl}/blog/${post.slug}` : `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.modified || post.published),
        changeFrequency: "weekly" as const,
        priority: 0.6,
    })));

    return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
