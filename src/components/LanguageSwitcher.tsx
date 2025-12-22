'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-600" />
            <select
                defaultValue={locale}
                onChange={handleLanguageChange}
                className="bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer"
            >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="ar">العربية</option>
            </select>
        </div>
    );
}
