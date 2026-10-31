"use client";

import { useEffect, useRef } from "react";

// Ring colour + fill per section tone. Sections opt in with data-tone="white" | "dark"; default is the paper background.
const TONES: Record<string, [string, string]> = {
    paper: ["#2E6B57", "rgba(46,107,87,.13)"],
    white: ["#1C2321", "rgba(28,35,33,.08)"],
    dark: ["#7FC4A8", "rgba(127,196,168,.2)"],
};

const CLICKABLE = 'a, button, input, select, textarea, label, summary, [role="button"]';

// A small dot on the real cursor plus a ring that eases behind it. Mouse only, never for reduced-motion users.
// The native cursor stays visible; this only adds a calm layer on top.
export default function CursorFollower() {
    const ringRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const root = document.documentElement;
        const s = { x: 0, y: 0, rx: 0, ry: 0, seen: false, hot: false, down: false, tone: "" };
        let raf = 0;

        const setState = () =>
            root.setAttribute("data-cur", [s.seen && "on", s.hot && "hot", s.down && "down"].filter(Boolean).join(" "));

        const tick = () => {
            s.rx += (s.x - s.rx) * 0.18;
            s.ry += (s.y - s.ry) * 0.18;
            if (ringRef.current) ringRef.current.style.transform = `translate3d(${s.rx.toFixed(1)}px, ${s.ry.toFixed(1)}px, 0)`;
            if (dotRef.current) dotRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
            raf = Math.abs(s.x - s.rx) + Math.abs(s.y - s.ry) > 0.2 ? requestAnimationFrame(tick) : 0;
        };

        const onMove = (e: MouseEvent) => {
            s.x = e.clientX;
            s.y = e.clientY;
            if (!s.seen) {
                s.rx = s.x;
                s.ry = s.y;
                s.seen = true;
            }
            const target = e.target instanceof Element ? e.target : null;
            const tone = target?.closest("[data-tone]")?.getAttribute("data-tone") || "paper";
            if (tone !== s.tone) {
                s.tone = tone;
                const [line, fill] = TONES[tone] || TONES.paper;
                root.style.setProperty("--cur", line);
                root.style.setProperty("--curfill", fill);
            }
            s.hot = !!target?.closest(CLICKABLE);
            setState();
            if (!raf) raf = requestAnimationFrame(tick);
        };
        const onDown = () => { s.down = true; setState(); };
        const onUp = () => { s.down = false; setState(); };
        const onLeave = () => { s.seen = false; setState(); };

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);
        document.addEventListener("mouseleave", onLeave);
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
            document.removeEventListener("mouseleave", onLeave);
            cancelAnimationFrame(raf);
            root.removeAttribute("data-cur");
        };
    }, []);

    return (
        <>
            <div ref={ringRef} className="cur-ring" aria-hidden="true" />
            <div ref={dotRef} className="cur-dot" aria-hidden="true" />
        </>
    );
}
