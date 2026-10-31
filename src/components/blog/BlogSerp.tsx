"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/routing";

export type SerpPost = { slug: string; title: string; excerpt: string; date: string; category: string };
export type SerpQuestion = { question: string; answer: string; slug: string };

type Labels = {
    search_label: string;
    placeholder: string;
    clear: string;
    all: string;
    results: string; // contains {count}
    no_results: string; // contains {query}
    paa_title: string;
    paa_read: string;
    site_name: string;
};

// Strip accents and case so "réfé" finds "référencement" and "SEO" finds "seo"
const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// The blog index shown as a search results page. Every result is a plain link rendered on the server too,
// so filtering is a convenience for visitors and never hides content from crawlers.
export default function BlogSerp({ posts, questions, labels }: { posts: SerpPost[]; questions: SerpQuestion[]; labels: Labels }) {
    const [query, setQuery] = useState("");
    const [tab, setTab] = useState<string | null>(null);
    const categories = useMemo(() => [...new Set(posts.map((p) => p.category))], [posts]);

    const results = useMemo(() => {
        const q = norm(query.trim());
        return posts.filter(
            (p) => (!tab || p.category === tab) && (!q || norm(`${p.title} ${p.excerpt} ${p.category}`).includes(q))
        );
    }, [posts, query, tab]);

    return (
        <div className="min-w-0 flex flex-col gap-5">
            {/* Search box */}
            <form role="search" onSubmit={(e) => e.preventDefault()} className="max-w-[690px]">
                <label htmlFor="blog-search" className="sr-only">{labels.search_label}</label>
                <div className="flex items-center gap-3 bg-white border border-line-strong rounded-full px-5 h-[52px] shadow-[0_2px_10px_-6px_rgba(28,35,33,.35)] focus-within:shadow-[0_4px_16px_-6px_rgba(28,35,33,.4)] focus-within:border-forest transition-shadow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5A645F" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
                    <input
                        id="blog-search"
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={labels.placeholder}
                        className="flex-1 min-w-0 bg-transparent outline-none text-[16px] text-ink placeholder:text-[#7B847F] [&::-webkit-search-cancel-button]:hidden"
                    />
                    {query && (
                        <button type="button" onClick={() => setQuery("")} aria-label={labels.clear} className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-ink hover:bg-paper">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
                        </button>
                    )}
                </div>
            </form>

            {/* Tabs, like All / Images / News */}
            <div className="border-b border-line">
                <ul className="list-none m-0 p-0 flex gap-6 overflow-x-auto text-[14px]" role="list">
                    {[null, ...categories].map((c) => {
                        const active = tab === c;
                        return (
                            <li key={c ?? "all"}>
                                <button
                                    type="button"
                                    onClick={() => setTab(c)}
                                    aria-pressed={active}
                                    className={`whitespace-nowrap pb-2.5 pt-1 border-b-[3px] -mb-px transition-colors ${active ? "border-forest text-forest font-medium" : "border-transparent text-muted hover:text-ink"}`}
                                >
                                    {c ?? labels.all}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <p className="m-0 text-[13px] text-muted" aria-live="polite">
                {results.length > 0 ? labels.results.replace("{count}", String(results.length)) : labels.no_results.replace("{query}", query)}
            </p>

            <ol className="list-none m-0 p-0 flex flex-col gap-8 max-w-[690px]">
                {results.map((post, i) => (
                    <li key={post.slug} className="flex flex-col gap-8">
                        <article className="flex flex-col gap-1">
                            <div className="flex items-center gap-3" dir="ltr">
                                <img src="/icon.svg" alt="" width={28} height={28} className="w-7 h-7 rounded-full border border-line bg-white" />
                                <div className="flex flex-col leading-tight min-w-0">
                                    <span className="text-[14px] text-ink">{labels.site_name}</span>
                                    <span className="text-[12px] text-muted truncate">mohamedtoudghi.com › blog › {post.slug}</span>
                                </div>
                            </div>
                            <h2 className="m-0 mt-1 text-[20px] leading-snug font-normal tracking-normal">
                                <Link href={`/blog/${post.slug}`} className="text-[#1F4FA8] no-underline hover:underline visited:text-[#5B3F99]">
                                    {post.title}
                                </Link>
                            </h2>
                            <p className="m-0 text-[14px] leading-relaxed text-ink-soft">
                                <span className="text-muted">{post.date} · {post.category} · </span>
                                {post.excerpt}
                            </p>
                        </article>

                        {/* "People also ask" after the second result, only in the unfiltered list */}
                        {i === 1 && !query && !tab && questions.length > 0 && (
                            <section aria-labelledby="paa-title" className="flex flex-col">
                                <h2 id="paa-title" className="m-0 mb-2 text-[18px] font-medium tracking-normal">{labels.paa_title}</h2>
                                <div className="border-t border-line">
                                    {questions.map((q) => (
                                        <details key={q.question} className="group border-b border-line">
                                            <summary className="flex items-center justify-between gap-4 py-3.5 cursor-pointer list-none text-[15px] text-ink">
                                                {q.question}
                                                <svg className="shrink-0 transition-transform group-open:rotate-180" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5A645F" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                                            </summary>
                                            <div className="pb-4 flex flex-col gap-2">
                                                <div className="text-[14px] leading-relaxed text-ink-soft [&_strong]:text-ink" dangerouslySetInnerHTML={{ __html: q.answer }} />
                                                <Link href={`/blog/${q.slug}`} className="btn self-start text-[14px] font-medium no-underline">
                                                    {labels.paa_read} <span className="arrow" aria-hidden="true">→</span>
                                                </Link>
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </section>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}
