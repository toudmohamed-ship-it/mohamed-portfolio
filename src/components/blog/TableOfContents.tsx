"use client";

import { useEffect, useState } from "react";

export type Heading = { id: string; text: string };

// Sticky "On this page" list. Highlights the section currently in view; no animation library.
export default function TableOfContents({ headings, title }: { headings: Heading[]; title: string }) {
    const [active, setActive] = useState(headings[0]?.id);

    useEffect(() => {
        const els = headings.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => !!el);
        if (!els.length) return;
        const io = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: "0px 0px -70% 0px" }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [headings]);

    if (headings.length < 2) return null;

    return (
        <nav aria-label={title}>
            <p className="m-0 mb-3 font-mono text-xs text-muted">{title}</p>
            <ol className="list-none m-0 p-0 flex flex-col border-s border-line">
                {headings.map((h) => (
                    <li key={h.id}>
                        <a
                            href={`#${h.id}`}
                            aria-current={active === h.id ? "location" : undefined}
                            className={`block ps-4 -ms-px py-1.5 text-[15px] leading-snug no-underline border-s-2 transition-colors ${active === h.id ? "border-forest text-ink" : "border-transparent text-muted hover:text-ink"}`}
                        >
                            {h.text}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
