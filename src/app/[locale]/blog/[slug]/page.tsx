import { notFound } from "next/navigation";
import { BLOG_POSTS, isFullyWritten } from "@/lib/blog-data";
import { getTranslations, setRequestLocale } from "next-intl/server";
import fs from "fs";
import path from "path";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import TableOfContents, { type Heading } from "@/components/blog/TableOfContents";
import BlogSidebar from "@/components/blog/BlogSidebar";
import SocialShare from "@/components/blog/SocialShare";
import AuthorBio from "@/components/blog/AuthorBio";
import ServiceBridge from "@/components/blog/ServiceBridge";
import BlogFAQ from "@/components/blog/BlogFAQ";
import RelatedPosts from "@/components/blog/RelatedPosts";
import FinalCTA from "@/components/sections/FinalCTA";
import { BASE_URL, IS_INDEXABLE, jsonLd, localizedUrl, pageAlternates, metaTitle } from "@/lib/seo";

interface Props {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

interface BlogMetadata {
    faqs: { question: string; answer: string }[];
    relatedSlugs?: string[];
    relatedPosts?: string[];
}

export async function generateStaticParams() {
    return ['en', 'fr', 'ar'].flatMap((locale) => BLOG_POSTS.map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({ params }: Props) {
    const { locale, slug } = await params;
    const tPosts = await getTranslations({ locale, namespace: 'BlogPosts' });

    const post = BLOG_POSTS.find((p) => p.slug === slug);
    if (!post) return { title: "Post Not Found" };

    // Only fully written language versions are offered to Google; a summary-only version stays readable but noindex
    const full = isFullyWritten(post, locale);

    return {
        // A shorter title for search results when the article's own title passes 60 characters
        title: metaTitle(tPosts.has(`${slug}.seo_title`) ? tPosts(`${slug}.seo_title`) : tPosts(`${slug}.title`)),
        description: tPosts(`${slug}.excerpt`),
        alternates: pageAlternates(locale, `/blog/${slug}`, post.locales),
        ...(full || !IS_INDEXABLE ? {} : { robots: { index: false, follow: true } }),
        openGraph: {
            type: "article",
            title: tPosts(`${slug}.title`),
            description: tPosts(`${slug}.excerpt`),
            url: localizedUrl(locale, `/blog/${slug}`),
            publishedTime: post.published,
            modifiedTime: post.modified || post.published,
        },
    };
}

// Heading ids that also work for Arabic and French text (keeps letters and digits from any script)
function slugify(text: string) {
    return text
        .replace(/<[^>]*>?/gm, "")
        .toLowerCase()
        .replace(/&[a-z]+;/g, "")
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .trim()
        .replace(/\s+/g, "-");
}

function loadPost(slug: string, locale: string, fallback: () => string) {
    let content = "";
    let meta: BlogMetadata = { faqs: [], relatedSlugs: [] };
    const blogDir = path.resolve(process.cwd(), "src/content/blog", slug);
    try {
        const contentPath = path.join(blogDir, `${locale}.html`);
        content = fs.existsSync(contentPath) ? fs.readFileSync(contentPath, "utf-8") : fallback();

        const metaPath = path.join(blogDir, "metadata.json");
        if (fs.existsSync(metaPath)) meta = { ...meta, ...JSON.parse(fs.readFileSync(metaPath, "utf-8")) };

        const localizedMetaPath = path.join(blogDir, `metadata.${locale}.json`);
        if (fs.existsSync(localizedMetaPath)) {
            const localized = JSON.parse(fs.readFileSync(localizedMetaPath, "utf-8"));
            meta = { ...meta, ...localized, faqs: localized.faqs || meta.faqs };
        }
    } catch (e) {
        console.error(`Error reading blog files for ${slug}/${locale}:`, e);
        content = content || fallback() || "";
    }
    return { content, meta };
}

export default async function BlogPostPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const postData = BLOG_POSTS.find((p) => p.slug === slug);
    if (!postData) notFound();

    const t = await getTranslations({ locale, namespace: 'BlogPage' });
    const tPosts = await getTranslations({ locale, namespace: 'BlogPosts' });
    const tCrumbs = await getTranslations({ locale, namespace: 'Breadcrumbs' });

    const { content, meta } = loadPost(slug, locale, () => tPosts(`${slug}.content`));
    const title = tPosts(`${slug}.title`);

    const wordCount = content.replace(/<[^>]*>?/gm, "").split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    // The page header already shows the title and has its own table of contents, so drop the article's leading H1
    // and its inline TOC block, demote any other H1, then give H2/H3 stable ids for the sidebar table of contents
    // Article structured data, only on fully written language versions (the summaries are noindex)
    const url = localizedUrl(locale, `/blog/${slug}`);
    const schema = isFullyWritten(postData, locale)
        ? {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `${url}#article`,
            headline: title,
            description: tPosts(`${slug}.excerpt`),
            url,
            mainEntityOfPage: url,
            inLanguage: locale,
            datePublished: postData.published,
            dateModified: postData.modified || postData.published,
            wordCount,
            articleSection: postData.category,
            image: `${BASE_URL}/og-image.jpg`,
            author: { "@id": `${BASE_URL}/#person` },
            publisher: { "@id": `${BASE_URL}/#person` },
        }
        : null;

    const headings: Heading[] = [];
    const used = new Set<string>();
    const body = content
        .replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>/i, "")
        .replace(/<div class="toc-container">[\s\S]*?<\/div>/gi, "")
        .replace(/<h1([^>]*)>([\s\S]*?)<\/h1>/gi, "<h2$1>$2</h2>")
        .replace(/<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/gi, (match, tag: string, attrs: string, text: string) => {
            let id = /id="([^"]+)"/.exec(attrs)?.[1] || slugify(text) || `section-${used.size + 1}`;
            while (used.has(id)) id = `${id}-2`;
            used.add(id);
            if (tag.toLowerCase() === "h2") headings.push({ id, text: text.replace(/<[^>]*>?/gm, "").replace(/&amp;/g, "&") });
            return /id="/.test(attrs) ? match : `<${tag}${attrs} id="${id}">${text}</${tag}>`;
        });

    return (
        <>
            <article>
                <header className="relative border-b border-line bg-paper overflow-hidden">
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 pointer-events-none opacity-50 [background-image:radial-gradient(#D9D3C7_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(180deg,#000_0%,transparent_75%)]"
                    />
                    <div className="container-custom relative pt-10 md:pt-14 pb-12 md:pb-16 flex flex-col gap-6">
                        <Breadcrumbs
                            locale={locale}
                            items={[
                                { label: tCrumbs("home"), href: "/" },
                                { label: tCrumbs("blog"), href: "/blog" },
                                { label: title },
                            ]}
                        />
                        <div className="max-w-[820px] flex flex-col gap-5 pt-4">
                            <p className="m-0 font-mono text-[13px] text-forest flex flex-wrap gap-x-3 gap-y-1">
                                <span>{tPosts(`${slug}.category`)}</span>
                                <span aria-hidden="true">·</span>
                                <span>{tPosts(`${slug}.date`)}</span>
                                <span aria-hidden="true">·</span>
                                <span>{t("read_time", { minutes: readingTime })}</span>
                            </p>
                            <h1 className="m-0 text-[32px] sm:text-[44px] lg:text-[52px] leading-[1.1] font-semibold tracking-[-0.03em]">{title}</h1>
                            <p className="m-0 text-lg md:text-xl text-muted max-w-[680px]">{tPosts(`${slug}.excerpt`)}</p>
                            <div className="pt-2">
                                <SocialShare
                                    url={localizedUrl(locale, `/blog/${slug}`)}
                                    title={title}
                                    labels={{ share: t("share"), copy: t("copy_link"), copied: t("copied") }}
                                />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="container-custom py-14 md:py-20 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16 items-start">
                    <div className="min-w-0 max-w-[720px] flex flex-col gap-16">
                        <div className="lg:hidden bg-white border border-line rounded-2xl p-5">
                            <TableOfContents headings={headings} title={t("on_this_page")} />
                        </div>
                        <div className="blog-content" dangerouslySetInnerHTML={{ __html: body }} />
                        <ServiceBridge postSlug={slug} locale={locale} />
                        <AuthorBio locale={locale} />
                        <BlogFAQ faqs={meta.faqs} title={t("faq_title")} />
                        <RelatedPosts currentSlug={slug} relatedSlugs={meta.relatedPosts || meta.relatedSlugs || []} locale={locale} />
                    </div>
                    <aside className="hidden lg:flex flex-col gap-8 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pe-1">
                        <TableOfContents headings={headings} title={t("on_this_page")} />
                        <BlogSidebar locale={locale} />
                    </aside>
                </div>
            </article>
            {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />}
            <FinalCTA />
        </>
    );
}
