import { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/data";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://mohamedtoudghi.com"; // Placeholder

    const staticRoutes = [
        "",
        "/about",
        "/services",
        "/portfolio",
        "/contact",
        "/blog",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    const projectRoutes = CASE_STUDIES.map((study) => ({
        url: `${baseUrl}/portfolio/${study.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    const blogRoutes = BLOG_POSTS.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "weekly" as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
