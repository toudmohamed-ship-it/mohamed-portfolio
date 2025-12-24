"use client";

import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, List } from "lucide-react";

interface TocItem {
    id: string;
    text: string;
    level: number;
    children: TocItem[];
}

interface TableOfContentsProps {
    htmlContent: string;
}

export default function TableOfContents({ htmlContent }: TableOfContentsProps) {
    const [rawHeadings, setRawHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const [isToCVisible, setIsToCVisible] = useState<boolean>(true);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

    // Parse headings into a flat list first
    useEffect(() => {
        const regex = /<(h1|h2|h3)[^>]*>(.*?)<\/\1>/gi;
        const items: { id: string; text: string; level: number }[] = [];
        let match;

        while ((match = regex.exec(htmlContent)) !== null) {
            const level = parseInt(match[1][1]);
            const text = match[2].replace(/<[^>]*>?/gm, "").trim();

            const id = text
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-");

            items.push({ id, text, level });
        }
        setRawHeadings(items);

        // Initialize all as expanded
        const initialExpanded: Record<string, boolean> = {};
        items.forEach(item => {
            initialExpanded[item.id] = true;
        });
        setExpandedSections(initialExpanded);
    }, [htmlContent]);

    // Build hierarchy
    const headingsTree = useMemo(() => {
        const tree: TocItem[] = [];
        const stack: TocItem[] = [];

        rawHeadings.forEach((heading) => {
            const item: TocItem = { ...heading, children: [] };

            while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
                stack.pop();
            }

            if (stack.length === 0) {
                tree.push(item);
            } else {
                stack[stack.length - 1].children.push(item);
            }
            stack.push(item);
        });

        return tree;
    }, [rawHeadings]);

    // Active heading observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -80% 0px" }
        );

        rawHeadings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [rawHeadings]);

    const toggleSection = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const scrollTo = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -120;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const renderTocItems = (items: TocItem[]) => {
        return (
            <ul className="space-y-4 relative mt-2">
                {items.map((item) => (
                    <li key={item.id} className="relative">
                        <div className="flex items-center group">
                            <div
                                className={cn(
                                    "absolute start-0 w-[2px] h-full transition-all duration-500",
                                    activeId === item.id ? "bg-brand-mint" : "bg-transparent"
                                )}
                            />

                            <div className="flex items-center w-full ps-6">
                                <a
                                    href={`#${item.id}`}
                                    onClick={(e) => scrollTo(item.id, e)}
                                    className={cn(
                                        "hover:text-brand-mint block transition-all duration-300 leading-tight py-1 flex-grow",
                                        activeId === item.id
                                            ? "text-brand-mint font-bold translate-x-1 rtl:-translate-x-1"
                                            : "text-text-secondary font-medium hover:translate-x-1 rtl:hover:-translate-x-1"
                                    )}
                                >
                                    {item.text}
                                </a>

                                {item.children.length > 0 && (
                                    <button
                                        onClick={(e) => toggleSection(item.id, e)}
                                        className="p-1 hover:bg-white/5 rounded-md transition-colors"
                                    >
                                        <ChevronDown
                                            className={cn(
                                                "w-3 h-3 text-text-secondary/40 transition-transform duration-300",
                                                expandedSections[item.id] ? "rotate-0" : "-rotate-90 rtl:rotate-90"
                                            )}
                                        />
                                    </button>
                                )}
                            </div>
                        </div>

                        {item.children.length > 0 && (
                            <AnimatePresence>
                                {expandedSections[item.id] && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden ms-4 border-s border-white/5"
                                    >
                                        {renderTocItems(item.children)}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    if (rawHeadings.length === 0) return null;

    return (
        <nav className="space-y-4">
            <button
                onClick={() => setIsToCVisible(!isToCVisible)}
                className="w-full flex items-center justify-between group"
            >
                <div className="flex items-center gap-2">
                    <List className="w-3 h-3 text-brand-mint opacity-60" />
                    <h4 className="text-[10px] font-bold text-text-primary uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">
                        Table of Contents
                    </h4>
                </div>
                <ChevronDown
                    className={cn(
                        "w-4 h-4 text-text-secondary transition-transform duration-300",
                        isToCVisible ? "rotate-180" : ""
                    )}
                />
            </button>

            <AnimatePresence>
                {isToCVisible && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="relative pt-2">
                            {/* Global Active Indicator Line Background */}
                            <div className="absolute start-0 top-0 bottom-0 w-[1px] bg-border-subtle/30" />
                            {renderTocItems(headingsTree)}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
