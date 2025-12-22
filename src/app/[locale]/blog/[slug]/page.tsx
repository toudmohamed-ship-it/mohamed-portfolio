import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog-data";
import { ArrowLeft } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface Props {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props) {
    const { locale, slug } = await params;
    const tPosts = await getTranslations({ locale, namespace: 'BlogPosts' });

    // Check if translation exists for this slug, loosely
    // In next-intl if key missing it returns key path. We can check existence via data.
    const post = BLOG_POSTS.find((p) => p.slug === slug);
    if (!post) return { title: "Post Not Found" };

    return {
        title: `${tPosts(`${slug}.title`)} | Mohamed Toudghi Blog`,
        description: tPosts(`${slug}.excerpt`),
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

    return (
        <article className="py-20 bg-white min-h-screen">
            <div className="container-custom max-w-3xl">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-sm font-medium text-navy-500 hover:text-brand-purple mb-8 transition-colors"
                >
                    <ArrowLeft className="mr-1 h-4 w-4 rtl:rotate-180" /> {t('back_to_blog')}
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-4 text-sm font-medium text-navy-500 mb-6">
                        <span>{tPosts(`${slug}.date`)}</span>
                        <span className="w-1 h-1 bg-navy-300 rounded-full"></span>
                        <span className="text-brand-purple">{tPosts(`${slug}.category`)}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-navy-900 leading-tight mb-6">
                        {tPosts(`${slug}.title`)}
                    </h1>
                    <p className="text-xl text-navy-600 leading-relaxed border-l-4 border-brand-purple pl-6 py-2">
                        {tPosts(`${slug}.excerpt`)}
                    </p>
                </header>

                <div className="prose prose-lg prose-slate prose-headings:font-serif prose-headings:text-navy-900 prose-a:text-brand-purple hover:prose-a:text-purple-700">
                    <p>
                        {/* Disclaimer for dummy content */}
                        <em>{t('placeholder_content')}</em>
                    </p>
                    <p>
                        {/* 
                           For a real blog, content would come from Markdown/CMS.
                           Here we just show generic localized ipsum or similar if we had it, 
                           but we will just leave the existing Lorem Ipsum as "Body Content" is not fully translated 
                           in this exercise scope beyond the placeholder warning. 
                           Actually, passing tPosts(`${slug}.content`) is better if we have it!
                           We added "content" key to JSON. Let's use it.
                        */}
                        {tPosts(`${slug}.content`)}
                    </p>
                    {/* Keeping the rest of the static markdown structure as generic example */}
                    <h3>Why this matters for your business</h3>
                    <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <ul>
                        <li>Strategy Focus</li>
                        <li>Implementation Details</li>
                        <li>Analysis of Results</li>
                    </ul>
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                    </p>
                </div>
            </div>
        </article>
    );
}
