import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// Branch previews on Vercel must never be indexed (production is VERCEL_ENV=production)
const isPreview = process.env.VERCEL_ENV === 'preview';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          ...(isPreview ? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] : []),
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Redirect /en/* to /* (English is now at root)
      {
        source: '/en',
        destination: '/',
        permanent: true,
      },
      {
        // Share images keep their /en/... address (generated per locale); every other /en URL redirects
        source: '/en/:path((?!.*opengraph-image).*)',
        destination: '/:path',
        permanent: true,
      },
      {
        source: '/portfolio/medical-spa-seo',
        destination: '/portfolio/premium-medspa-seo-audit',
        permanent: true,
      },
      // Old slug of the technical SEO pillar article (Search Console reported it as 404)
      {
        source: '/blog/technical-seo-service-businesses-saas',
        destination: '/blog/technical-seo-checklist-2026',
        permanent: true,
      },
      {
        source: '/:locale(fr|ar)/blog/technical-seo-service-businesses-saas',
        destination: '/:locale/blog/technical-seo-checklist-2026',
        permanent: true,
      },
      // Redirect old Local SEO blog slug
      {
        source: '/blog/local-seo-morocco',
        destination: '/blog/local-seo-guide-businesses',
        permanent: true,
      },
      {
        source: '/:locale(fr|ar)/blog/local-seo-morocco',
        destination: '/:locale/blog/local-seo-guide-businesses',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
