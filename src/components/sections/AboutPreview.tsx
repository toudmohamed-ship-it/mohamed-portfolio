import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function AboutPreview() {
    const t = useTranslations("HomePage.AboutPreview");
    const tags = t.raw("tags") as string[];

    return (
        <section id="about" className="cv container-custom pt-8 pb-24 md:pb-[104px]">
            <div data-tone="white" className="reveal bg-white border border-line rounded-[22px] p-8 md:p-11 flex flex-wrap items-center gap-11">
                <div className="relative shrink-0">
                    <div aria-hidden="true" className="absolute top-3.5 bottom-[-14px] start-3.5 end-[-14px] rounded-2xl bg-sage" />
                    <Image
                        src="/images/profile.png"
                        alt={t("photo_alt")}
                        width={230}
                        height={270}
                        sizes="230px"
                        className="relative block w-[230px] h-[270px] object-cover rounded-2xl bg-sage"
                    />
                </div>
                <div className="flex-[1_1_420px] min-w-0 flex flex-col gap-4">
                    <span className="font-mono text-[13px] text-forest">{t("label")}</span>
                    <h2 className="m-0 text-[32px] font-semibold">{t("title")}</h2>
                    <p className="m-0 text-ink-soft">{t("p1")}</p>
                    <p className="m-0 text-ink-soft">{t("p2")}</p>
                    <ul className="list-none m-0 p-0 pt-1 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <li key={tag} className="text-sm px-3 py-1.5 rounded-full bg-paper border border-line">{tag}</li>
                        ))}
                    </ul>
                    <div className="mt-2 flex flex-wrap gap-x-7 gap-y-2">
                        <Link href="/about" className="btn font-medium no-underline">
                            {t("cta")} <span className="arrow" aria-hidden="true">→</span>
                        </Link>
                        <Link href="/consultant-seo-maroc" className="btn font-medium no-underline">
                            {t("morocco_cta")} <span className="arrow" aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
