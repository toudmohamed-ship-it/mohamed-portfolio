export const BASE_URL = 'https://www.mohamedtoudghi.com';

const LOCALES = ['en', 'fr', 'ar'] as const;

// English lives at the root (localePrefix: 'as-needed'), other locales are prefixed.
export function localizedUrl(locale: string, path: string = '') {
    return locale === 'en' ? `${BASE_URL}${path || '/'}` : `${BASE_URL}/${locale}${path}`;
}

// Canonical + hreflang alternates for a page. `path` is the locale-less path, e.g. '/about'.
// Pages must always return the full set, because Next.js replaces (not merges) the layout's `alternates`.
export function pageAlternates(locale: string, path: string = '', locales: readonly string[] = LOCALES) {
    const languages: Record<string, string> = {};
    for (const l of locales) languages[l] = localizedUrl(l, path);
    languages['x-default'] = localizedUrl('en', path);

    return {
        canonical: localizedUrl(locale, path),
        languages,
    };
}

// Only the production deployment may be indexed. Vercel sets VERCEL_ENV to "preview" on branch deployments,
// so previews get noindex (meta + X-Robots-Tag header + robots.txt). Local builds count as production.
export const IS_INDEXABLE = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === 'production' : true;

// Serialize structured data for a <script type="application/ld+json">, escaping "<" so content can never close the tag
export function jsonLd(data: unknown) {
    // Replace "<" with its JSON escape (backslash + u003c), built from char codes to keep the source unambiguous
    return JSON.stringify(data).replace(/</g, String.fromCharCode(92) + "u003c");
}
