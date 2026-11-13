import Image from "next/image";
import { Link } from "@/i18n/routing";
import PageHeader from "@/components/ui/PageHeader";
import FinalCTA from "@/components/sections/FinalCTA";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PERSONAL_INFO } from "@/lib/constants";
import { BASE_URL, jsonLd, localizedUrl, pageAlternates, metaTitle } from "@/lib/seo";

interface Props {
    params: Promise<{ locale: string }>;
}

// Outline: who I am -> facts at a glance -> experience with dates (each role linked to its case studies)
// -> how I work -> skills -> education and certifications -> languages. Clients and employers stay unnamed.
type Role = { period: string; role: string; org: string; points: string[]; cases?: string[] };

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'AboutPage.metadata' });

    return {
        title: metaTitle(t('title')),
        description: t('description'),
        openGraph: {
            type: "profile",
            title: t('og_title'),
            description: t('og_description'),
            url: localizedUrl(locale, '/about'),
            images: ['/og-image.jpg'],
        },
        alternates: pageAlternates(locale, '/about'),
    };
}

const H2 = "m-0 text-[28px] md:text-[32px] font-semibold";

export default async function AboutPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'AboutPage' });
    const tCrumbs = await getTranslations({ locale, namespace: 'Breadcrumbs' });
    const tCases = await getTranslations({ locale, namespace: 'CaseStudies' });

    const intro = t.raw('intro.paragraphs') as string[];
    const facts = t.raw('facts') as { label: string; value: string }[];
    const roles = t.raw('experience.items') as Role[];
    const how = t.raw('how.items') as { title: string; desc: string }[];
    const groups = t.raw('expertise.groups') as Record<'seo_content' | 'analytics_data' | 'tools_platforms', string[]>;
    const education = t.raw('education.items') as { degree: string; school: string; years: string }[];
    const certifications = t.raw('certifications.items') as string[];
    const languages = [
        { name: t('languages.arabic'), level: t('languages.native') },
        { name: t('languages.english'), level: t('languages.professional') },
        { name: t('languages.french'), level: t('languages.advanced') },
    ];

    // The About page describes the site-wide Person (#person in the layout's @graph)
    const schema = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        url: localizedUrl(locale, '/about'),
        inLanguage: locale,
        name: t('metadata.title'),
        mainEntity: { "@id": `${BASE_URL}/#person` },
    };

    return (
        <>
            <PageHeader
                locale={locale}
                crumbs={[{ label: tCrumbs('home'), href: '/' }, { label: tCrumbs('about') }]}
                eyebrow={t('hero.eyebrow')}
                title={t('hero.title')}
                lead={t('hero.subtitle')}
            />

            {/* Who I am, with the photo and the facts at a glance */}
            <section className="container-custom py-16 md:py-24 grid gap-12 md:grid-cols-[300px_minmax(0,1fr)] md:gap-16 items-start">
                <div className="flex flex-col gap-8">
                    <div className="relative justify-self-start self-start w-[260px] md:w-[300px]">
                        <div aria-hidden="true" className="absolute top-4 bottom-[-16px] start-4 end-[-16px] rounded-[20px] bg-sage" />
                        <Image
                            src="/images/portrait.webp"
                            alt={t('photo_alt')}
                            width={800}
                            height={800}
                            sizes="(min-width: 768px) 300px, 260px"
                            priority
                            className="relative block w-full h-auto aspect-square object-cover rounded-[20px] bg-[#BFC0C2]"
                        />
                    </div>
                    <dl className="m-0 mt-2 bg-white border border-line rounded-[18px] divide-y divide-line">
                        {facts.map((f) => (
                            <div key={f.label} className="px-5 py-3.5 flex flex-col gap-0.5">
                                <dt className="font-mono text-xs text-muted">{f.label}</dt>
                                <dd className="m-0 text-[15px] font-medium text-ink">{f.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <div className="flex flex-col gap-5 max-w-[680px]">
                    <h2 className={H2}>{t('intro.title')}</h2>
                    {intro.map((p, i) => (
                        <p key={i} className={`m-0 leading-relaxed ${i === 0 ? "text-[19px] text-ink" : "text-[18px] text-ink-soft"}`}>{p}</p>
                    ))}
                    <div className="flex flex-wrap items-center gap-4 pt-3">
                        <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="btn font-medium no-underline">
                            {t('linkedin')} <span className="arrow" aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Experience timeline */}
            <section aria-labelledby="experience" data-tone="white" className="bg-white border-y border-line">
                <div className="container-custom py-16 md:py-24 flex flex-col gap-10">
                    <div className="flex flex-col gap-3 max-w-[680px]">
                        <h2 id="experience" className={H2}>{t('experience.title')}</h2>
                        <p className="m-0 text-[17px] text-muted">{t('experience.intro')}</p>
                    </div>
                    <ol className="list-none m-0 p-0 flex flex-col border-s-2 border-line ms-2">
                        {roles.map((r) => (
                            <li key={`${r.period}-${r.role}`} className="relative ps-8 pb-10 last:pb-0">
                                <span aria-hidden="true" className="absolute -start-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-[3px] border-forest" />
                                <div className="grid gap-x-10 gap-y-3 md:grid-cols-[200px_minmax(0,1fr)]">
                                    <p className="m-0 font-mono text-[13px] text-forest pt-0.5">{r.period}</p>
                                    <div className="flex flex-col gap-3 max-w-[720px]">
                                        <div className="flex flex-col gap-0.5">
                                            <h3 className="m-0 text-[20px] font-semibold leading-snug">{r.role}</h3>
                                            <p className="m-0 text-[15px] text-muted">{r.org}</p>
                                        </div>
                                        <ul className="m-0 ps-[18px] flex flex-col gap-1.5 text-[16px] leading-relaxed text-ink-soft">
                                            {r.points.map((pt) => <li key={pt}>{pt}</li>)}
                                        </ul>
                                        {r.cases && r.cases.length > 0 && (
                                            <ul className="list-none m-0 p-0 pt-1 flex flex-wrap gap-2">
                                                {r.cases.map((slug) => (
                                                    <li key={slug}>
                                                        <Link href={`/portfolio/${slug}`} className="inline-flex items-center gap-1.5 bg-paper border border-line rounded-full px-3.5 py-1.5 text-[14px] text-ink no-underline hover:border-forest hover:text-forest">
                                                            <span className="font-mono text-[11px] text-muted">{t('experience.case_label')}</span>
                                                            {tCases(`${slug}.client`)}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* How I work */}
            <section aria-labelledby="how" className="container-custom py-16 md:py-24 flex flex-col gap-10">
                <h2 id="how" className={H2}>{t('how.title')}</h2>
                <ol className="list-none m-0 p-0 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
                    {how.map((h, i) => (
                        <li key={h.title} className="reveal bg-white border border-line rounded-[18px] p-6 flex flex-col gap-3">
                            <span aria-hidden="true" className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-[15px] ${i === 0 ? "bg-forest text-white" : "bg-sage text-forest"}`}>{i + 1}</span>
                            <h3 className="m-0 text-lg font-semibold">{h.title}</h3>
                            <p className="m-0 text-[15px] leading-relaxed text-ink-soft">{h.desc}</p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Skills */}
            <section className="container-custom pb-16 md:pb-24">
                <h2 className={`reveal ${H2} mb-10`}>{t('expertise.title')}</h2>
                <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
                    {(['seo_content', 'analytics_data', 'tools_platforms'] as const).map((key) => (
                        <div key={key} className="reveal bg-white border border-line rounded-[18px] p-7 flex flex-col gap-4">
                            <h3 className="m-0 text-lg font-semibold">{t(`expertise.categories.${key}`)}</h3>
                            <ul className="m-0 ps-[18px] text-ink-soft text-[15px] leading-[1.9]">
                                {groups[key].map((item) => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education, certifications and languages */}
            <section className="container-custom pb-20 md:pb-28 grid gap-10 md:grid-cols-3">
                <div className="reveal flex flex-col gap-5">
                    <h2 className="m-0 text-2xl font-semibold">{t('education.title')}</h2>
                    <ul className="list-none m-0 p-0 border-t border-line">
                        {education.map((e) => (
                            <li key={e.degree} className="py-3.5 border-b border-line flex flex-col gap-0.5">
                                <span className="text-[16px] font-medium">{e.degree}</span>
                                <span className="text-[14px] text-muted">{e.school} · {e.years}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="reveal flex flex-col gap-5">
                    <h2 className="m-0 text-2xl font-semibold">{t('certifications.title')}</h2>
                    <ul className="list-none m-0 p-0 border-t border-line">
                        {certifications.map((cert) => (
                            <li key={cert} className="py-3 border-b border-line text-[15px] flex items-start gap-3">
                                <span aria-hidden="true" className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-forest" />
                                {cert}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="reveal flex flex-col gap-5">
                    <h2 className="m-0 text-2xl font-semibold">{t('languages.title')}</h2>
                    <dl className="m-0 border-t border-line">
                        {languages.map((l) => (
                            <div key={l.name} className="py-3.5 border-b border-line flex justify-between gap-6 text-[16px]">
                                <dt className="font-medium">{l.name}</dt>
                                <dd className="m-0 text-muted">{l.level}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            <FinalCTA />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
        </>
    );
}
