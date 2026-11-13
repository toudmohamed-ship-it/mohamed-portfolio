import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en', 'fr', 'ar'],

    // Used when no locale matches
    defaultLocale: 'en',

    // Don't show /en in URLs - English is at root /
    localePrefix: 'as-needed',

    // The URL alone decides the language. Without this, a visitor who once opened /fr or /ar
    // (or whose browser prefers French/Arabic) got redirected away from every English link.
    localeDetection: false,

    // No language cookie: nothing reads it, since the URL decides the language
    localeCookie: false
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
