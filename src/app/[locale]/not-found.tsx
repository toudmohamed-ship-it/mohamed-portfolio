import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

// 404 page, in the language of the URL. The status code is 404, so search engines do not index it.
export default function NotFound() {
    const t = useTranslations("NotFound");
    const links = [
        { href: "/portfolio", label: t("work") },
        { href: "/services", label: t("services") },
        { href: "/blog", label: t("blog") },
    ];

    return (
        <section className="container-custom py-20 md:py-28 flex flex-col gap-6 max-w-[760px]">
            <p className="m-0 font-mono text-[13px] text-forest tracking-wide">{t("label")}</p>
            <h1 className="m-0 text-[36px] sm:text-5xl leading-[1.08] font-semibold tracking-[-0.03em]">{t("title")}</h1>
            <p className="m-0 text-lg text-muted max-w-[620px]">{t("text")}</p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4 pt-2">
                <Link href="/" className="btn inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-ink text-paper font-medium no-underline hover:text-paper hover:bg-ink-soft">
                    {t("home")}
                </Link>
                {links.map((l) => (
                    <Link key={l.href} href={l.href} className="btn font-medium no-underline">
                        {l.label} <span className="arrow" aria-hidden="true">→</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
