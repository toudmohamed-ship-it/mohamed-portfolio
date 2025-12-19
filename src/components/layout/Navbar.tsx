"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/constants";
import clsx from "clsx";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/80 backdrop-blur-md shadow-sm py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container-custom flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="z-50">
                    <span className="font-serif text-2xl font-bold text-navy-900 tracking-tight">
                        M.Toudghi
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
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
                    {/* CTA removed for cleaner look as per request */}
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 p-2 text-navy-900"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
                        >
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="font-serif text-2xl text-navy-900 hover:text-brand-purple transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-8">
                                <Link
                                    href="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="px-8 py-3 bg-brand-purple text-white text-lg font-medium rounded-full hover:bg-purple-700 transition-colors shadow-lg"
                                >
                                    Let's Talk
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
