import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog-data";
import { ArrowLeft } from "lucide-react";

interface Props {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);
    if (!post) return { title: "Post Not Found" };

    return {
        title: `${post.title} | Mohamed Toudghi Blog`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="py-20 bg-white min-h-screen">
            <div className="container-custom max-w-3xl">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-sm font-medium text-navy-500 hover:text-brand-purple mb-8 transition-colors"
                >
                    <ArrowLeft className="mr-1 h-4 w-4" /> Back to Blog
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-4 text-sm font-medium text-navy-500 mb-6">
                        <span>{post.date}</span>
                        <span className="w-1 h-1 bg-navy-300 rounded-full"></span>
                        <span className="text-brand-purple">{post.category}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-navy-900 leading-tight mb-6">
                        {post.title}
                    </h1>
                    <p className="text-xl text-navy-600 leading-relaxed border-l-4 border-brand-purple pl-6 py-2">
                        {post.excerpt}
                    </p>
                </header>

                <div className="prose prose-lg prose-slate prose-headings:font-serif prose-headings:text-navy-900 prose-a:text-brand-purple hover:prose-a:text-purple-700">
                    <p>
                        {/* Disclaimer for dummy content */}
                        <em>This is a placeholder for the full article content. In a real implementation, this would be a Markdown file or content from a CMS.</em>
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
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
