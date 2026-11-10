import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHeader from "@/components/ui/PageHeader";
import BlogFAQ from "@/components/blog/BlogFAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import { PERSONAL_INFO, OPEN_FOR_WORK } from "@/lib/constants";
import { BASE_URL, jsonLd, localizedUrl, pageAlternates } from "@/lib/seo";

interface Props {
    params: Promise<{ locale: string }>;
}

// Market page for "consultant SEO Maroc" / "مستشار SEO في المغرب". The homepage targets the broad "SEO consultant" term,
// so this page owns the Morocco searches. Outline: what the consultant does -> proof on a Moroccan site -> what is
// different in Morocco -> services -> who and where -> process -> consultant vs agency -> tools -> FAQ.
type Copy = {
    meta_title: string;
    meta_description: string;
    crumb: string;
    eyebrow: string;
    title: string;
    lead: string;
    cta_call: string;
    cta_whatsapp: string;
    facts: string[];
    on_this_page: string;
    definition: { title: string; paragraphs: string[] };
    proof: { title: string; intro: string; metrics: { value: string; label: string }[]; source: string; link: string };
    market: { title: string; intro: string; items: { name: string; desc: string }[] };
    services: { title: string; intro: string; link: string; items: { name: string; desc: string }[] };
    for_who: { title: string; items: string[]; cities_title: string; cities_text: string };
    compare: { title: string; intro: string; head: string[]; rows: string[][]; note: string };
    tools: { title: string; items: string[] };
    faq_title: string;
    faqs: { question: string; answer: string }[];
};

const PATH = "/consultant-seo-maroc";
const CASE_STUDY = "moroccan-b2b-seo";
// Same order as MoroccoPage.services.items
const SERVICE_SLUGS = ["technical-seo-audit", "local-seo", "ga4-tracking", "seo-for-law-firms"];

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "MoroccoPage" });

    return {
        title: t("meta_title"),
        description: t("meta_description"),
        alternates: pageAlternates(locale, PATH),
        openGraph: { title: t("meta_title"), description: t("meta_description"), url: localizedUrl(locale, PATH), images: ["/og-image.jpg"] },
    };
}

const H2 = "m-0 text-2xl md:text-[30px] font-semibold scroll-mt-24";

