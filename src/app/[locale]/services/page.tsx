import PageHeader from "@/components/ui/PageHeader";
import FinalCTA from "@/components/sections/FinalCTA";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { localizedUrl, pageAlternates, jsonLd } from "@/lib/seo";
import { SERVICE_PAGES, serviceHref } from "@/lib/services";
import { OPEN_FOR_WORK } from "@/lib/constants";

interface Props {
    params: Promise<{ locale: string }>;
}

const SERVICES = ["tech_seo", "keyword_strategy", "local_seo", "international_seo", "analytics", "wp_optimization"] as const;
const AUDIENCES = ["service_business", "startups", "optimizers", "growth_seekers"] as const;

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ServicesPage.metadata' });

    return {
        title: t('title'),
        description: t('description'),
        openGraph: { title: t('title'), description: t('description'), url: localizedUrl(locale, '/services'), images: ['/og-image.jpg'] },
        alternates: pageAlternates(locale, '/services'),
    };
}

export default async function ServicesPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'ServicesPage' });
    const tCrumbs = await getTranslations({ locale, namespace: 'Breadcrumbs' });
    const tPages = await getTranslations({ locale, namespace: 'ServicePages' });

    const services = SERVICES.map((key) => ({
        key,
        title: t(`core_services.${key}.title`),
        bestFor: t(`core_services.${key}.bestFor`),
        description: t(`core_services.${key}.description`),
        deliverables: t.raw(`core_services.${key}.deliverables`) as string[],
    }));

    // Structured data: the services offered by the same person/business as the homepage schema
    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "Service", name: s.title, description: s.description, provider: { "@type": "Person", name: "Mohamed Toudghi" }, areaServed: "Worldwide" },
        })),
    };

    return (
        <>
            <PageHeader
                locale={locale}
                crumbs={[{ label: tCrumbs('home'), href: '/' }, { label: tCrumbs('services') }]}
                eyebrow={t('header.eyebrow')}
                title={t('header.title')}
                lead={t('header.subtitle')}
            >
                <nav aria-label={t('jump_label')} className="pt-2">
                    <ul className="list-none m-0 p-0 flex flex-wrap gap-2">
                        {services.map((s) => (
                            <li key={s.key}>
                                <a href={`#${s.key}`} className="inline-block text-sm px-3.5 py-2 rounded-full bg-white border border-line text-ink-soft no-underline hover:border-forest hover:text-forest transition-colors">{s.title}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </PageHeader>

            {/* Who I work with */}
            <section data-tone="white" className="bg-white border-b border-line">
                <div className="container-custom py-14 md:py-16">
                    <h2 className="m-0 mb-8 text-2xl md:text-[28px] font-semibold">{t('who_i_work_with.title')}</h2>
                    <ul className="list-none m-0 p-0 grid gap-x-10 gap-y-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
                        {AUDIENCES.map((a) => (
                            <li key={a} className="flex flex-col gap-1.5 border-s-2 border-forest ps-4">
                                <span className="font-semibold">{t(`who_i_work_with.${a}.title`)}</span>
                                <span className="text-[15px] text-muted">{t(`who_i_work_with.${a}.desc`)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Services */}
            <section className="container-custom py-16 md:py-24">
                <h2 className="sr-only">{t('core_services.title')}</h2>
                <div className="flex flex-col">
                    {services.map((s, i) => (
                        <article key={s.key} id={s.key} className="reveal scroll-mt-24 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-14 py-12 border-t border-line first:border-t-0 first:pt-0">
                            <div className="flex flex-col gap-4">
                                <span className="font-mono text-[13px] text-forest">0{i + 1}</span>
                                <h3 className="m-0 text-[26px] md:text-[30px] font-semibold leading-tight">{s.title}</h3>
                                <p className="m-0 text-[17px] text-ink-soft leading-relaxed">{s.description}</p>
                                <p className="m-0 text-[15px] text-muted">{s.bestFor}</p>
                            </div>
                            <div className="bg-white border border-line rounded-[18px] p-6 md:p-7 flex flex-col gap-4 self-start">
                                <span className="font-mono text-xs text-muted">{t('core_services.what_you_get')}</span>
                                <ul className="list-none m-0 p-0 flex flex-col gap-3">
                                    {s.deliverables.map((d) => (
                                        <li key={d} className="flex gap-3 items-start text-[16px]">
                                            <svg className="shrink-0 mt-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E6B57" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
                                            {d}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                                    {SERVICE_PAGES.some((p) => p.key === s.key) && (
                                        <Link href={serviceHref(s.key)} className="btn font-medium no-underline">
                                            {tPages('ui.learn_more')}<span className="sr-only">: {s.title}</span> <span className="arrow" aria-hidden="true">→</span>
                                        </Link>
                                    )}
                                    {SERVICE_PAGES.filter((p) => p.parent && p.key === s.key).map((p) => (
                                        <Link key={p.slug} href={`/services/${p.slug}`} className="btn font-medium no-underline">
                                            {tPages(`${p.slug}.title`)} <span className="arrow" aria-hidden="true">→</span>
                                        </Link>
                                    ))}
                                    {OPEN_FOR_WORK && <Link href="/contact" className="btn font-medium no-underline text-ink">{t('core_services.cta_discuss')} <span className="arrow" aria-hidden="true">→</span></Link>}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* How I work */}
            <section className="container-custom pb-20 md:pb-28">
                <div className="bg-white border border-line rounded-[22px] p-8 md:p-12">
                    <h2 className="m-0 text-2xl md:text-[28px] font-semibold">{t('how_it_works.title')}</h2>
                    <p className="m-0 mt-2 text-muted">{t('how_it_works.subtitle')}</p>
                    <ol className="list-none m-0 p-0 mt-8 grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
                        {[1, 2, 3].map((n) => (
                            <li key={n} className="flex flex-col gap-2.5">
                                <span aria-hidden="true" className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-[15px] ${n === 1 ? 'bg-forest text-white' : 'bg-white border-[1.5px] border-forest text-forest'}`}>{n}</span>
                                <h3 className="m-0 text-lg font-semibold">{t(`how_it_works.step${n}_title`)}</h3>
                                <p className="m-0 text-[15px] text-muted">{t(`how_it_works.step${n}_desc`)}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <FinalCTA title={t('final_cta.title')} description={t('final_cta.description')} buttonText={t('final_cta.button')} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
        </>
    );
}
