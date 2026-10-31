"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import HeroWaves, { LAYERS } from "./HeroWaves";

export default function Hero() {
    const t = useTranslations("HomePage.hero");
    const words = t.raw("words") as string[];
    const longestWord = words.reduce((a, b) => (b.length > a.length ? b : a), "");
    const query = t("query");

    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const hillRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [wordIndex, setWordIndex] = useState(0);
    const [rotated, setRotated] = useState(false);

    // Rotate the highlighted audience. The server renders words[0] with no animation, so the H1 is painted
    // immediately (good LCP) and Google reads one clean sentence.
    useEffect(() => {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(() => {
            setRotated(true);
            setWordIndex((i) => (i + 1) % words.length);
        }, 3000);
        return () => clearInterval(id);
    }, [words.length]);

    // Mouse-only effects: cursor light, card drift and wave swells. Nothing runs until the mouse moves,
    // and the loop stops as soon as everything has settled, so page load and phones pay nothing.
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const target = { x: 0, y: 0, px: 0, py: 0, bump: 0, bx: 0 };
        const cur = { ...target };
        let raf = 0;

        const tick = () => {
            let moving = false;
            (Object.keys(cur) as (keyof typeof cur)[]).forEach((k) => {
                const d = target[k] - cur[k];
                cur[k] += d * 0.07;
                if (Math.abs(d) > (k === "px" || k === "py" || k === "bump" ? 0.001 : 0.3)) moving = true;
            });
            section.style.setProperty("--mx", `${cur.x.toFixed(1)}px`);
            section.style.setProperty("--my", `${cur.y.toFixed(1)}px`);
            if (cardsRef.current) cardsRef.current.style.transform = `translate3d(${(-cur.px * 14).toFixed(2)}px, ${(-cur.py * 10).toFixed(2)}px, 0)`;
            hillRefs.current.forEach((el, i) => {
                if (!el) return;
                const L = LAYERS[i];
                const hidden = L.lift + L.amp * 1.5;
                el.style.transform = `translate3d(${(cur.bx - el.offsetWidth / 2).toFixed(1)}px, ${((1 - cur.bump) * hidden).toFixed(1)}px, 0)`;
            });
            raf = moving ? requestAnimationFrame(tick) : 0;
        };

        const onMove = (e: MouseEvent) => {
            const r = section.getBoundingClientRect();
            const inside = e.clientY >= r.top && e.clientY <= r.bottom;
            if (!target.bx) cur.bx = e.clientX - r.left; // first move: place the swell under the cursor instead of sliding in
            target.x = e.clientX - r.left;
            target.y = e.clientY - r.top;
            target.px = e.clientX / window.innerWidth - 0.5;
            target.py = e.clientY / window.innerHeight - 0.5;
            target.bx = e.clientX - r.left;
            target.bump = inside ? 1 : 0;
            section.style.setProperty("--glow", inside ? "1" : "0.6");
            if (!raf) raf = requestAnimationFrame(tick);
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-paper">
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-55 [background-image:radial-gradient(#D9D3C7_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(180deg,#000_0%,transparent_80%)]"
            />
            <div className="hero-glow" aria-hidden="true" />
            <div className="hero-spot" aria-hidden="true" />

            <div className="container-custom relative z-[1] pt-12 md:pt-16 pb-[150px] lg:pb-[110px] flex flex-wrap items-center gap-16">
                <div className="flex-[1_1_520px] min-w-0 flex flex-col gap-6">
                    <p className="in d1 m-0 font-mono text-[13px] text-forest tracking-wide">{t("eyebrow")}</p>
                    <h1 className="hero-title m-0 text-[34px] sm:text-5xl lg:text-[60px] leading-[1.1] lg:leading-[1.07] font-semibold tracking-[-0.03em]">
                        {t("before")}{" "}
                        <span className="words text-forest" data-size={longestWord}>
                            <span key={wordIndex} className={rotated ? "in" : undefined}>{words[wordIndex]}</span>
                        </span>
                        <br className="hidden lg:inline" />{" "}
                        {t("after")}{" "}
                        <span className="relative lg:whitespace-nowrap">
                            {t("highlight")}
                            <svg className="hidden lg:block absolute start-0 -bottom-1.5 w-full h-3" aria-hidden="true" viewBox="0 0 300 14" preserveAspectRatio="none">
                                <path d="M2 9 C 80 2, 200 2, 298 7" pathLength={1} fill="none" stroke="#2E6B57" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                        </span>{" "}
                        {t("end")}
                    </h1>
                    <p className="in d3 m-0 text-lg md:text-[19px] text-muted max-w-[540px]">{t("subtitle")}</p>
                    <div className="in d4 flex flex-wrap items-center gap-3.5 pt-1.5">
                        <Link href="/contact" className="btn inline-flex items-center gap-2 px-6 py-[15px] rounded-xl bg-forest text-white font-medium no-underline shadow-[0_10px_24px_-14px_rgba(46,107,87,.8)] hover:bg-forest-deep hover:text-white">
                            {t("cta_call")} <span className="arrow" aria-hidden="true">→</span>
                        </Link>
                        <Link href="/portfolio" className="btn inline-flex items-center px-[22px] py-[15px] rounded-xl border border-line-strong bg-white text-ink font-medium no-underline hover:text-ink">
                            {t("cta_work")}
                        </Link>
                    </div>
                    <p className="in d4 m-0 text-sm text-muted">{t("languages")}</p>
                </div>

                {/* Visual: a search result and real before/after numbers. Drifts slightly with the mouse. */}
                <div ref={cardsRef} className="flex-[1_1_400px] min-w-0 flex flex-col gap-4">
                    <div className="in d3 lift bg-white border border-line rounded-[18px] p-[22px] shadow-[0_24px_50px_-36px_rgba(28,35,33,.45)]">
                        <div className="flex items-center gap-2.5 border border-line rounded-full px-4 py-2.5" dir="ltr">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5A645F" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
                            <span className="typed font-mono text-sm" style={{ ["--chars" as string]: `${query.length}ch`, ["--steps" as string]: query.length }}>{query}</span>
                        </div>
                        <div className="in d6 pt-[18px] px-1 pb-1 flex flex-col gap-1">
                            <span className="flex items-center gap-2 text-[13px] text-muted" dir="ltr">
                                <span className="w-[18px] h-[18px] rounded-full bg-ink text-paper text-[9px] inline-flex items-center justify-center font-semibold" aria-hidden="true">MT</span>
                                {t("serp_url")}
                            </span>
                            <span className="text-[19px] text-[#1F4FA8] font-medium leading-snug">{t("serp_title")}</span>
                            <span className="text-sm text-muted leading-normal">{t("serp_desc")}</span>
                        </div>
                    </div>

                    <div className="in d5 lift bg-white border border-line rounded-[18px] p-[22px] flex flex-col gap-[18px] shadow-[0_24px_50px_-36px_rgba(28,35,33,.45)]">
                        <div className="flex flex-wrap justify-between items-baseline gap-3">
                            <span className="font-semibold text-[15px]">{t("chart_title")}</span>
                            <span className="font-mono text-xs text-muted">{t("chart_source")}</span>
                        </div>
                        <div className="flex items-end gap-5">
                            <div className="flex items-end gap-2.5 h-24 shrink-0" aria-hidden="true">
                                <div className="flex flex-col items-center gap-1.5">
                                    <span className="font-mono text-xs text-muted">32</span>
                                    <div className="bar w-[34px] h-10 rounded-t-md rounded-b-sm bg-line-strong" style={{ animationDelay: ".9s" }} />
                                </div>
                                <div className="flex flex-col items-center gap-1.5">
                                    <span className="font-mono text-xs text-ink font-medium">74</span>
                                    <div className="bar w-[34px] h-[76px] rounded-t-md rounded-b-sm bg-forest" style={{ animationDelay: "1.2s" }} />
                                </div>
                            </div>
                            <div className="min-w-0">
                                <div className="text-[13px] text-muted">{t("clicks")}</div>
                                <div className="text-[32px] font-semibold tracking-tight leading-tight">+130%</div>
                                <div className="sr-only">32 → 74</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-[13px] text-muted">
                                <span>{t("position")}</span>
                                <span className="font-mono" dir="ltr">34.2 → <strong className="text-ink font-medium">14.1</strong></span>
                            </div>
                            <div className="relative h-[22px] mb-4" aria-hidden="true">
                                <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded bg-sage" />
                                <span className="absolute start-0 top-6 font-mono text-[11px] text-muted">{t("page4")}</span>
                                <span className="absolute end-0 top-6 font-mono text-[11px] text-muted">{t("page1")}</span>
                                <span className="marker-track"><span className="marker w-4 h-4 rounded-full bg-forest border-[3px] border-white shadow-[0_0_0_1px_#2E6B57]" /></span>
                            </div>
                        </div>
                        <div className="flex justify-between pt-3.5 border-t border-[#EEEAE2] text-[13px] text-muted">
                            <span>{t("ctr")}</span>
                            <span className="font-mono" dir="ltr">0.7% → <strong className="text-ink font-medium">1.6%</strong></span>
                        </div>
                    </div>
                </div>
            </div>

            <HeroWaves ref={hillRefs} pinLabel={t("pin")} />
        </section>
    );
}
