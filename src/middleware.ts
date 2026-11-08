import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match all paths except static files, api, and Next.js internals
    matcher: [
        '/',
        '/(fr|ar)/:path*',
        // Share images (opengraph-image) are served as generated, including English ones under /en
        '/((?!api|_next|_vercel|.*opengraph-image|.*\\..*).*)'
    ]
};
