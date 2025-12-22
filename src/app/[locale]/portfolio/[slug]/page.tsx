import { Link } from "@/i18n/routing";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/data";
import FinalCTA from "@/components/sections/FinalCTA";
import { ArrowLeft, CheckCircle2, ChevronRight, BarChart, Settings, Code, FileText } from "lucide-react";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

interface Props {
    params: {
        slug: string;
        locale: string;
    };
}

// Generate Static Params for all locales and slugs
export async function generateStaticParams() {
    return CASE_STUDIES.map((study) => ({
        slug: study.slug,
    }));
}

// Dynamic Metadata
export async function generateMetadata({ params }: Props) {
    const { slug, locale } = await params;
    const t = await getTranslations({ locale, namespace: 'CaseStudies' });
    const study = CASE_STUDIES.find((s) => s.slug === slug);

    if (!study) return { title: "Case Study Not Found" };

    return {
        title: `${t(`${study.slug}.title`)} | Case Study`,
        description: t(`${study.slug}.summary`),
    };
}

export default async function CaseStudyPage({ params }: Props) {
    const { slug, locale } = await params;
    // Enable static rendering
    setRequestLocale(locale);

    const study = CASE_STUDIES.find((s) => s.slug === slug);

    if (!study) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: 'CaseStudies' });
    const tUI = await getTranslations({ locale, namespace: 'CaseStudyPage' });
    const tCommon = await getTranslations({ locale, namespace: 'HomePage.FinalCTA' });

    // Helper to get array from translation object safely
    const getResultItems = (slug: string) => {
        const items = [];
        // Use the actual data length to determine how many items to look for
        const count = study.results.length;
        for (let i = 0; i < count; i++) {
            try {
                const val = t(`${slug}.results.${i}`);
                if (val && val !== `${slug}.results.${i}`) items.push(val);
            } catch (e) { break; }
        }
        return items;
    };

    // Safely get gallery alt texts
    const getGalleryAlts = (slug: string) => {
        const alts: Record<string, string> = {};
        // Use the actual gallery length to determine how many items to look for
        // Using "gallery" length as proxy for gallery_alts since they should match
        const count = (study as any).gallery ? (study as any).gallery.length : 0;
        for (let i = 0; i < count; i++) {
            try {
                const val = t(`${slug}.gallery_alts.${i}`);
                if (val && val !== `${slug}.gallery_alts.${i}`) alts[i] = val;
            } catch (e) { break; }
        }
        return alts;
    };

    const resultItems = getResultItems(study.slug);
    const galleryAlts = getGalleryAlts(study.slug);
    const tags = t(`${study.slug}.tags`).split(' • ');

    return (
        <>
            {/* Header / Intro */}
            <section className="bg-navy-50 py-20 border-b border-navy-100">
                <div className="container-custom">
                    <Link href="/portfolio" className="inline-flex items-center text-sm font-medium text-navy-500 hover:text-brand-purple mb-8 transition-colors">
                        <ArrowLeft className="mr-1 h-4 w-4 rtl:rotate-180" /> {tUI('back_to_portfolio')}
                    </Link>
                    <div className="max-w-4xl">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1 bg-white border border-navy-200 rounded-full text-xs font-semibold text-navy-700">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-navy-900 mb-6 leading-tight">
                            {t(`${study.slug}.title`)}
                        </h1>
                        <p className="text-xl text-navy-600 leading-relaxed max-w-3xl">
                            {t(`${study.slug}.summary`)}
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
                                {tUI('challenge')}
                            </h2>
                            <p className="text-lg text-navy-600 leading-relaxed border-l-4 border-navy-100 pl-6">
                                {t(`${study.slug}.challenge`)}
                            </p>
                        </div>

                        {/* Approach */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-serif font-bold text-navy-900 flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Settings size={24} /></div>
                                {tUI('approach')}
                            </h2>
                            <p className="text-lg text-navy-600 leading-relaxed">
                                {t(`${study.slug}.approach`)}
                            </p>
                        </div>

                        {/* Methodology / Actions (Simulated for this template based on approach) */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-serif font-bold text-navy-900 flex items-center gap-3">
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Code size={24} /></div>
                                {tUI('key_actions')}
                            </h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <li className="flex items-start gap-3 bg-navy-50 p-4 rounded-lg">
                                    <CheckCircle2 size={18} className="text-green-600 mt-1 shrink-0" />
                                    <span className="text-navy-700 text-sm">{tUI('actions.audit')}</span>
                                </li>
                                <li className="flex items-start gap-3 bg-navy-50 p-4 rounded-lg">
                                    <CheckCircle2 size={18} className="text-green-600 mt-1 shrink-0" />
                                    <span className="text-navy-700 text-sm">{tUI('actions.indexation')}</span>
                                </li>
                                <li className="flex items-start gap-3 bg-navy-50 p-4 rounded-lg">
                                    <CheckCircle2 size={18} className="text-green-600 mt-1 shrink-0" />
                                    <span className="text-navy-700 text-sm">{tUI('actions.architecture')}</span>
                                </li>
                                <li className="flex items-start gap-3 bg-navy-50 p-4 rounded-lg">
                                    <CheckCircle2 size={18} className="text-green-600 mt-1 shrink-0" />
                                    <span className="text-navy-700 text-sm">{tUI('actions.structured_data')}</span>
                                </li>
                            </ul>
                        </div>

                        {/* Comparison Metrics Table (Conditional) */}
                        {(study as any).comparisonMetrics && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-serif font-bold text-navy-900">{tUI('before_after')}</h2>
                                <div className="overflow-hidden rounded-xl border border-navy-100 shadow-sm">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-navy-50 border-b border-navy-100">
                                                <th className="p-4 text-sm font-semibold text-navy-600">{tUI('metric')}</th>
                                                <th className="p-4 text-sm font-semibold text-navy-600">{tUI('before')}</th>
                                                <th className="p-4 text-sm font-bold text-brand-purple">{tUI('after_optimization')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Note: Comparison metrics hard to fully translate dynamically without structure change. 
                                                For now we render them as is from JSON if they existed there, but they are in data.ts.
                                                We added them to JSON for one item. We will try to fetch from JSON if available.
                                            */}
                                            {(study as any).comparisonMetrics.map((metric: any, i: number) => {
                                                // Try to fetch translated match if available
                                                let label = metric.label;
                                                let before = metric.before;
                                                let after = metric.after;
                                                try {
                                                    const m = t.raw(`${study.slug}.comparisonMetrics.${i}`);
                                                    if (m) {
                                                        label = m.label;
                                                        before = m.before;
                                                        after = m.after;
                                                    }
                                                } catch (e) { }

                                                return (
                                                    <tr key={i} className="border-b border-navy-100 last:border-0 hover:bg-navy-50/50 transition-colors">
                                                        <td className="p-4 text-navy-900 font-medium">{label}</td>
                                                        <td className="p-4 text-navy-500 font-mono text-sm">{before}</td>
                                                        <td className="p-4 text-navy-900 font-bold font-mono text-sm bg-purple-50/30">{after}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}




                        {/* Gallery / Screenshots */}
                        {(study as any).gallery && (study as any).gallery.length > 0 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-serif font-bold text-navy-900">{tUI('performance_evidence')}</h2>
                                <div className="grid grid-cols-1 gap-6">
                                    {(study as any).gallery.map((image: any, index: number) => (
                                        <div key={index} className="relative rounded-xl overflow-hidden shadow-md border border-navy-100 bg-navy-50">
                                            <Image
                                                src={image.src}
                                                alt={galleryAlts[index] || image.alt}
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
                                <h4 className="font-bold text-amber-900 text-sm uppercase tracking-wide mb-1">{tUI('confidentiality.title')}</h4>
                                <p className="text-amber-800 text-sm">
                                    {tUI('confidentiality.text')}
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Results & Info */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Results Card */}
                        <div className="bg-navy-900 text-white rounded-2xl p-8 shadow-xl">
                            <h3 className="text-xl font-bold mb-6 border-b border-navy-700 pb-4">{tUI('key_results')}</h3>
                            <div className="space-y-6">
                                {resultItems.map((result, idx) => (
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
                            <h3 className="text-sm font-bold text-navy-400 uppercase tracking-wider mb-6">{tUI('tools_used')}</h3>
                            <div className="flex flex-wrap gap-2">
                                {study.tools?.map((tool: any) => (
                                    <span key={tool} className="px-3 py-1.5 bg-navy-50 text-navy-700 rounded-lg text-xs font-semibold uppercase tracking-wide">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Related Case Studies */}
            <section className="py-16 bg-navy-50">
                <div className="container-custom">
                    <h2 className="text-2xl font-serif font-bold text-navy-900 mb-8">Related Case Studies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {CASE_STUDIES.filter(s => s.slug !== study.slug).slice(0, 3).map((relatedStudy) => (
                            <Link
                                key={relatedStudy.slug}
                                href={`/portfolio/${relatedStudy.slug}`}
                                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group border border-navy-100"
                            >
                                <div className={`w-full h-2 ${relatedStudy.imageColor} rounded-full mb-4`}></div>
                                <h3 className="font-bold text-navy-900 mb-2 group-hover:text-brand-purple transition-colors">
                                    {t(`${relatedStudy.slug}.title`)}
                                </h3>
                                <p className="text-sm text-navy-600 line-clamp-2">
                                    {t(`${relatedStudy.slug}.summary`)}
                                </p>
                                <span className="inline-flex items-center text-sm font-semibold text-brand-purple mt-4">
                                    View Case Study <ChevronRight className="ml-1 h-4 w-4 rtl:rotate-180" />
                                </span>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link href="/portfolio" className="inline-flex items-center text-brand-purple font-semibold hover:underline">
                            View All Case Studies <ChevronRight className="ml-1 h-4 w-4 rtl:rotate-180" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-white">
                <FinalCTA
                    title={tCommon('title')}
                    description={tCommon('description')}
                    buttonText={tCommon('button')}
                />
            </section>
        </>
    );
}
