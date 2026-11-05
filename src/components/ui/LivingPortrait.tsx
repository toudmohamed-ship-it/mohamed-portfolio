"use client";

import { useEffect, useRef } from "react";

// Illustrated portrait whose eyes follow the cursor. Five aligned layers from the same 1024 x 1024 canvas:
// eye whites (static), two irises (moving), and the face with holes cut for the eyes on top, so the eyelids
// clip the irises. Positions are percentages of that canvas. Motion follows the site rules: transform only,
// mouse users only, no loop (one frame per pointer move), nothing under prefers-reduced-motion.
const pct = (n: number) => `${(n / 1024) * 100}%`;
const box = (x: number, y: number, w: number, h: number) => ({ left: pct(x), top: pct(y), width: pct(w), height: pct(h) });

// Point between the eyes, as a fraction of the canvas
const EYES_X = 511 / 1024;
const EYES_Y = 210 / 1024;

export default function LivingPortrait({ alt }: { alt: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let frame = 0;
        let x = 0, y = 0;
        const update = () => {
            frame = 0;
            const r = el.getBoundingClientRect();
            const dx = x - (r.left + r.width * EYES_X);
            const dy = y - (r.top + r.height * EYES_Y);
            const d = Math.hypot(dx, dy) || 1;
            // Full deflection once the cursor is about a portrait-width away; gentle when it is close
            const k = Math.min(1, d / r.width);
            el.style.setProperty("--ex", ((dx / d) * k).toFixed(3));
            el.style.setProperty("--ey", ((dy / d) * k).toFixed(3));
        };
        const onMove = (e: PointerEvent) => {
            x = e.clientX; y = e.clientY;
            if (!frame) frame = requestAnimationFrame(update);
        };
        addEventListener("pointermove", onMove, { passive: true });
        return () => { removeEventListener("pointermove", onMove); if (frame) cancelAnimationFrame(frame); };
    }, []);

    // Each iris can move about half its width sideways and a little up and down before the lids cover it
    const iris = "absolute block max-w-none transition-transform duration-150 ease-out motion-reduce:transition-none [transform:translate(calc(var(--ex,0)*48%),calc(var(--ey,0)*14%))]";

    return (
        <div ref={ref} className="relative w-full aspect-square overflow-hidden rounded-[20px] bg-[#BFC0C2]">
            <img src="/images/portrait/whites-l.webp" alt="" aria-hidden="true" width={134} height={31} className="absolute block max-w-none" style={box(426, 190, 171, 40)} />
            <img src="/images/portrait/whites-r.webp" alt="" aria-hidden="true" width={134} height={31} className="absolute block max-w-none" style={box(426, 190, 171, 40)} />
            <img src="/images/portrait/iris-l.webp" alt="" aria-hidden="true" width={18} height={19} className={iris} style={box(449, 203, 23, 24)} />
            <img src="/images/portrait/iris-r.webp" alt="" aria-hidden="true" width={18} height={17} className={iris} style={box(552, 193, 23, 22)} />
            <img src="/images/portrait/face.webp" alt={alt} width={800} height={800} fetchPriority="high" className="absolute inset-0 block w-full h-full" />
        </div>
    );
}
