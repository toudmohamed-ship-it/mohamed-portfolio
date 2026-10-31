import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import FinalCTA from "@/components/sections/FinalCTA";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localizedUrl, pageAlternates } from "@/lib/seo";

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'AboutPage.metadata' });

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('og_title'),
            description: t('og_description'),
            url: localizedUrl(locale, '/about'),
            images: ['/og-image.jpg'],
        },
        alternates: pageAlternates(locale, '/about'),
    };
}

export default async function AboutPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'AboutPage' });
    const tCrumbs = await getTranslations({ locale, namespace: 'Breadcrumbs' });
    // Clients are described, never named
    const TEAMS = (await getTranslations({ locale, namespace: 'HomePage.TrustStrip' })).raw('items') as string[];

    const skills: { title: string; items: string[] }[] = [
        {
            title: t('expertise.categories.seo_content'),
            items: ['technical_seo_audits', 'on_page_optimization', 'keyword_research', 'content_clustering', 'local_seo', 'international_seo'].map((k) => t(`expertise.skills.${k}`)),
        },
        {
            title: t('expertise.categories.analytics_data'),
            items: ['ga4', 'gtm', 'gsc', 'looker_studio', 'cro', 'user_behavior'].map((k) => t(`expertise.skills.${k}`)),
        },
        {
            title: t('expertise.categories.tools_platforms'),
            items: ['semrush_ahrefs', 'screaming_frog', 'wordpress_elementor', 'shopify_seo', 'hubspot_crm', 'google_ads'].map((k) => t(`expertise.skills.${k}`)),
        },
    ];
    const certifications = t.raw('certifications.items') as string[];
    const languages = [
        { name: t('languages.arabic'), level: t('languages.native') },
        { name: t('languages.english'), level: t('languages.professional') },
        { name: t('languages.french'), level: t('languages.advanced') },
    ];

    return (
        <>
            <PageHeader
                locale={locale}
                crumbs={[{ label: tCrumbs('home'), href: '/' }, { label: tCrumbs('about') }]}
                eyebrow={t('hero.eyebrow')}
                title={t('hero.title')}
                lead={t('hero.subtitle')}
            />

            {/* Story */}
            <section className="container-custom py-16 md:py-24 grid gap-12 md:grid-cols-[300px_minmax(0,1fr)] md:gap-16 items-start">
                <div className="relative justify-self-start">
                    <div aria-hidden="true" className="absolute top-4 bottom-[-16px] start-4 end-[-16px] rounded-[20px] bg-sage" />
                    <Image
                        src="/images/profile.png"
                        alt={t('photo_alt')}
                        width={300}
                        height={360}
                        sizes="(min-width: 768px) 300px, 80vw"
                        priority
                        className="relative block w-[260px] md:w-[300px] h-auto aspect-[5/6] object-cover rounded-[20px] bg-sage"
                    />
                </div>
                <div className="flex flex-col gap-5 max-w-[680px]">
                    <h2 className="m-0 text-[28px] md:text-[32px] font-semibold">{t('journey.title')}</h2>
                    {(['p1', 'p2', 'p3'] as const).map((p) => (
                        <p key={p} className="m-0 text-[18px] leading-relaxed text-ink-soft">{t(`journey.${p}`)}</p>
                    ))}
                    <div className="flex flex-wrap items-center gap-4 pt-3">
                        <a href="/resume.pdf" download="Mohamed_Toudghi_Resume.pdf" className="btn inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-ink text-paper font-medium no-underline hover:text-paper hover:bg-ink-soft">
                            {t('resume')} <span className="font-mono text-xs text-[#C9CFCB]">PDF · 213 KB</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Teams */}
            <section data-tone="white" className="bg-white border-y border-line">
                <div className="container-custom py-10 flex flex-wrap items-center gap-x-12 gap-y-4">
                    <h2 className="m-0 text-sm font-normal text-muted tracking-normal">{t('teams_title')}</h2>
                    <ul className="list-none m-0 p-0 flex flex-wrap gap-x-12 gap-y-3">
                        {TEAMS.map((team) => (
                            <li key={team} className="font-medium text-[17px] text-ink-soft">{team}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Skills */}
            <section className="container-custom py-16 md:py-24">
                <h2 className="reveal m-0 mb-10 text-3xl md:text-4xl font-semibold">{t('expertise.title')}</h2>
                <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
                    {skills.map((group) => (
                        <div key={group.title} className="reveal bg-white border border-line rounded-[18px] p-7 flex flex-col gap-4">
                            <h3 className="m-0 text-lg font-semibold">{group.title}</h3>
                            <ul className="m-0 ps-[18px] text-ink-soft text-[15px] leading-[1.9]">
                                {group.items.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Certifications and languages */}
            <section className="container-custom pb-20 md:pb-28 grid gap-10 md:grid-cols-2">
                <div className="reveal flex flex-col gap-5">
                    <h2 className="m-0 text-2xl font-semibold">{t('certifications.title')}</h2>
                    <ul className="list-none m-0 p-0 border-t border-line">
                        {certifications.map((cert) => (
                            <li key={cert} className="py-3.5 border-b border-line text-[16px] flex items-center gap-3">
                                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-forest" />
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
        </>
    );
}
