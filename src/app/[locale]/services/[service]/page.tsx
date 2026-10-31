import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/ui/PageHeader";
import BlogFAQ from "@/components/blog/BlogFAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import { SERVICE_PAGES } from "@/lib/services";
import { BASE_URL, jsonLd, localizedUrl, pageAlternates } from "@/lib/seo";

interface Props {
    params: Promise<{ locale: string; service: string }>;
}

type Copy = {
    meta_title: string;
    meta_description: string;
    eyebrow: string;
    title: string;
    lead: string;
    for_who: string[];
    steps: { title: string; desc: string }[];
    faqs: { question: string; answer: string }[];
};

export async function generateStaticParams() {
    return ["en", "fr", "ar"].flatMap((locale) => SERVICE_PAGES.map((s) => ({ locale, service: s.slug })));
}

export async function generateMetadata({ params }: Props) {
    const { locale, service } = await params;
    const page = SERVICE_PAGES.find((s) => s.slug === service);
    if (!page) return { title: "Service not found" };
    const t = await getTranslations({ locale, namespace: "ServicePages" });
    const c = t.raw(service) as Copy;

    return {
        title: c.meta_title,
        description: c.meta_description,
        alternates: pageAlternates(locale, `/services/${service}`),
        openGraph: { title: c.meta_title, description: c.meta_description, url: localizedUrl(locale, `/services/${service}`), images: ["/og-image.jpg"] },
    };
}

export default async function ServiceDetailPage({ params }: Props) {
    const { locale, service } = await params;
    setRequestLocale(locale);
    const page = SERVICE_PAGES.find((s) => s.slug === service);
    if (!page) notFound();

    const t = await getTranslations({ locale, namespace: "ServicePages" });
    const tHub = await getTranslations({ locale, namespace: "ServicesPage.core_services" });
    const tCases = await getTranslations({ locale, namespace: "CaseStudies" });
    const tPosts = await getTranslations({ locale, namespace: "BlogPosts" });
    const tCrumbs = await getTranslations({ locale, namespace: "Breadcrumbs" });

    const c = t.raw(service) as Copy;
    const deliverables = tHub.raw(`${page.key}.deliverables`) as string[];
    const cases = page.caseStudies.map((slug) => {
        const results = tCases.raw(`${slug}.results`) as Record<string, string>;
        return { slug, client: tCases(`${slug}.client`), title: tCases(`${slug}.title`), result: Object.values(results)[0] };
    });
    const url = localizedUrl(locale, `/services/${service}`);

    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: c.title,
        serviceType: tHub(`${page.key}.title`),
        description: c.meta_description,
        url,
        inLanguage: locale,
        areaServed: "Worldwide",
        availableLanguage: ["en", "fr", "ar"],
        provider: { "@type": "Person", name: "Mohamed Toudghi", url: BASE_URL, address: { "@type": "PostalAddress", addressLocality: "Rabat", addressCountry: "MA" } },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: t("ui.included_title"),
            itemListElement: deliverables.map((d) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: d } })),
        },
    };

    return (
        <>
            <PageHeader
                locale={locale}
                crumbs={[
                    { label: tCrumbs("home"), href: "/" },
                    { label: tCrumbs("services"), href: "/services" },
                    { label: tHub(`${page.key}.title`) },
                ]}
                eyebrow={c.eyebrow}
                title={c.title}
                lead={c.lead}
            >
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                    <Link href="/contact" className="btn inline-flex items-center gap-2 px-6 py-[15px] rounded-xl bg-forest text-white font-medium no-underline hover:bg-forest-deep hover:text-white">
                        {t("ui.cta_primary")} <span className="arrow" aria-hidden="true">→</span>
                    </Link>
                    <span className="text-sm text-muted">{t("ui.starts_with")}</span>
                </div>
            </PageHeader>

            {/* Who it is for + what you get */}
            <section className="container-custom py-16 md:py-20 grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
                <div className="flex flex-col gap-5">
                    <h2 className="m-0 text-2xl md:text-[30px] font-semibold">{t("ui.for_who_title")}</h2>
                    <ul className="list-none m-0 p-0 flex flex-col gap-3.5">
                        {c.for_who.map((item) => (
                            <li key={item} className="flex gap-3 items-start text-[17px] text-ink-soft">
                                <span aria-hidden="true" className="shrink-0 mt-2.5 w-1.5 h-1.5 rounded-full bg-forest" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white border border-line rounded-[20px] p-7 md:p-8 flex flex-col gap-5">
                    <h2 className="m-0 text-2xl font-semibold">{t("ui.included_title")}</h2>
                    <ul className="list-none m-0 p-0 flex flex-col gap-3">
                        {deliverables.map((d) => (
                            <li key={d} className="flex gap-3 items-start text-[16px]">
                                <svg className="shrink-0 mt-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E6B57" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
                                {d}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* How it works */}
            <section data-tone="white" className="bg-white border-y border-line">
                <div className="container-custom py-16 md:py-20">
                    <h2 className="m-0 mb-10 text-2xl md:text-[30px] font-semibold">{t("ui.how_title")}</h2>
                    <ol className="list-none m-0 p-0 grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
                        {c.steps.map((step, i) => (
                            <li key={step.title} className="flex flex-col gap-2.5">
                                <span aria-hidden="true" className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-[15px] ${i === 0 ? "bg-forest text-white" : "bg-white border-[1.5px] border-forest text-forest"}`}>{i + 1}</span>
                                <h3 className="m-0 text-lg font-semibold">{step.title}</h3>
                                <p className="m-0 text-[16px] text-muted">{step.desc}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Proof */}
            <section className="container-custom py-16 md:py-20">
                <h2 className="m-0 mb-8 text-2xl md:text-[30px] font-semibold">{t("ui.proof_title")}</h2>
                <ul className="list-none m-0 p-0 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
                    {cases.map((cs) => (
                        <li key={cs.slug}>
                            <Link href={`/portfolio/${cs.slug}`} className="lift h-full bg-white border border-line rounded-[18px] p-6 flex flex-col gap-3 text-ink no-underline hover:text-ink">
                                <span className="font-mono text-xs text-forest">{cs.client}</span>
                                <span className="text-[18px] font-semibold leading-snug">{cs.title}</span>
                                <span className="text-[15px] text-ink-soft border-s-2 border-forest ps-3">{cs.result}</span>
                                <span className="btn mt-auto pt-2 font-medium text-forest text-[15px]">{t("ui.view_case")} <span className="arrow" aria-hidden="true">→</span></span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* FAQ + further reading */}
            <section className="container-custom pb-20 md:pb-24 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 items-start">
                <div className="max-w-[760px]">
                    <BlogFAQ faqs={c.faqs} title={t("ui.faq_title")} />
                </div>
                <aside className="bg-white border border-line rounded-[20px] p-6 flex flex-col gap-4">
                    <p className="m-0 font-mono text-xs text-muted">{t("ui.related_title")}</p>
                    <Link href={`/blog/${page.relatedPost}`} className="font-medium text-[16px] text-ink no-underline hover:text-forest leading-snug">
                        {tPosts(`${page.relatedPost}.title`)}
                    </Link>
                    <Link href="/services" className="btn pt-3 border-t border-line font-medium no-underline text-[15px]">
                        {t("ui.cta_secondary")} <span className="arrow" aria-hidden="true">→</span>
                    </Link>
                </aside>
            </section>

            <FinalCTA />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
        </>
    );
}
