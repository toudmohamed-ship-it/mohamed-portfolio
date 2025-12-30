import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog-data";
import Image from "next/image";
import { ArrowLeft, Clock, Share2, Calendar } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import fs from "fs";
import path from "path";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import TableOfContents from "@/components/blog/TableOfContents";
import BlogSidebar from "@/components/blog/BlogSidebar";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import SocialShare from "@/components/blog/SocialShare";
import AuthorBio from "@/components/blog/AuthorBio";
import BlogFAQ from "@/components/blog/BlogFAQ";
import RelatedPosts from "@/components/blog/RelatedPosts";

interface Props {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const locales = ['en', 'fr', 'ar'];
    const params = [];

    for (const locale of locales) {
        for (const post of BLOG_POSTS) {
            params.push({ locale, slug: post.slug });
        }
    }

    return params;
}

export async function generateMetadata({ params }: Props) {
    const { locale, slug } = await params;
    const tPosts = await getTranslations({ locale, namespace: 'BlogPosts' });

    const post = BLOG_POSTS.find((p) => p.slug === slug);
    if (!post) return { title: "Post Not Found" };

    return {
        title: `${tPosts(`${slug}.title`)} | Mohamed Toudghi Blog`,
        description: tPosts(`${slug}.excerpt`),
        alternates: {
            canonical: `https://www.mohamedtoudghi.com/${locale === 'en' ? '' : locale + '/'}blog/${slug}`,
            languages: {
                'en': `https://www.mohamedtoudghi.com/blog/${slug}`,
                'fr': `https://www.mohamedtoudghi.com/fr/blog/${slug}`,
                'ar': `https://www.mohamedtoudghi.com/ar/blog/${slug}`,
            },
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const postData = BLOG_POSTS.find((p) => p.slug === slug);

    if (!postData) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: 'BlogPage' });
    const tPosts = await getTranslations({ locale, namespace: 'BlogPosts' });

    interface BlogMetadata {
        faqs: any[];
        relatedSlugs?: string[];
        relatedPosts?: string[];
    }

    // Try to read content from file system (CMS-like)
    let content = "";
    let meta: BlogMetadata = { faqs: [], relatedSlugs: [] };

    try {
        const blogDir = path.resolve(process.cwd(), "src/content/blog", slug);
        const contentPath = path.join(blogDir, `${locale}.html`);
        const metaPath = path.join(blogDir, "metadata.json");

        if (fs.existsSync(contentPath)) {
            content = fs.readFileSync(contentPath, "utf-8");
        } else {
            console.warn(`Content file not found: ${contentPath}. Falling back to translations.`);
            content = tPosts(`${slug}.content`);
        }

        if (fs.existsSync(metaPath)) {
            const metaRaw = fs.readFileSync(metaPath, "utf-8");
            if (metaRaw) {
                meta = JSON.parse(metaRaw);
            }
        }
    } catch (e) {
        console.error(`Error reading blog files for ${slug}/${locale}:`, e);
        // Ensure content is at least something to avoid further errors
        content = content || tPosts(`${slug}.content`) || "";
    }

    // Simple reading time calculation (approx 200 words per minute)
    const wordCount = content.replace(/<[^>]*>?/gm, "").split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    const fullUrl = `https://www.mohamedtoudghi.com/${locale === 'en' ? '' : locale + '/'}blog/${slug}`;

    // Add IDs to headings for ToC functionality
    const contentWithIds = content.replace(/<(h1|h2|h3)([^>]*)>(.*?)<\/\1>/gi, (match, tag, attrs, text) => {
        if (attrs.includes('id=')) return match;
        const plainText = text.replace(/<[^>]*>?/gm, "");
        const id = plainText
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
        return `<${tag}${attrs} id="${id}">${text}</${tag}>`;
    });

    return (
        <article className="bg-bg-primary min-h-screen relative overflow-hidden">
            <ScrollProgressBar />

            {/* Immersive Hero Header */}
            <header className="relative h-[60vh] md:h-[70vh] flex items-end pb-12 md:pb-24 overflow-hidden">
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0 -z-10">
                    <Image
                        src={postData.image || "/blog/placeholder.png"}
                        alt={tPosts(`${slug}.title`)}
                        fill
                        className="object-cover opacity-40 transition-transform duration-700 hover:scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent" />
                </div>

                <div className="container-custom relative z-10 w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="max-w-4xl space-y-8">
                        <div className="mb-6">
                            <Breadcrumbs />
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-brand-mint uppercase tracking-[0.3em]">
                            <span className="flex items-center gap-2 px-3 py-1 bg-brand-purple/10 border border-brand-purple/20 rounded-full">
                                <Calendar className="w-3 h-3 text-brand-purple" />
                                {tPosts(`${slug}.date`)}
                            </span>
                            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                            <span className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                                <Clock className="w-3 h-3" />
                                {readingTime} min read
                            </span>
                            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                            <span className="text-brand-purple font-black">{tPosts(`${slug}.category`)}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-text-primary leading-[1.1] tracking-tight text-glow-subtle">
                            {tPosts(`${slug}.title`)}
                        </h1>

                        <div className="flex items-center gap-6 pt-4">
                            <SocialShare url={fullUrl} title={tPosts(`${slug}.title`)} />
                        </div>
                    </div>
                </div>
            </header>

            <div className="container-custom relative pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div className="glass p-6 md:p-12 lg:p-16 rounded-[3rem] border-border-subtle bg-white/[0.01] shadow-2xl relative overflow-hidden">
                            {/* Abstract Decor within Content Area */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/5 blur-[100px] pointer-events-none" />

                            {/* Simple Excerpt Box */}
                            <div className="mb-16 pb-12 border-b border-border-subtle">
                                <p className="text-xl md:text-2xl text-text-secondary leading-relaxed font-light italic opacity-80">
                                    {tPosts(`${slug}.excerpt`)}
                                </p>
                            </div>

                            <div className="lg:hidden mb-12 glass p-8 rounded-3xl border-border-subtle bg-white/5">
                                <TableOfContents htmlContent={contentWithIds} />
                            </div>

                            <div className="blog-content">
                                <div
                                    dangerouslySetInnerHTML={{ __html: contentWithIds }}
                                />
                            </div>

                            {/* Author & Verification Card */}
                            <div className="mt-24 pt-24 border-t border-border-subtle space-y-24">
                                <AuthorBio />
                                <BlogFAQ faqs={meta.faqs} />
                            </div>
                        </div>

                        {/* Outside Content Box for Related Items */}
                        <div className="mt-24">
                            <RelatedPosts currentSlug={slug} relatedSlugs={meta.relatedPosts || meta.relatedSlugs || []} locale={locale} />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 sticky top-32 space-y-12">
                        <div className="hidden lg:block glass p-8 rounded-[2.5rem] border-border-subtle bg-white/[0.01] shadow-xl">
                            <TableOfContents htmlContent={contentWithIds} />
                        </div>
                        <BlogSidebar locale={locale} />
                    </aside>
                </div>
            </div>
        </article>
    );
}
