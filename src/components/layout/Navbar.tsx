"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { useTranslations } from 'next-intl';
import LanguageSwitcher from "../LanguageSwitcher";
import Logo from "./Logo";
import LocalTime from "../ui/LocalTime";
import { OPEN_FOR_WORK } from "@/lib/constants";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const t = useTranslations('HomePage.nav');

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 8);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close the mobile menu after navigating
    useEffect(() => setIsOpen(false), [pathname]);

    const navLinks = [
        { href: "/portfolio", label: t('work') },
        { href: "/services", label: t('services') },
        { href: "/about", label: t('about') },
        { href: "/blog", label: t('blog') },
    ];

    const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

    return (
        <header
            className={clsx(
                "sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300",
                isScrolled || isOpen
                    ? "bg-paper/90 backdrop-blur-md border-line shadow-[0_10px_30px_-24px_rgba(28,35,33,.5)]"
                    : "bg-paper border-line"
            )}
        >
            <nav className="container-custom flex items-center justify-between gap-4 py-3.5" aria-label="Main">
                <div className="flex items-center gap-4 min-w-0">
                    <Link href="/" className="flex items-center gap-3 text-ink no-underline shrink-0">
                        <Logo className="text-[19px]" />
                        <span className="hidden sm:inline text-[13px] text-muted border-s border-line ps-3 leading-tight">{t('role')}</span>
                    </Link>
                    <LocalTime compact className="hidden xl:inline-flex" />
                </div>

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-7 text-[15px]">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            aria-current={isActive(link.href) ? "page" : undefined}
                            className="navlink text-ink no-underline py-1"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <LanguageSwitcher />
                    {OPEN_FOR_WORK && <Link
                        href="/contact"
                        className="btn inline-flex items-center whitespace-nowrap min-h-11 px-[18px] rounded-[10px] bg-ink text-paper font-medium no-underline hover:bg-ink-soft hover:text-paper"
                    >
                        {t('book_call')}
                    </Link>}
                </div>

                {/* Mobile: language links live inside the menu so the name never collides with them */}
                <div className="flex md:hidden items-center gap-3">
                    <button
                        type="button"
                        className="w-11 h-11 inline-flex items-center justify-center rounded-[10px] border border-line bg-white text-ink"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        aria-label={isOpen ? t('close_menu') : t('open_menu')}
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {isOpen && (
                <div id="mobile-menu" className="md:hidden border-t border-line bg-paper">
                    <div className="container-custom flex flex-col py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={isActive(link.href) ? "page" : undefined}
                                className="py-3 text-lg text-ink no-underline border-b border-line"
                            >
                                {link.label}
                            </Link>
                        ))}
                        {OPEN_FOR_WORK && <Link
                            href="/contact"
                            className="mt-4 inline-flex items-center justify-center min-h-12 rounded-[10px] bg-forest text-white font-medium no-underline"
                        >
                            {t('book_call')}
                        </Link>}
                        <div className="mt-4"><LanguageSwitcher /></div>
                        <LocalTime className="mt-4 self-start" />
                    </div>
                </div>
            )}
        </header>
    );
}