export default async function MoroccoPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "MoroccoPage" });
    const tProcess = await getTranslations({ locale, namespace: "HomePage.process" });
    const tCrumbs = await getTranslations({ locale, namespace: "Breadcrumbs" });
    const tRoot = await getTranslations({ locale });
    const c = tRoot.raw("MoroccoPage") as Copy;
    const steps = tProcess.raw("steps") as { title: string; desc: string }[];
    const url = localizedUrl(locale, PATH);

    const toc = [
        { id: "definition", label: c.definition.title },
        { id: "proof", label: c.proof.title },
        { id: "market", label: c.market.title },
        { id: "services", label: c.services.title },
        { id: "for-who", label: c.for_who.title },
        { id: "process", label: tProcess("title") },
        { id: "compare", label: c.compare.title },
        { id: "faq", label: c.faq_title },
    ];

    // Service entity limited to Morocco, provided by the site-wide Person; offers point to the service pages
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${url}#service`,
        name: c.title,
        serviceType: "Search engine optimization",
        description: c.meta_description,
        url,
        inLanguage: locale,
        availableLanguage: ["fr", "ar", "en"],
        provider: { "@id": `${BASE_URL}/#person` },
        areaServed: { "@type": "Country", name: "Morocco", sameAs: "https://en.wikipedia.org/wiki/Morocco" },
        about: { "@type": "Thing", name: "Search engine optimization", sameAs: "https://en.wikipedia.org/wiki/Search_engine_optimization" },
        mentions: [
            { "@type": "Thing", name: "Local search engine optimisation", sameAs: "https://en.wikipedia.org/wiki/Local_search_engine_optimisation" },
            { "@type": "Thing", name: "Google Business Profile", sameAs: "https://en.wikipedia.org/wiki/Google_Business_Profile" },
            { "@type": "Thing", name: "Google Search Console", sameAs: "https://en.wikipedia.org/wiki/Google_Search_Console" },
            { "@type": "Thing", name: "Google Analytics", sameAs: "https://en.wikipedia.org/wiki/Google_Analytics" },
            { "@type": "Thing", name: ".ma", sameAs: "https://en.wikipedia.org/wiki/.ma" },
        ],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: c.services.title,
            itemListElement: c.services.items.map((s, i) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: s.name, description: s.desc, url: localizedUrl(locale, `/services/${SERVICE_SLUGS[i]}`) },
            })),
        },
    };

    return (
        <>
            <PageHeader
                locale={locale}
                crumbs={[{ label: tCrumbs("home"), href: "/" }, { label: c.crumb }]}
                eyebrow={c.eyebrow}
                title={c.title}
                lead={c.lead}
            >
                <div className="flex flex-col gap-6 pt-2">
                    {OPEN_FOR_WORK && <div className="flex flex-wrap items-center gap-3.5">
                        <Link href="/contact#mini-audit" className="btn inline-flex items-center gap-2 px-6 py-[15px] rounded-xl bg-forest text-white font-medium no-underline hover:bg-forest-deep hover:text-white">
                            {c.cta_call} <span className="arrow" aria-hidden="true">→</span>
                        </Link>
                        <a href={PERSONAL_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="btn inline-flex items-center gap-2 px-6 py-[14px] rounded-xl bg-white border border-line-strong text-ink font-medium no-underline hover:border-forest hover:text-ink">
                            {c.cta_whatsapp}
                        </a>
                    </div>}
                    <ul className="list-none m-0 p-0 flex flex-wrap gap-2.5">
                        {c.facts.map((f) => (
                            <li key={f} className="inline-flex items-center gap-2 bg-white border border-line rounded-full px-3.5 py-1.5 text-[14px] text-ink-soft">
                                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-forest" />
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>
            </PageHeader>

            <div className="container-custom py-14 md:py-20 grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16 items-start">
                <div className="min-w-0 max-w-[780px] flex flex-col gap-16">
                    {/* What an SEO consultant does, in Morocco, and who I am */}
                    <section aria-labelledby="definition" className="flex flex-col gap-4">
                        <h2 id="definition" className={H2}>{c.definition.title}</h2>
                        {c.definition.paragraphs.map((p, i) => (
                            <p key={i} className={`m-0 leading-relaxed ${i === 0 ? "text-[19px] text-ink" : "text-[17px] text-ink-soft"}`}>{p}</p>
                        ))}
                    </section>

                    {/* Proof on a Moroccan website, early: it is what competitors do not show */}
                    <section aria-labelledby="proof" className="flex flex-col gap-6 bg-white border border-line rounded-[20px] p-7 md:p-8">
                        <div className="flex flex-col gap-3">
                            <h2 id="proof" className="m-0 text-xl md:text-2xl font-semibold scroll-mt-24">{c.proof.title}</h2>
                            <p className="m-0 text-[17px] text-ink-soft leading-relaxed">{c.proof.intro}</p>
                        </div>
                        <dl className="m-0 grid gap-4 md:grid-cols-3">
                            {c.proof.metrics.map((m) => (
                                <div key={m.label} className="flex flex-col gap-1 border-s-2 border-forest ps-4">
                                    <dt className="order-2 text-[15px] text-muted">{m.label}</dt>
                                    <dd className="order-1 m-0 text-[26px] md:text-[28px] font-semibold tracking-[-0.02em] text-ink whitespace-nowrap">{m.value}</dd>
                                </div>
                            ))}
                        </dl>
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-line">
                            <span className="font-mono text-xs text-muted">{c.proof.source}</span>
                            <Link href={`/portfolio/${CASE_STUDY}`} className="btn font-medium no-underline text-[15px]">
                                {c.proof.link} <span className="arrow" aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </section>

                    {/* What is different about SEO in Morocco */}
                    <section aria-labelledby="market" className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <h2 id="market" className={H2}>{c.market.title}</h2>
                            <p className="m-0 text-[17px] text-ink-soft">{c.market.intro}</p>
                        </div>
                        <ol className="list-none m-0 p-0 flex flex-col">
                            {c.market.items.map((item, i) => (
                                <li key={item.name} className="grid gap-x-5 gap-y-1 grid-cols-[36px_minmax(0,1fr)] py-5 border-t border-line last:border-b">
                                    <span aria-hidden="true" className="row-span-2 w-9 h-9 rounded-full bg-sage text-forest font-semibold text-sm flex items-center justify-center">{i + 1}</span>
                                    <h3 className="m-0 text-[19px] font-semibold leading-snug">{item.name}</h3>
                                    <p className="m-0 text-[16px] text-ink-soft leading-relaxed">{item.desc}</p>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* Services, each linked to its own page */}
                    <section aria-labelledby="services" className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <h2 id="services" className={H2}>{c.services.title}</h2>
                            <p className="m-0 text-[17px] text-ink-soft">{c.services.intro}</p>
                        </div>
                        <ul className="list-none m-0 p-0 grid gap-4 sm:grid-cols-2">
                            {c.services.items.map((s, i) => (
                                <li key={s.name}>
                                    <Link href={`/services/${SERVICE_SLUGS[i]}`} className="lift h-full bg-white border border-line rounded-[18px] p-6 flex flex-col gap-3 text-ink no-underline hover:text-ink">
                                        <h3 className="m-0 text-[18px] font-semibold leading-snug">{s.name}</h3>
                                        <p className="m-0 text-[15px] text-ink-soft leading-relaxed">{s.desc}</p>
                                        <span className="btn mt-auto pt-1 font-medium text-forest text-[15px]">{c.services.link} <span className="arrow" aria-hidden="true">→</span></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Who and where */}
                    <section aria-labelledby="for-who" className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                        <div className="flex flex-col gap-5">
                            <h2 id="for-who" className="m-0 text-xl md:text-2xl font-semibold scroll-mt-24">{c.for_who.title}</h2>
                            <ul className="list-none m-0 p-0 flex flex-col gap-3.5">
                                {c.for_who.items.map((item) => (
                                    <li key={item} className="flex gap-3 items-start text-[17px] text-ink-soft">
                                        <span aria-hidden="true" className="shrink-0 mt-2.5 w-1.5 h-1.5 rounded-full bg-forest" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-sage border border-sage-mid rounded-[20px] p-6 flex flex-col gap-3 self-start">
                            <h3 className="m-0 text-[18px] font-semibold">{c.for_who.cities_title}</h3>
                            <p className="m-0 text-[16px] text-ink-soft leading-relaxed">{c.for_who.cities_text}</p>
                        </div>
                    </section>

                    {/* Process: same three steps as the homepage */}
                    <section aria-labelledby="process" className="flex flex-col gap-6">
                        <h2 id="process" className={H2}>{tProcess("title")}</h2>
                        <ol className="list-none m-0 p-0 grid gap-6 sm:grid-cols-3">
                            {steps.map((step, i) => (
                                <li key={step.title} className="flex flex-col gap-2">
                                    <span aria-hidden="true" className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-[15px] ${i === 0 ? "bg-forest text-white" : "bg-white border-[1.5px] border-forest text-forest"}`}>{i + 1}</span>
                                    <h3 className="m-0 text-lg font-semibold">{step.title}</h3>
                                    <p className="m-0 text-[16px] text-muted">{step.desc}</p>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* Consultant vs agency */}
                    <section aria-labelledby="compare" className="flex flex-col gap-5">
                        <div className="flex flex-col gap-3">
                            <h2 id="compare" className={H2}>{c.compare.title}</h2>
                            <p className="m-0 text-[17px] text-ink-soft">{c.compare.intro}</p>
                        </div>
                        <div className="overflow-x-auto border border-line rounded-[18px] bg-white">
                            <table className="w-full min-w-[560px] border-collapse text-start text-[15px]">
                                <thead>
                                    <tr className="bg-paper">
                                        {c.compare.head.map((h, i) => (
                                            <th key={i} scope="col" className="text-start font-semibold p-4 border-b border-line">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {c.compare.rows.map((row) => (
                                        <tr key={row[0]} className="border-b border-line last:border-b-0 align-top">
                                            <th scope="row" className="text-start font-medium p-4 text-ink">{row[0]}</th>
                                            <td className="p-4 text-ink-soft">{row[1]}</td>
                                            <td className="p-4 text-muted">{row[2]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="m-0 text-[16px] text-ink-soft leading-relaxed border-s-4 border-forest ps-5">{c.compare.note}</p>
                    </section>

                    {/* Tools */}
                    <section aria-labelledby="tools" className="flex flex-col gap-4">
                        <h2 id="tools" className="m-0 text-xl md:text-2xl font-semibold scroll-mt-24">{c.tools.title}</h2>
                        <ul className="list-none m-0 p-0 flex flex-wrap gap-2.5">
                            {c.tools.items.map((tool) => (
                                <li key={tool} className="bg-white border border-line rounded-full px-4 py-2 text-[15px] text-ink-soft" dir="ltr">{tool}</li>
                            ))}
                        </ul>
                    </section>

                    {/* FAQ */}
                    <div id="faq" className="scroll-mt-24">
                        <BlogFAQ faqs={c.faqs} title={c.faq_title} />
                    </div>
                </div>

                <aside className="hidden lg:flex flex-col gap-6 sticky top-24">
                    <nav aria-label={c.on_this_page}>
                        <p className="m-0 mb-3 font-mono text-xs text-muted">{c.on_this_page}</p>
                        <ol className="list-none m-0 p-0 flex flex-col border-s border-line">
                            {toc.map((item) => (
                                <li key={item.id}>
                                    <a href={`#${item.id}`} className="block ps-4 -ms-px py-1.5 text-[15px] leading-snug text-muted hover:text-ink no-underline border-s-2 border-transparent hover:border-forest">{item.label}</a>
                                </li>
                            ))}
                        </ol>
                    </nav>
                    {OPEN_FOR_WORK && <div className="bg-white border border-line rounded-[20px] p-5 flex flex-col gap-3">
                        <Link href="/contact#mini-audit" className="btn inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-forest text-white font-medium no-underline hover:bg-forest-deep hover:text-white text-[15px]">
                            {c.cta_call}
                        </Link>
                        <a href={PERSONAL_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="btn text-center font-medium no-underline text-[15px]">
                            {c.cta_whatsapp}
                        </a>
                    </div>}
                </aside>
            </div>

            <FinalCTA />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
        </>
    );
}
