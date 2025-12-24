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
    const locales = ['en', 'fr', 'ar'];
    return locales.flatMap((locale) =>
        CASE_STUDIES.map((study) => ({
            locale,
            slug: study.slug,
        }))
    );
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
        alternates: {
            canonical: `https://www.mohamedtoudghi.com/${locale === 'en' ? '' : locale + '/'}portfolio/${slug}`,
            languages: {
                'en': `https://www.mohamedtoudghi.com/portfolio/${slug}`,
                'fr': `https://www.mohamedtoudghi.com/fr/portfolio/${slug}`,
                'ar': `https://www.mohamedtoudghi.com/ar/portfolio/${slug}`,
            },
        },
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
            <section className="bg-bg-primary py-24 md:py-32 border-b border-border-subtle relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/5 blur-[150px] rounded-full -z-0" />

                <div className="container-custom relative z-10">
                    <Link href="/portfolio" className="inline-flex items-center text-xs font-bold text-text-secondary hover:text-brand-mint mb-12 transition-colors uppercase tracking-[0.2em]">
                        <ArrowLeft className="mr-2 h-4 w-4 rtl:rotate-180" /> {tUI('back_to_portfolio')}
                    </Link>
                    <div className="max-w-4xl space-y-8">
                        <div className="flex flex-wrap gap-3">
                            {tags.map((tag, i) => (
                                <span key={i} className="px-4 py-1.5 bg-brand-mint/5 border border-brand-mint/10 rounded-full text-[10px] font-bold text-brand-mint uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-text-primary leading-[1.1] tracking-tight">
                            {t(`${study.slug}.title`)}
                        </h1>
                        <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-3xl font-light">
                            {t(`${study.slug}.summary`)}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 md:py-40 bg-bg-primary">
                <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Left Column: Narrative */}
                    <div className="lg:col-span-8 space-y-24">

                        {/* Challenge */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-serif font-bold text-text-primary flex items-center gap-4 tracking-tight">
                                <div className="p-3 bg-black/5 dark:bg-white/5 text-brand-purple rounded-2xl border border-border-subtle"><BarChart size={28} /></div>
                                {tUI('challenge')}
                            </h2>
                            <p className="text-lg md:text-xl text-text-secondary leading-relaxed border-l-2 border-brand-purple/30 pl-8">
                                {t(`${study.slug}.challenge`)}
                            </p>
                        </div>

                        {/* Approach */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-serif font-bold text-text-primary flex items-center gap-4 tracking-tight">
                                <div className="p-3 bg-black/5 dark:bg-white/5 text-brand-mint rounded-2xl border border-border-subtle"><Settings size={28} /></div>
                                {tUI('approach')}
                            </h2>
                            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                                {t(`${study.slug}.approach`)}
                            </p>
                        </div>

                        {/* Methodology / Actions */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-serif font-bold text-text-primary flex items-center gap-4 tracking-tight">
                                <div className="p-3 bg-black/5 dark:bg-white/5 text-brand-cyan rounded-2xl border border-border-subtle"><Code size={28} /></div>
                                {tUI('key_actions')}
                            </h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { key: 'audit', icon: 'green' },
                                    { key: 'indexation', icon: 'green' },
                                    { key: 'architecture', icon: 'green' },
                                    { key: 'structured_data', icon: 'green' }
                                ].map((action) => (
                                    <li key={action.key} className="flex items-start gap-4 glass p-6 rounded-2xl border-border-subtle">
                                        <CheckCircle2 size={24} className="text-brand-mint mt-0.5 shrink-0" />
                                        <span className="text-text-secondary font-medium">{tUI(`actions.${action.key}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Comparison Metrics Table */}
                        {(study as any).comparisonMetrics && (
                            <div className="space-y-10">
                                <h2 className="text-3xl font-serif font-bold text-text-primary tracking-tight">{tUI('before_after')}</h2>
                                <div className="overflow-hidden rounded-[2rem] border border-border-subtle shadow-2xl glass">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-black/5 dark:bg-white/5 border-b border-border-subtle">
                                                <th className="p-6 text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">{tUI('metric')}</th>
                                                <th className="p-6 text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">{tUI('before')}</th>
                                                <th className="p-6 text-[10px] font-bold text-brand-purple uppercase tracking-[0.2em]">{tUI('after_optimization')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(study as any).comparisonMetrics.map((metric: any, i: number) => {
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
                                                    <tr key={i} className="border-b border-border-subtle last:border-0 dark:hover:bg-white/[0.02] hover:bg-black/[0.02] transition-colors">
                                                        <td className="p-6 text-text-primary font-bold tracking-tight">{label}</td>
                                                        <td className="p-6 text-text-secondary font-mono text-sm">{before}</td>
                                                        <td className="p-6 text-brand-mint font-bold font-mono text-sm bg-brand-mint/5">{after}</td>
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
                            <div className="space-y-10">
                                <h2 className="text-3xl font-serif font-bold text-text-primary tracking-tight">{tUI('performance_evidence')}</h2>
                                <div className="grid grid-cols-1 gap-10">
                                    {(study as any).gallery.map((image: any, index: number) => (
                                        <div key={index} className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-border-subtle bg-bg-primary group">
                                            <Image
                                                src={image.src}
                                                alt={galleryAlts[index] || image.alt}
                                                width={1200}
                                                height={800}
                                                className="w-full h-auto grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Confidentiality Warning */}
                        <div className="bg-brand-purple/10 border border-brand-purple/20 rounded-3xl p-8 flex gap-6 items-start">
                            <FileText className="text-brand-purple shrink-0 mt-1" size={32} />
                            <div className="space-y-2">
                                <h4 className="font-bold text-text-primary text-sm uppercase tracking-widest">{tUI('confidentiality.title')}</h4>
                                <p className="text-text-secondary text-base leading-relaxed">
                                    {tUI('confidentiality.text')}
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Results & Info */}
                    <div className="lg:col-span-4 space-y-12">
                        {/* Results Card */}
                        <div className="glass border-border-subtle rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-purple to-brand-mint" />
                            <h3 className="text-2xl font-bold text-text-primary mb-10 tracking-tight">{tUI('key_results')}</h3>
                            <div className="space-y-10">
                                {resultItems.map((result, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <p className="text-4xl font-serif font-black text-brand-purple tracking-tighter">
                                            {idx + 1}
                                        </p>
                                        <p className="text-text-secondary font-medium text-lg leading-tight">{result}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tools Used */}
                        <div className="glass border-border-subtle rounded-[2rem] p-8 shadow-xl">
                            <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em] mb-8">{tUI('tools_used')}</h3>
                            <div className="flex flex-wrap gap-3">
                                {study.tools?.map((tool: any) => (
                                    <span key={tool} className="px-4 py-2 bg-black/5 dark:bg-white/5 text-text-secondary rounded-xl text-xs font-bold uppercase tracking-wider border border-border-subtle">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Related Case Studies */}
            <section className="py-24 md:py-40 bg-bg-primary border-t border-border-subtle">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-text-primary mb-16 tracking-tight text-center">More Success Stories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {CASE_STUDIES.filter(s => s.slug !== study.slug).slice(0, 3).map((relatedStudy) => (
                            <Link
                                key={relatedStudy.slug}
                                href={`/portfolio/${relatedStudy.slug}`}
                                className="glass rounded-[2rem] p-8 shadow-xl dark:hover:bg-white/[0.05] hover:bg-black/[0.02] transition-all duration-500 group border-border-subtle hover:-translate-y-2"
                            >
                                <div className={`w-12 h-1.5 ${relatedStudy.imageColor} rounded-full mb-8 shadow-xl shadow-current`}></div>
                                <h3 className="text-2xl font-serif font-bold text-text-primary mb-4 group-hover:text-brand-purple transition-colors">
                                    {t(`${relatedStudy.slug}.title`)}
                                </h3>
                                <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 group-hover:text-text-primary transition-colors">
                                    {t(`${relatedStudy.slug}.summary`)}
                                </p>
                                <div className="inline-flex items-center text-xs font-bold text-brand-purple mt-8 uppercase tracking-widest gap-2">
                                    View Study <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <FinalCTA
                title={tCommon('title')}
                description={tCommon('description')}
                buttonText={tCommon('button')}
            />
        </>
    );
}
