import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/ui/PageHeader";
import BlogFAQ from "@/components/blog/BlogFAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import { SERVICE_PAGES, childPages } from "@/lib/services";
import { BASE_URL, jsonLd, localizedUrl, pageAlternates } from "@/lib/seo";

interface Props {
    params: Promise<{ locale: string; service: string }>;
}

// Page outline follows the questions a searcher asks, in order: what is it -> do I need it -> what is included
// -> how does it work -> with which tools -> how does it compare -> does it work (proof) -> remaining questions.
type Copy = {
    meta_title: string;
    meta_description: string;
    eyebrow: string;
    /** Short name for breadcrumbs and links (industry pages) */
    crumb?: string;
    title: string;
    lead: string;
    /** "From" price shown under the main button, with a short note (currency and scope) */
    price?: string;
    price_note?: string;
    definition: { title: string; paragraphs: string[] };
    for_who: { title: string; items: string[] };
    included: { title: string; intro: string; items: { name: string; desc: string }[] };
    steps: { title: string; items: { title: string; desc: string }[] };
    tools: { title: string; intro: string; items: { name: string; desc: string }[] };
    compare: { title: string; paragraphs: string[] };
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
        openGraph: { title: c.meta_title, description: c.meta_description, url: localizedUrl(locale, `/services/${service}`) },
    };
}

