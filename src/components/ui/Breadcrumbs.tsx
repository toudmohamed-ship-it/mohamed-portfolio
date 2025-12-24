"use client";

import { Link } from "@/i18n/routing";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Breadcrumbs() {
    const pathname = usePathname();
    const t = useTranslations("Breadcrumbs");

    // Remove locale from pathname if present
    const pathSegments = pathname.split("/").filter((segment) => segment !== "" && !["en", "fr", "ar"].includes(segment));

    if (pathSegments.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-y-0 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-text-secondary/60">
                <li className="flex items-center">
                    <Link href="/" className="hover:text-brand-mint transition-colors flex items-center">
                        <Home className="w-3 h-3 mr-2" />
                        {t("home")}
                    </Link>
                </li>
                {pathSegments.map((segment, index) => {
                    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathSegments.length - 1;

                    // Format segment for display (e.g., local-seo-morocco -> Local Seo Morocco)
                    const label = segment
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ");

                    return (
                        <li key={segment} className="flex items-center">
                            <ChevronRight className="w-3 h-3 mx-2 text-white/10" />
                            {isLast ? (
                                <span className="text-text-primary truncate max-w-[200px] md:max-w-none" aria-current="page">
                                    {label}
                                </span>
                            ) : (
                                <Link href={href} className="hover:text-brand-mint transition-colors whitespace-nowrap">
                                    {t(segment) || label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
