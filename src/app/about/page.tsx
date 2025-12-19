import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import { Download, CheckCircle2 } from "lucide-react";

export const metadata = {
    title: "About | SEO Expert & Data-Driven Digital Marketer",
    description: "Discover Mohamed Toudghi's journey to becoming a leading SEO Specialist. Expert in Technical SEO, Analytics, and Digital Marketing with proven results.",
    keywords: ["About Mohamed Toudghi", "SEO Expert Background", "Digital Marketing Experience", "Al Akhawayn University", "SEO Certifications"],
    openGraph: {
        title: "About Mohamed Toudghi | SEO Expert Journey",
        description: "Learn about my journey from AUI to becoming a leading SEO Specialist with expertise in Technical SEO, Analytics, and Digital Marketing.",
        images: ['/og-image.jpg'],
    },
    alternates: {
        canonical: 'https://www.mohamedtoudghi.com/about',
    },
};

export default function AboutPage() {
    const skills = {
        "SEO & Content": [
            "Technical SEO Audits",
            "On-Page Optimization",
            "Keyword Research & Strategy",
            "Content Clustering",
            "Local SEO (GBP)",
            "International SEO (Hreflang)",
        ],
        "Analytics & Data": [
            "Google Analytics 4 (GA4)",
            "Google Tag Manager (GTM)",
            "Google Search Console",
            "Looker Studio / Data Studio",
            "Conversion Rate Optimization (CRO)",
            "User Behavior Analysis",
        ],
        "Tools & Platforms": [
            "SEMrush / Ahrefs",
            "Screaming Frog",
            "WordPress / Elementor",
            "Shopify SEO",
            "HubSpot CRM",
            "Google Ads",
        ],
    };

    const certifications = [
        "Google Analytics Certification",
        "Google Ads Search & Display",
        "Semrush Keyword Research",
        "HubSpot Email Marketing",
        "BrightLocal Local SEO",
    ];

    return (
        <>
            <PageHeader
                title="About Me"
                subtitle="I’m a data-obsessed marketer who believes that every click should have a purpose."
            />

            <section className="py-20 bg-white">
                <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Bio Section */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-serif font-bold text-navy-900">
                            My Journey
                        </h2>
                        <div className="prose prose-lg text-navy-600 prose-headings:text-navy-900">
                            <p>
                                My professional journey began at <strong>Al Akhawayn University (AUI)</strong>, where I developed a strong foundation in critical thinking and communication. This academic background served as the launchpad for my career in the digital landscape.
                            </p>
                            <p>
                                Starting with internships that exposed me to the fast-paced world of digital marketing, I quickly realized that <strong>data</strong> was the missing piece in most marketing strategies. I pivoted to focus specifically on SEO and Analytics, mastering the art of making websites not just visible, but profitable.
                            </p>
                            <p>
                                Today, I work with businesses ranging from local startups to international organizations, helping them navigate the complexities of search algorithms and user behavior. My approach is simple: <strong>make decisions based on data, not guesses.</strong>
                            </p>
                        </div>

                        <div className="pt-4">
                            <h3 className="text-xl font-bold text-navy-900 mb-4">Languages</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2"><span className="w-24 font-semibold text-navy-900">Arabic</span> <span className="text-navy-500">Native</span></li>
                                <li className="flex items-center gap-2"><span className="w-24 font-semibold text-navy-900">English</span> <span className="text-navy-500">Professional (C1)</span></li>
                                <li className="flex items-center gap-2"><span className="w-24 font-semibold text-navy-900">French</span> <span className="text-navy-500">Advanced (B2)</span></li>
                            </ul>
                        </div>

                        <div className="pt-6">
                            <a href="/resume.pdf" download="Mohamed_Toudghi_Resume.pdf">
                                <Button>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Resume
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-8">
                                Technical Expertise
                            </h2>
                            <div className="grid grid-cols-1 gap-8">
                                {Object.entries(skills).map(([category, items]) => (
                                    <div key={category} className="bg-navy-50 p-6 rounded-xl">
                                        <h3 className="text-xl font-bold text-brand-purple mb-4">{category}</h3>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {items.map((skill) => (
                                                <li key={skill} className="flex items-start gap-2 text-sm font-medium text-navy-700">
                                                    <CheckCircle2 className="h-4 w-4 text-brand-purple mt-0.5 shrink-0" />
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Certifications */}
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-navy-900 mb-6">Certifications</h3>
                            <div className="flex flex-wrap gap-3">
                                {certifications.map((cert) => (
                                    <span
                                        key={cert}
                                        className="px-4 py-2 bg-white border border-navy-200 rounded-full text-sm font-medium text-navy-600 shadow-sm"
                                    >
                                        {cert}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
