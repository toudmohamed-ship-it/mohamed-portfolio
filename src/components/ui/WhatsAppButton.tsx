"use client";

import { MessageCircle } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
    return (
        <motion.a
            href={PERSONAL_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20bd5a] hover:scale-110 transition-all focus:outline-none focus:ring-4 focus:ring-green-300"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 }}
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={28} />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
        </motion.a>
    );
}
