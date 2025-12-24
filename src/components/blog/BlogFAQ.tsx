"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
    question: string;
    answer: string;
}

interface BlogFAQProps {
    faqs: FAQItem[];
    title?: string;
}

export default function BlogFAQ({ faqs, title = "Frequently Asked Questions" }: BlogFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (!faqs || faqs.length === 0) return null;

    return (
        <section className="space-y-12">
            <h2 className="text-3xl font-serif font-bold text-text-primary tracking-tight">{title}</h2>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={cn(
                            "glass rounded-3xl border border-border-subtle transition-all duration-500 overflow-hidden",
                            openIndex === index ? "bg-white/[0.03] border-brand-purple/30" : "hover:bg-white/[0.02]"
                        )}
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full p-8 flex items-center justify-between text-left transition-colors"
                        >
                            <span className="text-lg font-bold text-text-primary pr-8">{faq.question}</span>
                            <div className={cn(
                                "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-all",
                                openIndex === index ? "bg-brand-purple text-white" : "bg-white/5 text-text-secondary"
                            )}>
                                {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                            </div>
                        </button>

                        <div
                            className={cn(
                                "transition-all duration-500 ease-in-out",
                                openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                            )}
                        >
                            <div className="p-8 pt-0 text-text-secondary leading-relaxed prose prose-sm dark:prose-invert">
                                <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* JSON-LD Schema (Server-side would be better but this works for client hydration too) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map(faq => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer.replace(/<[^>]*>?/gm, "")
                            }
                        }))
                    })
                }}
            />
        </section>
    );
}
