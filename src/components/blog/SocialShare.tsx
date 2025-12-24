"use client";

import { Linkedin, MessageCircle, Link2 } from "lucide-react";

interface SocialShareProps {
    url: string;
    title: string;
}

export default function SocialShare({ url, title }: SocialShareProps) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: "LinkedIn",
            icon: Linkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: "hover:bg-[#0077b5]",
        },
        {
            name: "WhatsApp",
            icon: MessageCircle,
            href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
            color: "hover:bg-[#25D366]",
        },
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        // Could add a toast here
    };

    return (
        <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] mr-2">Share</span>
            {shareLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full glass border border-border-subtle flex items-center justify-center text-text-secondary transition-all ${link.color} hover:text-white hover:border-transparent`}
                    title={`Share on ${link.name}`}
                >
                    <link.icon size={18} />
                </a>
            ))}
            <button
                onClick={copyToClipboard}
                className="w-10 h-10 rounded-full glass border border-border-subtle flex items-center justify-center text-text-secondary transition-all hover:bg-brand-purple hover:text-white hover:border-transparent"
                title="Copy Link"
            >
                <Link2 size={18} />
            </button>
        </div>
    );
}
