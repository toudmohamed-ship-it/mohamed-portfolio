"use client";

import { MessageCircle } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";

// Quiet floating WhatsApp shortcut: no pulsing badge, appears after a short fade.
export default function WhatsAppButton() {
    return (
        <a
            href={PERSONAL_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="in d6 btn fixed bottom-6 end-6 z-40 flex items-center justify-center w-13 h-13 bg-forest text-white rounded-full shadow-[0_12px_28px_-12px_rgba(31,77,62,.7)] hover:bg-forest-deep hover:text-white"
            aria-label="WhatsApp"
        >
            <MessageCircle size={24} />
        </a>
    );
}
