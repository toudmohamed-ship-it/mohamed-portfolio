import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { CASE_STUDIES } from "@/lib/data";

type Work = { slug: string; tag: string; title: string; desc: string; result: string };

export default function CaseStudyPreview() {
    const t = useTranslations("HomePage.work");
    // Only list case studies that exist, so every row links to a real page
    const items = (t.raw("items") as Work[]).filter((w) => CASE_STUDIES.some((s) => s.slug === w.slug));

    return (
        <section id="work" data-tone="white" className="cv bg-white border-y border-line">
            <div className="container-custom py-24">
                <div className="reveal flex flex-wrap justify-between items-end gap-4 mb-7">
                    <h2 className="m-0 text-3xl md:text-4xl font-semibold">{t("title")}</h2>
                    <Link href="/portfolio" className="btn font-medium no-underline">
                        {t("all", { count: CASE_STUDIES.length })} <span className="arrow" aria-hidden="true">→</span>
                    </Link>
                </div>
                <ul className="list-none m-0 p-0">
                    {items.map((item, i) => (
                        <li key={item.slug} className="reveal">
                            <Link
                                href={`/portfolio/${item.slug}`}
                                className={`row-link flex flex-wrap items-center gap-x-8 gap-y-3 py-7 border-t border-line rounded-xl text-ink no-underline hover:text-ink ${i === items.length - 1 ? "border-b" : ""}`}
                            >
                                <span className="basis-[170px] shrink-0 font-mono text-[13px] text-muted">{item.tag}</span>
                                <span className="flex-[1_1_380px] min-w-0">
                                    <span className="block text-[21px] font-semibold">{item.title}</span>
                                    <span className="block text-muted text-base">{item.desc}</span>
                                </span>
                                <span className="shrink-0 flex items-center gap-3.5">
                                    <span className="text-[15px] font-semibold text-forest bg-sage px-3 py-1.5 rounded-full">{item.result}</span>
                                    <span className="arrow text-xl" aria-hidden="true">→</span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
