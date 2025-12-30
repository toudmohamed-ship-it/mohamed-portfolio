"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/constants";
import clsx from "clsx";
import { useTranslations } from 'next-intl';
import LanguageSwitcher from "../LanguageSwitcher";
import { ThemeToggle } from "../theme/ThemeToggle";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const t = useTranslations('HomePage.nav');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/", label: t('home') },
        { href: "/about", label: t('about') },
        { href: "/portfolio", label: t('portfolio') },
        { href: "/blog", label: t('blog') },
        { href: "/contact", label: t('contact') },
    ];

    return (
        <header
            className={clsx(
                "fixed top-0 left-0 right-0 z-[60] transition-all duration-500",
                (isScrolled || isOpen)
                    ? "py-4 glass shadow-2xl backdrop-blur-2xl"
                    : "py-6 bg-transparent"
            )}
        >
            <div className="container-custom flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="z-[70] flex items-center gap-2 group">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <img
                            src="/logo.png"
                            alt="Mohamed Toudghi Logo"
                            width={96}
                            height={96}
                            className="h-16 md:h-24 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute -inset-2 bg-brand-purple/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    {navLinks.filter(l => l.href !== '/contact').map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(
                                "text-sm font-semibold tracking-wide transition-all duration-300 hover:text-brand-mint relative group",
                                pathname === link.href ? "text-brand-mint" : "text-text-primary"
                            )}
                        >
                            {link.label}
                            <span className={clsx(
                                "absolute -bottom-1 left-0 h-0.5 bg-brand-mint transition-all duration-300",
                                pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                            )} />
                        </Link>
                    ))}
                    <div className="ml-4 pl-4 border-l border-white/10">
                        <LanguageSwitcher />
                    </div>
                    <ThemeToggle />
                    <Link
                        href="/contact"
                        className="relative px-8 py-3 bg-brand-purple text-white text-sm font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] group active:scale-95"
                    >
                        <span className="relative z-10">{t('contact')}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-purple-800 transition-transform duration-300 group-hover:translate-x-full" />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-brand-purple -translate-x-full transition-transform duration-300 group-hover:translate-x-0" />
                    </Link>
                </nav>

                {/* Mobile Toggle & Language */}
                <div className="flex items-center gap-2 md:hidden z-[70]">
                    <ThemeToggle />
                    <LanguageSwitcher />
                    <button
                        className="p-2 text-text-primary bg-black/5 dark:bg-white/5 rounded-lg border border-border-subtle"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-0 bg-bg-primary/98 backdrop-blur-3xl z-[65] flex flex-col items-center justify-center space-y-8 md:hidden h-screen w-screen"
                        >
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={clsx(
                                            "font-serif text-4xl transition-all duration-300 hover:scale-110",
                                            pathname === link.href ? "text-brand-mint" : "text-text-primary"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
