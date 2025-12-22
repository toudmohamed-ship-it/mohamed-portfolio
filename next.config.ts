import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  async redirects() {
    return [
      // Redirect root to /en
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
      // Redirect old page URLs to /en versions
      {
        source: '/about',
        destination: '/en/about',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/en/services',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: '/en/portfolio',
        permanent: true,
      },
      {
        source: '/portfolio/:slug',
        destination: '/en/portfolio/:slug',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/en/blog',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/en/blog/:slug',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/en/contact',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
