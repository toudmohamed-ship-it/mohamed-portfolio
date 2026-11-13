import { jsonLd } from "@/lib/seo";
import { OPEN_FOR_WORK } from "@/lib/constants";

interface FAQItem {
    question: string;
    answer: string;
    /** Shown instead of `answer` in portfolio mode (no mention of calls or quotes) */
    answer_closed?: string;
}

// Native <details> accordion: works without JavaScript and every answer stays in the HTML for crawlers.
export default function BlogFAQ({ faqs: allFaqs, title }: { faqs: FAQItem[]; title: string }) {
    if (!allFaqs || allFaqs.length === 0) return null;
    const faqs = allFaqs.map((f) => ({ question: f.question, answer: !OPEN_FOR_WORK && f.answer_closed ? f.answer_closed : f.answer }));

    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer.replace(/<[^>]*>?/gm, "") },
        })),
    };

    return (
        <section aria-labelledby="faq-title" className="flex flex-col gap-5">
            <h2 id="faq-title" className="m-0 text-2xl md:text-[28px] font-semibold">{title}</h2>
            <div className="border-t border-line">
                {faqs.map((faq, i) => (
                    <details key={i} className="faq group border-b border-line">
                        <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none text-[17px] font-medium text-ink">
                            {faq.question}
                            <span aria-hidden="true" className="shrink-0 w-8 h-8 rounded-full border border-line flex items-center justify-center text-forest transition-transform group-open:rotate-45">+</span>
                        </summary>
                        <div className="pb-6 text-ink-soft leading-relaxed [&_a]:text-forest" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </details>
                ))}
            </div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
        </section>
    );
}
