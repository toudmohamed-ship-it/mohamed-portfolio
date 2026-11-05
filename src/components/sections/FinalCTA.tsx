import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { PERSONAL_INFO } from "@/lib/constants";

interface FinalCTAProps {
    title?: string;
    description?: React.ReactNode;
    buttonText?: string;
}

export default function FinalCTA({ title, description, buttonText }: FinalCTAProps) {
    const t = useTranslations("HomePage.FinalCTA");

    return (
        <section id="cta" data-tone="dark" className="relative overflow-hidden bg-ink text-paper">
            <svg aria-hidden="true" viewBox="0 0 1200 300" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 w-full h-[220px] opacity-45">
                <path d="M0 260 C 200 250, 300 230, 450 200 S 700 120, 850 110 S 1100 40, 1200 20" fill="none" stroke="#2E6B57" strokeWidth="2" />
            </svg>
            <div className="container-custom relative py-24 flex flex-wrap items-center justify-between gap-10">
                <div className="reveal flex-[1_1_480px] min-w-0 flex flex-col gap-3.5">
                    <h2 className="m-0 text-[34px] md:text-[42px] font-semibold text-paper">{title || t("title")}</h2>
                    <div className="m-0 text-[#C9CFCB] text-lg max-w-[520px]">{description || t("description")}</div>
                </div>
                <div className="reveal flex flex-wrap gap-3.5">
                    <Link href="/contact#mini-audit" className="btn inline-flex items-center gap-2 px-6 py-3.5 rounded-[10px] bg-paper text-ink font-medium no-underline hover:text-ink">
                        {buttonText || t("button")} <span className="arrow" aria-hidden="true">→</span>
                    </Link>
                    <a href={PERSONAL_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="btn inline-flex items-center px-6 py-3.5 rounded-[10px] border border-[#4A5450] text-paper font-medium no-underline hover:text-paper">
                        {t("whatsapp")}
                    </a>
                </div>
            </div>
        </section>
    );
}
