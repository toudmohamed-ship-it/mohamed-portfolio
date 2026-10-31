"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";

function rabatTime() {
    try {
        return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Casablanca" }).format(new Date());
    } catch {
        return "";
    }
}

// "Rabat · 14:32 · replies within a day". The time is filled in after mount to avoid a hydration mismatch.
export default function LocalTime({ className }: { className?: string }) {
    const t = useTranslations("HomePage.nav");
    const [time, setTime] = useState("");

    useEffect(() => {
        setTime(rabatTime());
        const id = setInterval(() => setTime(rabatTime()), 30000);
        return () => clearInterval(id);
    }, []);

    return (
        <span
            className={clsx(
                "items-center gap-2 font-mono text-xs text-ink-soft bg-white border border-line rounded-full px-3 py-1.5 whitespace-nowrap",
                className?.includes("hidden") ? "" : "inline-flex",
                className
            )}
        >
            <span className="breathe inline-block w-[7px] h-[7px] rounded-full bg-forest" aria-hidden="true" />
            {t("city")}
            {time && <span> · <time>{time}</time></span>}
            <span> · {t("replies")}</span>
        </span>
    );
}
