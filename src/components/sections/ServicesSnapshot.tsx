import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

type Offer = { title: string; desc: string; points: string[]; meta: string };

const ICONS = [
    // Audit: magnifier with plus
    <svg key="audit" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2E6B57" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5M8 11h6M11 8v6" /></svg>,
    // Local: map pin
    <svg key="local" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2E6B57" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>,
    // Tracking: bar chart
    <svg key="ga4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2E6B57" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>,
];

export default function ServicesSnapshot() {
    const t = useTranslations("HomePage.offers");
    const offers = t.raw("items") as Offer[];

    return (
        <section id="services" className="container-custom pt-[72px] pb-24">
            <div className="reveal flex flex-wrap justify-between items-end gap-4 mb-10">
                <h2 className="m-0 text-3xl md:text-4xl font-semibold">{t("title")}</h2>
                <p className="m-0 text-muted max-w-[420px] text-base">{t("intro")}</p>
            </div>
            <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(290px,1fr))]">
                {offers.map((offer, i) => (
                    <article key={offer.title} className="reveal lift bg-white border border-line rounded-[18px] p-[30px] flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <span className="w-11 h-11 rounded-xl bg-sage flex items-center justify-center">{ICONS[i]}</span>
                            <span className="font-mono text-[13px] text-muted">0{i + 1}</span>
                        </div>
                        <h3 className="m-0 text-[22px] font-semibold">{offer.title}</h3>
                        <p className="m-0 text-muted text-base">{offer.desc}</p>
                        <ul className="m-0 ps-[18px] text-ink-soft text-[15px] leading-[1.85]">
                            {offer.points.map((p) => <li key={p}>{p}</li>)}
                        </ul>
                        <span className="mt-auto pt-3.5 border-t border-line text-[15px] text-ink-soft">{offer.meta}</span>
                    </article>
                ))}
            </div>
            <div className="reveal mt-8">
                <Link href="/services" className="btn font-medium no-underline">
                    {t("cta")} <span className="arrow" aria-hidden="true">→</span>
                </Link>
            </div>
        </section>
    );
}
