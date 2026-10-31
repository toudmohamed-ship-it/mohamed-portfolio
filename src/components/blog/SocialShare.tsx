"use client";

import { useState } from "react";
import { Linkedin, MessageCircle, Link2, Check } from "lucide-react";

interface SocialShareProps {
    url: string;
    title: string;
    labels: { share: string; copy: string; copied: string };
}

export default function SocialShare({ url, title, labels }: SocialShareProps) {
    const [copied, setCopied] = useState(false);
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const links = [
        { name: "LinkedIn", icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
        { name: "WhatsApp", icon: MessageCircle, href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
    ];

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* clipboard blocked: nothing to do */
        }
    };

    const btn = "w-11 h-11 rounded-full border border-line bg-white flex items-center justify-center text-ink-soft hover:text-forest hover:border-forest transition-colors";

    return (
        <div className="flex items-center gap-2.5">
            <span className="text-sm text-muted me-1">{labels.share}</span>
            {links.map((l) => (
                <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" className={btn} aria-label={`${labels.share}: ${l.name}`}>
                    <l.icon size={18} aria-hidden="true" />
                </a>
            ))}
            <button type="button" onClick={copy} className={btn} aria-label={copied ? labels.copied : labels.copy}>
                {copied ? <Check size={18} aria-hidden="true" /> : <Link2 size={18} aria-hidden="true" />}
            </button>
            <span className="sr-only" aria-live="polite">{copied ? labels.copied : ""}</span>
        </div>
    );
}
