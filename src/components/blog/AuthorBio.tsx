import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { PERSONAL_INFO } from "@/lib/constants";

export default async function AuthorBio({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: "BlogPage.author" });

    return (
        <aside aria-label={t("label")} className="flex flex-wrap items-center gap-6 p-6 md:p-8 bg-white border border-line rounded-[20px]">
            <Image src="/images/mohamed-toudghi-face.webp" alt="" width={72} height={72} sizes="72px" className="w-[72px] h-[72px] rounded-full object-cover bg-sage" />
            <div className="flex-[1_1_280px] min-w-0 flex flex-col gap-1.5">
                <span className="font-mono text-xs text-forest">{t("label")}</span>
                <span className="text-lg font-semibold">Mohamed Toudghi</span>
                <p className="m-0 text-[15px] text-muted">{t("bio")}</p>
                <span className="flex flex-wrap gap-5 pt-1 text-[15px]">
                    <Link href="/about" className="navlink no-underline font-medium">{t("more")}</Link>
                    <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="navlink no-underline font-medium">LinkedIn</a>
                </span>
            </div>
        </aside>
    );
}
