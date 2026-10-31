import { Link } from "@/i18n/routing";
import { localizedUrl } from "@/lib/seo";

export type Crumb = { label: string; href?: string };

// Visible breadcrumb trail plus BreadcrumbList structured data. The last item is the current page (no link).
export default function Breadcrumbs({ items, locale }: { items: Crumb[]; locale: string }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.label,
            ...(item.href ? { item: item.href === "/" ? localizedUrl(locale, "") : localizedUrl(locale, item.href) } : {}),
        })),
    };

    return (
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <ol className="list-none m-0 p-0 flex flex-wrap items-center gap-x-2 gap-y-1">
                {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 min-w-0">
                        {i > 0 && <span aria-hidden="true" className="text-line-strong">/</span>}
                        {item.href ? (
                            <Link href={item.href} className="navlink text-muted hover:text-ink no-underline">{item.label}</Link>
                        ) : (
                            <span aria-current="page" className="text-ink truncate max-w-[60vw] md:max-w-none">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        </nav>
    );
}
