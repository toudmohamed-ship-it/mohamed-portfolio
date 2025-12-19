import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/data";
import FinalCTA from "@/components/sections/FinalCTA";
import { ArrowLeft, CheckCircle2, ChevronRight, BarChart, Settings, Code, FileText } from "lucide-react";

interface Props {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    return CASE_STUDIES.map((study) => ({
        slug: study.slug,
    }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const study = CASE_STUDIES.find((s) => s.slug === slug);

    if (!study) return { title: "Case Study Not Found" };

    return {
        title: `${study.title} | Case Study`,
        description: study.summary,
    };
}

export default async function CaseStudyPage({ params }: Props) {
    const { slug } = await params;
    const study = CASE_STUDIES.find((s) => s.slug === slug);

    if (!study) {
        notFound();
    }

    return (
        <>
            {/* Header / Intro */}
            <section className="bg-navy-50 py-20 border-b border-navy-100">
                <div className="container-custom">
                    <Link href="/portfolio" className="inline-flex items-center text-sm font-medium text-navy-500 hover:text-brand-purple mb-8 transition-colors">
                        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Portfolio
                    </Link>
                    <div className="max-w-4xl">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {study.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white border border-navy-200 rounded-full text-xs font-semibold text-navy-700">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-navy-900 mb-6 leading-tight">
                            {study.title}
                        </h1>
                        <p className="text-xl text-navy-600 leading-relaxed max-w-3xl">
                            {study.summary}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 bg-white">
                <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Left Column: Narrative */}
                    <div className="lg:col-span-8 space-y-16">

                        {/* Challenge */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-serif font-bold text-navy-900 flex items-center gap-3">
                                <div className="p-2 bg-red-50 text-red-600 rounded-lg"><BarChart size={24} /></div>
                                The Challenge
                            </h2>
                            <p className="text-lg text-navy-600 leading-relaxed border-l-4 border-navy-100 pl-6">
                                {study.challenge}
                            </p>
                        </div>

                        {/* Approach */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-serif font-bold text-navy-900 flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Settings size={24} /></div>
                                My Approach
                            </h2>
                            <p className="text-lg text-navy-600 leading-relaxed">
                                {study.approach}
                            </p>
                        </div>

                        {/* Methodology / Actions (Simulated for this template based on approach) */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-serif font-bold text-navy-900 flex items-center gap-3">
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Code size={24} /></div>
                                Key Actions Taken
                            </h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <li className="flex items-start gap-3 bg-navy-50 p-4 rounded-lg">
                                    <CheckCircle2 size={18} className="text-green-600 mt-1 shrink-0" />
                                    <span className="text-navy-700 text-sm">Conducted comprehensive audit</span>
                                </li>
                                <li className="flex items-start gap-3 bg-navy-50 p-4 rounded-lg">
                                    <CheckCircle2 size={18} className="text-green-600 mt-1 shrink-0" />
                                    <span className="text-navy-700 text-sm">Fixed indexation & crawl issues</span>
                                </li>
                                <li className="flex items-start gap-3 bg-navy-50 p-4 rounded-lg">
                                    <CheckCircle2 size={18} className="text-green-600 mt-1 shrink-0" />
                                    <span className="text-navy-700 text-sm">Optimized site architecture</span>
                                </li>
                                <li className="flex items-start gap-3 bg-navy-50 p-4 rounded-lg">
                                    <CheckCircle2 size={18} className="text-green-600 mt-1 shrink-0" />
                                    <span className="text-navy-700 text-sm">Implemented structured data</span>
                                </li>
                            </ul>
                        </div>

                        {/* Comparison Metrics Table (Conditional) */}
                        {(study as any).comparisonMetrics && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-serif font-bold text-navy-900">Before & After Performance</h2>
                                <div className="overflow-hidden rounded-xl border border-navy-100 shadow-sm">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-navy-50 border-b border-navy-100">
                                                <th className="p-4 text-sm font-semibold text-navy-600">Metric</th>
                                                <th className="p-4 text-sm font-semibold text-navy-600">Before</th>
                                                <th className="p-4 text-sm font-bold text-brand-purple">After Optimization</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(study as any).comparisonMetrics.map((metric: any, i: number) => (
                                                <tr key={i} className="border-b border-navy-100 last:border-0 hover:bg-navy-50/50 transition-colors">
                                                    <td className="p-4 text-navy-900 font-medium">{metric.label}</td>
                                                    <td className="p-4 text-navy-500 font-mono text-sm">{metric.before}</td>
                                                    <td className="p-4 text-navy-900 font-bold font-mono text-sm bg-purple-50/30">{metric.after}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}




                        {/* Gallery / Screenshots */}
                        {(study as any).gallery && (study as any).gallery.length > 0 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-serif font-bold text-navy-900">Performance Evidence</h2>
                                <div className="grid grid-cols-1 gap-6">
                                    {(study as any).gallery.map((image: any, index: number) => (
                                        <div key={index} className="relative rounded-xl overflow-hidden shadow-md border border-navy-100 bg-navy-50">
                                            <Image
                                                src={image.src}
                                                alt={image.alt}
                                                width={1200}
                                                height={800}
                                                className="w-full h-auto"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Confidentiality Warning */}
                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 flex gap-4 items-start">
                            <FileText className="text-amber-600 shrink-0 mt-1" size={24} />
                            <div>
                                <h4 className="font-bold text-amber-900 text-sm uppercase tracking-wide mb-1">Confidentiality Note</h4>
                                <p className="text-amber-800 text-sm">
                                    This project is presented anonymously due to client confidentiality agreements. Specific names and proprietary data have been generalized.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Results & Info */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Results Card */}
                        <div className="bg-navy-900 text-white rounded-2xl p-8 shadow-xl">
                            <h3 className="text-xl font-bold mb-6 border-b border-navy-700 pb-4">Key Results</h3>
                            <div className="space-y-6">
                                {study.results.map((result, idx) => (
                                    <div key={idx}>
                                        <p className="text-3xl font-bold text-brand-purple-light mb-1">
                                            {/* Extract number if possible, else generic icon/bullet */}
                                            {idx + 1}
                                        </p>
                                        <p className="text-navy-100 font-medium">{result}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tools Used */}
                        <div className="bg-white border border-navy-100 rounded-2xl p-8 shadow-sm">
                            <h3 className="text-sm font-bold text-navy-400 uppercase tracking-wider mb-6">Tools Used</h3>
                            <div className="flex flex-wrap gap-2">
                                {study.tools.map(tool => (
                                    <span key={tool} className="px-3 py-1.5 bg-navy-50 text-navy-700 rounded-lg text-xs font-semibold uppercase tracking-wide">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-white">
                <FinalCTA
                    title="Discuss Your Project"
                    description="Ready to achieve similar results for your business? Let's talk strategy."
                    buttonText="Book a Free Discovery Call"
                />
            </section>
        </>
    );
}
