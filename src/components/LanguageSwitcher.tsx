'use client';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import clsx from 'clsx';

const LANGUAGES = [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'fr', label: 'FR', name: 'Français' },
    { code: 'ar', label: 'AR', name: 'العربية' },
];

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-1 font-mono text-[13px]">
            {LANGUAGES.map((lang, index) => (
                <span key={lang.code} className="flex items-center gap-1">
                    <Link
                        href={pathname}
                        locale={lang.code}
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
                    </Link>
                    {index < LANGUAGES.length - 1 && <span className="text-line-strong" aria-hidden="true">·</span>}
                </span>
            ))}
        </div>
    );
}
