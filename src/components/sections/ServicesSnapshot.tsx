"use client";

import Link from "next/link";
import { Search, BarChart3, Settings, Layout, ArrowRight, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";

const services = [
    {
        icon: Search,
        title: "Technical SEO",
        description: "Audits, indexation fixes, crawl optimization, site structure, and Core Web Vitals improvements.",
    },
    {
        icon: BarChart3,
        title: "Analytics & Tracking",
        description: "GA4, GTM, GSC, event tracking, and Looker Studio dashboards for measurable insights.",
    },
    {
        icon: MapPin,
        title: "Local SEO",
        description: "Google Business Profile optimization, local visibility, and ranking improvements.",
    },
    {
        icon: Layout,
        title: "Website Optimization",
        description: "SEO-friendly WordPress setup, UX improvements, and conversion optimization.",
    },
];

export default function ServicesSnapshot() {
    return (
        <section className="py-20 md:py-32 bg-navy-50">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4">
                            My Expertise
                        </h2>
                        <p className="text-navy-600">
                            I combine technical precision with creative marketing strategies to deliver measurable growth.
                        </p>
                    </div>
                    <Link href="/services">
                        <Button variant="outline">
                            View All Services
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-brand-purple mb-6 group-hover:bg-brand-purple group-hover:text-white transition-colors">
                                <service.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-navy-900 mb-3">
                                {service.title}
                            </h3>
                            <p className="text-sm text-navy-600 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
