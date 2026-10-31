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
        source: '/en/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/portfolio/medical-spa-seo',
        destination: '/portfolio/premium-medspa-seo-audit',
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
