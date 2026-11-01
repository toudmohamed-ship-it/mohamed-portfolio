'use client';
import NextLink from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import clsx from 'clsx';

const LANGUAGES = [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'fr', label: 'FR', name: 'Français' },
    { code: 'ar', label: 'AR', name: 'العربية' },
];

// Plain URLs for each language: English at the root, the others under /fr and /ar.
// next-intl's Link renders /en/... when switching to the default locale, which only redirects
// and made Google crawl a dozen /en URLs, so the hrefs are built here instead.
function localeHref(code: string, pathname: string) {
    if (code === 'en') return pathname;
    return pathname === '/' ? `/${code}` : `/${code}${pathname}`;
}

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-1 font-mono text-[13px]">
            {LANGUAGES.map((lang, index) => (
                <span key={lang.code} className="flex items-center gap-1">
                    <NextLink
                        href={localeHref(lang.code, pathname)}
                        hrefLang={lang.code}
                        lang={lang.code}
                        title={lang.name}
                        aria-current={locale === lang.code ? 'true' : undefined}
                        className={clsx(
                            "px-1 py-1 no-underline transition-colors",
                            locale === lang.code ? "text-ink font-medium" : "text-muted hover:text-forest"
                        )}
                    >
                        {lang.label}
                        <span className="sr-only"> {lang.name}</span>
                    </NextLink>
                    {index < LANGUAGES.length - 1 && <span className="text-line-strong" aria-hidden="true">·</span>}
                </span>
            ))}
        </div>
    );
}
