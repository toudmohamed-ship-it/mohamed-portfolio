import { MetadataRoute } from "next";
import { BASE_URL, IS_INDEXABLE } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
    if (!IS_INDEXABLE) {
        return { rules: { userAgent: "*", disallow: "/" } };
    }
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/private/",
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
