"use client";

import { useEffect } from "react";

const GA_ID = "G-9GBZG4HWN2";

declare global {
    interface Window {
        dataLayer: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

// Lead events (mark them as key events in GA4: Admin, Data display, Events). Clicks load GA first
// (pointerdown runs before click), so gtag is normally ready; if not, the event is skipped.
export function track(event: string, params: Record<string, string> = {}) {
    window.gtag?.("event", event, { ...params, page_location: window.location.href });
}

// Google Analytics 4, loaded after the page is usable: on the first scroll, tap, click or key press,
// or 10 seconds after load (when the browser is idle) at the latest. Keeps analytics out of the critical path:
// it was ~0.7 s of blocking time, and a 4 s fallback still landed inside page-speed measurements.
export default function Analytics() {
    useEffect(() => {
        let loaded = false;
        const events = ["scroll", "pointerdown", "keydown", "touchstart"] as const;

        const load = () => {
            if (loaded) return;
            loaded = true;
            events.forEach((e) => window.removeEventListener(e, load));
            window.dataLayer = window.dataLayer || [];
            window.gtag = function gtag() {
                // eslint-disable-next-line prefer-rest-params
                window.dataLayer.push(arguments);
            };
            window.gtag("js", new Date());
            window.gtag("config", GA_ID);
            const s = document.createElement("script");
            s.async = true;
            s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
            document.head.appendChild(s);
        };

        events.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }));

        // One delegated listener for every WhatsApp, email and phone link on the site
        const onClick = (e: MouseEvent) => {
            const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
            if (!a) return;
            const href = a.getAttribute("href") || "";
            if (href.includes("wa.me")) track("whatsapp_click", { link_url: href });
            else if (href.startsWith("mailto:")) track("email_click");
            else if (href.startsWith("tel:")) track("phone_click");
        };
        document.addEventListener("click", onClick);
        let timer: ReturnType<typeof setTimeout>;
        const arm = () => {
            timer = setTimeout(() => ("requestIdleCallback" in window ? window.requestIdleCallback(load) : load()), 10000);
        };
        if (document.readyState === "complete") arm();
        else window.addEventListener("load", arm, { once: true });

        return () => {
            clearTimeout(timer);
            document.removeEventListener("click", onClick);
            events.forEach((e) => window.removeEventListener(e, load));
            window.removeEventListener("load", arm);
        };
    }, []);

    return null;
}