const H2 = "m-0 text-2xl md:text-[30px] font-semibold scroll-mt-24";

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
    const cases = page.caseStudies.map((slug) => {
        const results = tCases.raw(`${slug}.results`) as Record<string, string>;
        return { slug, client: tCases(`${slug}.client`), title: tCases(`${slug}.title`), result: Object.values(results)[0] };
    });
    const url = localizedUrl(locale, `/services/${service}`);
    const parent = page.parent ? SERVICE_PAGES.find((s) => s.slug === page.parent) : undefined;
    const children = childPages(page.slug).map((p) => ({ slug: p.slug, label: (t.raw(p.slug) as Copy).title }));

    const toc = [
        { id: "definition", label: c.definition.title },
        { id: "included", label: c.included.title },
        { id: "process", label: c.steps.title },
        { id: "tools", label: c.tools.title },
        { id: "compare", label: c.compare.title },
        { id: "proof", label: t("ui.proof_title") },
        { id: "faq", label: t("ui.faq_title") },
    ];

    // Service entity: what it is about, what it mentions, who provides it and what it includes (all visible on the page)
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${url}#service`,
        name: c.title,
        serviceType: c.crumb ? c.title : tHub(`${page.key}.title`),
        description: c.meta_description,
        url,
        inLanguage: locale,
        areaServed: "Worldwide",
        availableLanguage: ["en", "fr", "ar"],
        provider: { "@id": `${BASE_URL}/#person` },
        about: { "@type": "Thing", name: page.about.name, sameAs: page.about.sameAs },
        mentions: page.mentions.map((m) => ({ "@type": "Thing", name: m.name, sameAs: m.sameAs })),
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: c.included.title,
            itemListElement: c.included.items.map((d) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: d.name, description: d.desc } })),
        },
    };

    return (
        <>
            <PageHeader
                locale={locale}
                crumbs={[
                    { label: tCrumbs("home"), href: "/" },
                    { label: tCrumbs("services"), href: "/services" },
                    ...(parent ? [{ label: tHub(`${parent.key}.title`), href: `/services/${parent.slug}` }] : []),
                    { label: c.crumb ?? tHub(`${page.key}.title`) },
                ]}
                eyebrow={c.eyebrow}
                title={c.title}
                lead={c.lead}
            >
                <div className="flex flex-col gap-4 pt-2">
                    <div className="flex flex-wrap items-center gap-3.5">
                        <Link href="/contact#mini-audit" className="btn inline-flex items-center gap-2 px-6 py-[15px] rounded-xl bg-forest text-white font-medium no-underline hover:bg-forest-deep hover:text-white">
                            {t("ui.cta_primary")} <span className="arrow" aria-hidden="true">→</span>
                        </Link>
                        <span className="text-sm text-muted">{t("ui.starts_with")}</span>
                    </div>
                    {c.price && (
                        <p className="m-0 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <span className="text-[19px] font-semibold text-ink">{c.price}</span>
                            {c.price_note && <span className="text-sm text-muted">{c.price_note}</span>}
                        </p>
                    )}
                    {/* Proof up front: the headline result of the most relevant case study */}
                    {cases[0] && (
                        <Link href={`/portfolio/${cases[0].slug}`} className="self-start flex flex-col gap-0.5 bg-white border border-line border-s-4 border-s-forest rounded-xl px-4 py-3 text-ink no-underline hover:border-forest hover:text-ink max-w-[560px]">
                            <span className="font-mono text-xs text-muted">{t("ui.proof_label")} · {cases[0].client}</span>
                            <span className="text-[16px] font-medium">{cases[0].result}</span>
                        </Link>
                    )}
                </div>
            </PageHeader>

            <div className="container-custom py-14 md:py-20 grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16 items-start">
                <div className="min-w-0 max-w-[780px] flex flex-col gap-16">
                    {/* What it is */}
                    <section aria-labelledby="definition" className="flex flex-col gap-4">
                        <h2 id="definition" className={H2}>{c.definition.title}</h2>
                        {c.definition.paragraphs.map((p, i) => (
                            <p key={i} className={`m-0 leading-relaxed ${i === 0 ? "text-[19px] text-ink" : "text-[17px] text-ink-soft"}`}>{p}</p>
                        ))}
                    </section>

                    {/* Who needs it */}
                    <section aria-labelledby="for-who" className="flex flex-col gap-5 bg-white border border-line rounded-[20px] p-7 md:p-8">
                        <h2 id="for-who" className="m-0 text-xl md:text-2xl font-semibold scroll-mt-24">{c.for_who.title}</h2>
                        <ul className="list-none m-0 p-0 flex flex-col gap-3.5">
                            {c.for_who.items.map((item) => (
                                <li key={item} className="flex gap-3 items-start text-[17px] text-ink-soft">
                                    <span aria-hidden="true" className="shrink-0 mt-2.5 w-1.5 h-1.5 rounded-full bg-forest" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* What is included: each deliverable with what it means */}
                    <section aria-labelledby="included" className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <h2 id="included" className={H2}>{c.included.title}</h2>
                            <p className="m-0 text-[17px] text-ink-soft">{c.included.intro}</p>
                        </div>
                        <ol className="list-none m-0 p-0 flex flex-col">
                            {c.included.items.map((item, i) => (
                                <li key={item.name} className="grid gap-x-5 gap-y-1 grid-cols-[36px_minmax(0,1fr)] py-5 border-t border-line last:border-b">
                                    <span aria-hidden="true" className="row-span-2 w-9 h-9 rounded-full bg-sage text-forest font-semibold text-sm flex items-center justify-center">{i + 1}</span>
                                    <h3 className="m-0 text-[19px] font-semibold leading-snug">{item.name}</h3>
                                    <p className="m-0 text-[16px] text-ink-soft leading-relaxed">{item.desc}</p>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* How it works */}
                    <section aria-labelledby="process" className="flex flex-col gap-6">
                        <h2 id="process" className={H2}>{c.steps.title}</h2>
                        <ol className="list-none m-0 p-0 grid gap-6 sm:grid-cols-2">
                            {c.steps.items.map((step, i) => (
                                <li key={step.title} className="flex flex-col gap-2">
                                    <span aria-hidden="true" className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-[15px] ${i === 0 ? "bg-forest text-white" : "bg-white border-[1.5px] border-forest text-forest"}`}>{i + 1}</span>
                                    <h3 className="m-0 text-lg font-semibold">{step.title}</h3>
                                    <p className="m-0 text-[16px] text-muted">{step.desc}</p>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* Tools */}
                    <section aria-labelledby="tools" className="flex flex-col gap-5">
                        <div className="flex flex-col gap-3">
                            <h2 id="tools" className={H2}>{c.tools.title}</h2>
                            <p className="m-0 text-[17px] text-ink-soft">{c.tools.intro}</p>
                        </div>
                        <dl className="m-0 grid gap-px bg-line border border-line rounded-[18px] overflow-hidden sm:grid-cols-2">
                            {c.tools.items.map((tool) => (
                                <div key={tool.name} className="bg-white p-5 flex flex-col gap-1 sm:[&:last-child:nth-child(odd)]:col-span-2">
                                    <dt className="font-semibold text-[16px]">{tool.name}</dt>
                                    <dd className="m-0 text-[15px] text-muted">{tool.desc}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>

                    {/* Comparison */}
                    <section aria-labelledby="compare" className="flex flex-col gap-4 border-s-4 border-forest ps-6">
                        <h2 id="compare" className={H2}>{c.compare.title}</h2>
                        {c.compare.paragraphs.map((p, i) => (
                            <p key={i} className="m-0 text-[17px] text-ink-soft leading-relaxed">{p}</p>
                        ))}
                    </section>

                    {/* Proof */}
                    <section aria-labelledby="proof" className="flex flex-col gap-6">
                        <h2 id="proof" className={H2}>{t("ui.proof_title")}</h2>
                        <ul className="list-none m-0 p-0 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {cases.map((cs) => (
                                <li key={cs.slug}>
                                    <Link href={`/portfolio/${cs.slug}`} className="lift h-full bg-white border border-line rounded-[18px] p-5 flex flex-col gap-3 text-ink no-underline hover:text-ink">
                                        <span className="font-mono text-xs text-forest">{cs.client}</span>
                                        <span className="text-[17px] font-semibold leading-snug">{cs.title}</span>
                                        <span className="text-[15px] text-ink-soft border-s-2 border-forest ps-3">{cs.result}</span>
                                        <span className="btn mt-auto pt-1 font-medium text-forest text-[15px]">{t("ui.view_case")} <span className="arrow" aria-hidden="true">→</span></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Industry pages, for small screens (the sidebar has them on desktop) */}
                    {children.length > 0 && (
                        <nav aria-label={t("ui.industry_label")} className="lg:hidden flex flex-col gap-2">
                            <p className="m-0 font-mono text-xs text-muted">{t("ui.industry_label")}</p>
                            {children.map((ch) => (
                                <Link key={ch.slug} href={`/services/${ch.slug}`} className="btn self-start font-medium no-underline">
                                    {ch.label} <span className="arrow" aria-hidden="true">→</span>
                                </Link>
                            ))}
                        </nav>
                    )}

                    {/* FAQ */}
                    <div id="faq" className="scroll-mt-24">
                        <BlogFAQ faqs={c.faqs} title={t("ui.faq_title")} />
                    </div>
                </div>

                <aside className="hidden lg:flex flex-col gap-6 sticky top-24">
                    <nav aria-label={t("ui.on_this_page")}>
                        <p className="m-0 mb-3 font-mono text-xs text-muted">{t("ui.on_this_page")}</p>
                        <ol className="list-none m-0 p-0 flex flex-col border-s border-line">
                            {toc.map((item) => (
                                <li key={item.id}>
                                    <a href={`#${item.id}`} className="block ps-4 -ms-px py-1.5 text-[15px] leading-snug text-muted hover:text-ink no-underline border-s-2 border-transparent hover:border-forest">{item.label}</a>
                                </li>
                            ))}
                        </ol>
                    </nav>
                    <div className="bg-white border border-line rounded-[20px] p-5 flex flex-col gap-3">
                        <p className="m-0 font-mono text-xs text-muted">{t("ui.related_title")}</p>
                        <Link href={`/blog/${page.relatedPost}`} className="font-medium text-[15px] text-ink no-underline hover:text-forest leading-snug">
                            {tPosts(`${page.relatedPost}.title`)}
                        </Link>
                        {children.length > 0 && (
                            <div className="pt-3 border-t border-line flex flex-col gap-2">
                                <p className="m-0 font-mono text-xs text-muted">{t("ui.industry_label")}</p>
                                {children.map((ch) => (
                                    <Link key={ch.slug} href={`/services/${ch.slug}`} className="font-medium text-[15px] text-ink no-underline hover:text-forest leading-snug">
                                        {ch.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                        <Link href="/services" className="btn pt-3 border-t border-line font-medium no-underline text-[15px]">
                            {t("ui.cta_secondary")} <span className="arrow" aria-hidden="true">→</span>
                        </Link>
                    </div>
                </aside>
            </div>

            <FinalCTA />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
        </>
    );
}
