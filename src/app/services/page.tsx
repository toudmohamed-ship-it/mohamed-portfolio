import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Link from "next/link";
import FinalCTA from "@/components/sections/FinalCTA";
import { Search, Globe, MapPin, BarChart2, Code2, LayoutDashboard, Database, Target, LineChart } from "lucide-react";

export const metadata = {
    title: "SEO Services | Technical Audits, Local SEO & Analytics Setup",
    description: "Explore proven SEO results and case studies across Technical SEO, Local SEO, and analytics. Real growth stories for international businesses.",
    keywords: ["SEO Services Morocco", "Technical SEO Audit", "Local SEO Services", "Google Analytics Setup", "Website Optimization Services", "SEO Consultant"],
    openGraph: {
        title: "SEO & Digital Marketing Services | Mohamed Toudghi",
        description: "Get in touch for expert SEO audits and digital marketing consulting. Free 15-minute discovery calls available for international clients.",
        images: ['/og-image.jpg'],
    },
    alternates: {
        canonical: 'https://www.mohamedtoudghi.com/services',
    },
};

const SERVICES_DATA = [
    {
        icon: Search,
        title: "Technical SEO Audit & Fixes",
        description: "I analyze your website’s technical foundation to uncover issues affecting crawlability, indexation, and performance — then provide clear, actionable fixes.",
        bestFor: "Best for websites with indexing, crawlability, or performance issues.",
        deliverables: [
            "Full website crawl & technical error analysis",
            "Indexing, crawlability & canonical fixes",
            "Core Web Vitals & performance recommendations",
            "Schema & structured data implementation guidance",
            "Internal linking & site architecture optimization",
        ],
    },
    {
        icon: LayoutDashboard,
        title: "Keyword Research & Content Strategy",
        description: "I build data-backed content strategies that target real search intent — so you stop guessing and start capturing qualified traffic.",
        bestFor: "Best for businesses struggling to attract qualified organic traffic.",
        deliverables: [
            "Search intent & SERP analysis",
            "Competitor gap analysis",
            "Topic clustering & content roadmap",
            "Detailed SEO content briefs",
            "Optimization of existing content",
        ],
    },
    {
        icon: MapPin,
        title: "Local SEO (Google Business Profile)",
        description: "I help service-based businesses increase local visibility and generate more calls through optimized local SEO foundations.",
        bestFor: "Best for service-based businesses targeting local customers.",
        deliverables: [
            "Google Business Profile optimization",
            "Citation cleanup & consistency",
            "Local landing page strategy",
            "Review management framework",
            "Local Map Pack visibility improvement",
        ],
    },
    {
        icon: Globe,
        title: "International SEO",
        description: "I support businesses expanding into new markets with structured, search-engine-friendly international SEO setups.",
        bestFor: "Best for companies expanding into new language or geographic markets.",
        deliverables: [
            "Hreflang implementation guidance",
            "Multilingual URL structure planning",
            "Geo-targeting setup in Search Console",
            "Market-specific keyword research",
            "Content localization recommendations",
        ],
    },
    {
        icon: BarChart2,
        title: "Tracking & Analytics Setup",
        description: "I set up clean, reliable tracking so you understand exactly how users interact with your website and where conversions happen.",
        bestFor: "Best for teams that need clean, reliable performance data.",
        deliverables: [
            "GA4 advanced configuration",
            "Google Tag Manager setup",
            "Custom event & conversion tracking",
            "Looker Studio dashboards",
            "Conversion funnel visualization",
        ],
    },
    {
        icon: Code2,
        title: "Website Optimization (WordPress)",
        description: "I optimize WordPress websites to load faster, perform better in search, and convert visitors more effectively.",
        bestFor: "Best for WordPress sites needing speed, security, and conversion improvements.",
        deliverables: [
            "WordPress configuration & security best practices",
            "Speed optimization (caching, performance)",
            "UX/UI assessment & improvements",
            "Conversion rate optimization (CRO)",
            "Mobile responsiveness fixes",
        ],
    },
];

