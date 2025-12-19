"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

import { CASE_STUDIES } from "@/lib/data";

export default function CaseStudyPreview() {
    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4">
                        Featured Case Studies
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {CASE_STUDIES.slice(0, 3).map((study) => (
                        <Link
                            key={study.slug}
                            href={`/portfolio/${study.slug}`}
                            className="group block"
                        >
                            <div className="relative overflow-hidden rounded-2xl mb-6 shadow-md border border-navy-100">
                                {/* Fallback Placeholder for Image */}
                                <div className={`aspect-[4/3] w-full ${study.imageColor} transition-transform duration-500 group-hover:scale-105 flex items-center justify-center text-white/50`}>
                                    <span className="font-serif text-3xl font-bold opacity-30 px-8 text-center">{study.client}</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex flex-wrap gap-2">
                                    {study.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 text-xs font-medium text-brand-purple bg-purple-50 rounded-md"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-xl font-bold text-navy-900 group-hover:text-brand-purple transition-colors">
                                    {study.title}
                                </h3>
                                <p className="text-navy-600 text-sm line-clamp-2">
                                    {study.summary}
                                </p>
                                <p className="text-sm font-medium text-navy-500 flex items-center gap-1 group-hover:gap-2 transition-all pt-2">
                                    View Case Study <ArrowRight size={14} />
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center">
                    <Link href="/portfolio">
                        <Button variant="outline" size="lg">
                            View All Case Studies
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
