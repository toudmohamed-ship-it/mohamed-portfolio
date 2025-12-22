"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/constants";
import clsx from "clsx";
import { useTranslations } from 'next-intl';
import LanguageSwitcher from "../LanguageSwitcher";

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
        { href: "/services", label: t('services') },
        { href: "/portfolio", label: t('portfolio') },
        { href: "/blog", label: t('blog') },
        { href: "/contact", label: t('contact') },
    ];

    return (
        <header
            className={clsx(
                "fixed top-0 left-0 right-0 z-[60] transition-all duration-300",
                (isScrolled || isOpen)
                    ? "bg-white shadow-sm py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container-custom flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="z-[70] flex items-center gap-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src="/logo.png"
                            alt="Mohamed Toudghi Logo"
                            className="h-18 md:h-28 w-auto object-contain"
                        />
                    </motion.div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.filter(l => l.href !== '/contact').map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(
                                "text-sm font-medium transition-colors hover:text-brand-purple",
                                pathname === link.href ? "text-brand-purple" : "text-navy-600"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="ml-4">
                        <LanguageSwitcher />
                    </div>
                    <Link
                        href="/contact"
                        className="px-6 py-2.5 bg-brand-purple text-white text-sm font-medium rounded-full hover:bg-purple-700 transition-colors shadow-lg"
                    >
                        {t('contact')}
                    </Link>
                </nav>

                {/* Mobile Toggle & Language */}
                <div className="flex items-center gap-4 md:hidden z-[70]">
                    <LanguageSwitcher />
                    <button
                        className="p-2 text-navy-900"
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
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-white z-[65] flex flex-col items-center justify-center space-y-8 md:hidden h-screen w-screen"
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
                                        className="font-serif text-3xl text-navy-900 hover:text-brand-purple transition-colors"
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
