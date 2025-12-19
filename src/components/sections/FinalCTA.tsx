"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";

interface FinalCTAProps {
    title?: string;
    description?: React.ReactNode;
    buttonText?: string;
}

export default function FinalCTA({
    title = "Ready to improve your search visibility?",
    description = (
        <>
            Ready to improve your organic visibility and performance? <br className="hidden md:block" />
            Let&apos;s discuss how data-driven SEO can support your business goals.
        </>
    ),
    buttonText = "Contact Me"
}: FinalCTAProps) {
    return (
        <section className="py-24 bg-navy-900 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05] -z-0 pointer-events-none" />

            <div className="container-custom relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white">
                    {title}
                </h2>
                <div className="text-xl text-navy-200 mb-10 leading-relaxed">
                    {description}
                </div>
                <Link href="/contact">
                    <Button variant="primary" size="lg" className="bg-white text-brand-purple hover:bg-navy-50 text-lg px-8 py-4 h-auto font-bold">
                        {buttonText}
                    </Button>
                </Link>
            </div>
        </section>
    );
}
