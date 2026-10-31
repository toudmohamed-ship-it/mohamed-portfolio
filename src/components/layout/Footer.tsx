import { Link } from "@/i18n/routing";
import { PERSONAL_INFO } from "@/lib/constants";
import { getTranslations } from "next-intl/server";
import Logo from "./Logo";

export default async function Footer() {
    const t = await getTranslations("Footer");
    const nav = await getTranslations("HomePage.nav");

    const links = [
        { href: "/portfolio", label: nav("work") },
        { href: "/services", label: nav("services") },
        { href: "/about", label: nav("about") },
        { href: "/blog", label: nav("blog") },
        { href: "/contact", label: nav("contact") },
    ];

    return (
        <footer className="border-t border-line bg-paper">
            <div className="container-custom py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
                <div className="flex flex-col gap-4 max-w-sm">
                    <Link href="/" className="self-start text-ink no-underline">
                        <Logo className="text-xl" />
                    </Link>
                    <p className="text-muted text-[15px] m-0">{t("tagline")}</p>
                </div>

                <div>
                    <h2 className="text-sm font-semibold mb-4">{t("pages")}</h2>
                    <ul className="list-none p-0 m-0 flex flex-col gap-2.5 text-[15px]">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="navlink text-muted hover:text-ink no-underline">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-sm font-semibold mb-4">{t("contact")}</h2>
                    <ul className="list-none p-0 m-0 flex flex-col gap-2.5 text-[15px]">
                        <li><a href={`mailto:${PERSONAL_INFO.email}`} className="navlink text-muted hover:text-ink no-underline">{PERSONAL_INFO.email}</a></li>
                        <li><a href={PERSONAL_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="navlink text-muted hover:text-ink no-underline">WhatsApp</a></li>
                        <li><a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="navlink text-muted hover:text-ink no-underline">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-line">
                <div className="container-custom py-6 flex flex-wrap justify-between gap-4 text-sm text-muted">
                    <p className="m-0">© {new Date().getFullYear()} Mohamed Toudghi · {t("bottom")}</p>
                    <Link href="/privacy" className="navlink text-muted hover:text-ink no-underline">{t("privacy")}</Link>
                </div>
            </div>
        </footer>
    );
}
