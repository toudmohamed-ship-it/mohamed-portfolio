import PageHeader from "@/components/ui/PageHeader";
import Link from "next/link";
import Button from "@/components/ui/Button";
import FinalCTA from "@/components/sections/FinalCTA";
import { ArrowRight } from "lucide-react";
import { CASE_STUDIES } from "@/lib/data";

export const metadata = {
    title: "Portfolio | Proven SEO Results & Case Studies",
    description: "Real SEO results and case studies across Technical SEO, Local SEO, content strategy, and performance analytics. Proven growth for international businesses and service-based companies.",
    keywords: ["SEO Case Studies", "SEO Portfolio", "Proven SEO Results", "Technical SEO Examples", "Local SEO Success Stories"],
    openGraph: {
        title: "SEO Portfolio & Case Studies | Mohamed Toudghi",
        description: "Proven SEO results across international clients including marketplace optimization, local service businesses, and SaaS launches.",
        images: ['/og-image.jpg'],
    },
    alternates: {
        canonical: 'https://mohamed-toudghi.com/portfolio',
    },
};

export default function PortfolioPage() {
    return (
        <>
            <PageHeader
                title="Portfolio"
                subtitle="Selected projects across SEO, website optimization, and performance analytics."
                supportingText="Some projects are presented in anonymized or descriptive form due to confidentiality."
            />

            <section className="py-20 bg-F9FAFB">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {CASE_STUDIES.map((study) => (
                            <Link
                                key={study.slug}
                                href={`/portfolio/${study.slug}`}
                                className="group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-navy-100 hover:-translate-y-1"
                            >
                                <div className="p-8 flex flex-col h-full">
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {study.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 text-xs font-medium text-navy-600 bg-navy-50 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-brand-purple transition-colors">
                                        {study.title}
                                    </h3>
                                    <p className="text-navy-600 text-sm leading-relaxed mb-8 flex-grow">
                                        {study.summary}
                                    </p>
                                    <div className="mt-auto">
                                        <Button variant="ghost" size="sm" className="pl-0 hover:bg-transparent text-brand-purple font-semibold flex items-center gap-2">
                                            View Case Study <ArrowRight size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-16 text-center max-w-2xl mx-auto">
                        <p className="text-sm text-navy-400 leading-relaxed">
                            Projects include a mix of in-house roles, collaborative work, and project-based contributions. Details are summarized to respect client confidentiality.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <FinalCTA
                    title="Ready to explore how this could work for your business?"
                    description="Let’s discuss your goals and identify where SEO and analytics can have the most impact."
                    buttonText="Book a Free Discovery Call"
                />
            </section>
        </>
    );
}
