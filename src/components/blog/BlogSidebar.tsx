import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { OPEN_FOR_WORK } from "@/lib/constants";

// Small, calm call to action under the table of contents
export default async function BlogSidebar({ locale }: { locale: string }) {
    if (!OPEN_FOR_WORK) return null;
    const t = await getTranslations({ locale, namespace: "BlogPage.sidebar" });

    return (
        <div data-tone="dark" className="bg-ink text-paper rounded-[20px] p-6 flex flex-col gap-3">
            <p className="m-0 text-lg font-semibold text-paper">{t("cta_title")}</p>
            <p className="m-0 text-[15px] text-[#C9CFCB]">{t("cta_desc")}</p>
            <Link href="/contact" className="btn mt-2 self-start inline-flex items-center gap-2 px-5 py-3 rounded-[10px] bg-paper text-ink font-medium no-underline hover:text-ink">
                {t("cta_button")} <span className="arrow" aria-hidden="true">→</span>
            </Link>
        </div>
    );
}
