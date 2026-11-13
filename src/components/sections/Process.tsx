import { OPEN_FOR_WORK } from "@/lib/constants";
import { useTranslations } from "next-intl";

type Step = { title: string; desc: string };

export default function Process() {
    const t = useTranslations("HomePage.process");
    const steps = t.raw("steps") as Step[];

    return (
        <section className="cv container-custom pt-24 md:pt-[104px] pb-20">
            <h2 className="reveal m-0 mb-12 text-3xl md:text-4xl font-semibold">{t("title")}</h2>
            <div className="relative">
                <div aria-hidden="true" className="hidden md:block absolute inset-x-5 top-5 border-t-[1.5px] border-dashed border-line-strong" />
                <ol className="relative list-none m-0 p-0 grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
                    {steps.map((step, i) => (
                        <li key={step.title} className="reveal flex flex-col gap-3">
                            <span
                                aria-hidden="true"
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold shadow-[0_0_0_6px_#F7F5F0] ${i === 0 ? "bg-forest text-white" : "bg-white border-[1.5px] border-forest text-forest"}`}
                            >
                                {i + 1}
                            </span>
                            <h3 className="m-0 text-xl font-semibold">{step.title}</h3>
                            <p className="m-0 text-muted text-base">{step.desc}</p>
                        </li>
                    ))}
                </ol>
                {OPEN_FOR_WORK && <p className="reveal m-0 mt-10 max-w-[680px] text-[17px] text-ink-soft border-s-4 border-forest ps-5">{t("direct")}</p>}
            </div>
        </section>
    );
}
