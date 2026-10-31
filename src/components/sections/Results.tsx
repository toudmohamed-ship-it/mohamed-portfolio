import { useTranslations } from "next-intl";

type Item = { value: string; label: string; source: string };

export default function Results() {
    const t = useTranslations("HomePage.results");
    const items = t.raw("items") as Item[];

    return (
        <section className="cv container-custom pt-24 md:pt-[104px] pb-12">
            <div className="reveal flex flex-wrap justify-between items-end gap-4 mb-10">
                <h2 className="m-0 text-3xl md:text-4xl font-semibold">{t("title")}</h2>
                <p className="m-0 text-muted max-w-[380px] text-base">{t("note")}</p>
            </div>
            <ul className="list-none m-0 p-0 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
                {items.map((item) => (
                    <li key={item.label} className="reveal lift bg-white border border-line rounded-2xl p-[26px] flex flex-col gap-2.5">
                        <span className="text-[46px] font-semibold tracking-[-0.03em] leading-none" dir="ltr">{item.value}</span>
                        <span className="text-[15px] text-muted">{item.label}</span>
                        <span className="mt-auto pt-2.5 font-mono text-xs text-forest">{item.source}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
