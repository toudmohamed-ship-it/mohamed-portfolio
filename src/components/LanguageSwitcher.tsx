'use client';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Globe } from 'lucide-react';
import clsx from 'clsx';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();

    const languages = [
        { code: 'en', label: 'EN' },
        { code: 'fr', label: 'FR' },
        { code: 'ar', label: 'AR' },
    ];

    return (
        <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-slate-400" />
            <div className="flex items-center gap-2">
                {languages.map((lang, index) => (
                    <div key={lang.code} className="flex items-center">
                        <Link
                            href={pathname}
                            locale={lang.code}
                            className={clsx(
                                "text-xs font-bold transition-colors hover:text-brand-purple",
                                locale === lang.code ? "text-brand-purple" : "text-slate-500"
                            )}
                        >
                            {lang.label}
                        </Link>
                        {index < languages.length - 1 && (
                            <span className="mx-1 text-slate-300 text-[10px]">|</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