export default function ServicesPage() {
    return (
        <>
            <PageHeader
                title="My Services"
                subtitle="I help service-based businesses, startups, and growing teams solve technical SEO issues, capture high-intent traffic, and turn website visits into measurable results."
                supportingText="Each service is tailored to your business goals, technical setup, and market — no generic packages."
            />

            {/* How I Work Section */}
            <section className="py-20 bg-white border-b border-navy-100">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-serif font-bold text-navy-900 mb-4">How I Work</h2>
                        <p className="text-navy-600">A data-driven process designed for transparency and results.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-navy-50 rounded-2xl p-8 border border-navy-100 relative group hover:shadow-lg transition-all">
                            <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-serif font-bold text-navy-900 leading-none pointer-events-none">1</div>
                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-brand-purple mb-6 shadow-sm">
                                <Database size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-navy-900 mb-4 relative z-10">Audit & Analysis</h3>
                            <p className="text-navy-600 relative z-10">
                                I start by identifying technical issues, search opportunities, and performance gaps using data and proven frameworks.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-navy-50 rounded-2xl p-8 border border-navy-100 relative group hover:shadow-lg transition-all">
                            <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-serif font-bold text-navy-900 leading-none pointer-events-none">2</div>
                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-brand-purple mb-6 shadow-sm">
                                <Target size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-navy-900 mb-4 relative z-10">Strategy</h3>
                            <p className="text-navy-600 relative z-10">
                                Based on findings, I design a clear SEO and growth strategy aligned with your business objectives.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-navy-50 rounded-2xl p-8 border border-navy-100 relative group hover:shadow-lg transition-all">
                            <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-serif font-bold text-navy-900 leading-none pointer-events-none">3</div>
                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-brand-purple mb-6 shadow-sm">
                                <LineChart size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-navy-900 mb-4 relative z-10">Execution & Measurement</h3>
                            <p className="text-navy-600 relative z-10">
                                Implementation is tracked, measured, and refined to ensure real, sustainable results.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Services Section */}
            <section className="py-20 md:py-32 bg-navy-50">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-serif font-bold text-navy-900 mb-4">Core Services</h2>
                        <p className="text-navy-600 font-medium">Practical, execution-focused SEO and digital growth services.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {SERVICES_DATA.map((service, index) => (
                            <div key={index} className="flex flex-col h-full bg-white border border-navy-100 rounded-2xl p-8 hover:shadow-xl hover:border-brand-purple/20 transition-all duration-300">
                                <div className="w-14 h-14 bg-navy-50 rounded-xl flex items-center justify-center text-brand-purple mb-6">
                                    <service.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-navy-900 mb-2">{service.title}</h3>
                                <p className="text-sm font-medium text-brand-purple mb-4">{service.bestFor}</p>
                                <p className="text-navy-600 mb-8 flex-grow leading-relaxed">{service.description}</p>

                                <div className="bg-navy-50 rounded-xl p-6 mb-8">
                                    <h4 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4">What You Get:</h4>
                                    <ul className="space-y-3">
                                        {service.deliverables.map((item) => (
                                            <li key={item} className="flex items-start gap-2 text-sm text-navy-700">
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-purple mt-1.5 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-auto space-y-4">
                                    <Link href="/contact" className="w-full block">
                                        <Button variant="outline" className="w-full">Request a Quote</Button>
                                    </Link>
                                    <Link href="/contact" className="block text-center text-sm font-medium text-navy-500 hover:text-brand-purple transition-colors">
                                        Discuss My Project
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who It's For Section */}
            <section className="py-20 bg-navy-900 text-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-white">Who I Work With</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                                <h3 className="text-xl font-bold mb-2 text-brand-purple-light">Service-based businesses</h3>
                                <p className="text-navy-200">Looking to increase local visibility and generate more qualified leads.</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                                <h3 className="text-xl font-bold mb-2 text-brand-purple-light">Startups & small teams</h3>
                                <p className="text-navy-200">Need expert guidance to build scalable growth foundations.</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                                <h3 className="text-xl font-bold mb-2 text-brand-purple-light">Optimizers</h3>
                                <p className="text-navy-200">Companies with existing traffic but low conversion rates needing CRO.</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                                <h3 className="text-xl font-bold mb-2 text-brand-purple-light">Growth Seekers</h3>
                                <p className="text-navy-200">Businesses needing clarity, structure, and a data-backed roadmap.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-white">
                <FinalCTA
                    title="Ready to improve your visibility and performance?"
                    description={
                        <div className="space-y-6">
                            <p>Let’s discuss your goals and identify where SEO and analytics can create the most impact.</p>
                            <p className="text-sm md:text-base text-navy-300 max-w-2xl mx-auto italic">
                                Experience across international platforms and service-based businesses. <br className="hidden md:block" />Some projects presented anonymously due to confidentiality.
                            </p>
                        </div>
                    }
                    buttonText="Book a Free Discovery Call"
                />
            </section>
        </>
    );
}
