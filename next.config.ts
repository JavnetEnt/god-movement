import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/donate', destination: '/en/give', permanent: true },
      { source: '/donate/', destination: '/en/give', permanent: true },
      { source: '/about-us', destination: '/en/about', permanent: true },
      { source: '/about-us/', destination: '/en/about', permanent: true },
      { source: '/what-we-believe-in', destination: '/en/about', permanent: true },
      { source: '/deacon-board', destination: '/en/leadership', permanent: true },
      { source: '/deacon-board/', destination: '/en/leadership', permanent: true },
      { source: '/contact-us', destination: '/en/contact', permanent: true },
      { source: '/contact-us/', destination: '/en/contact', permanent: true },
      { source: '/calendar', destination: '/en/events', permanent: true }
    ];
  }
};

export default withNextIntl(nextConfig);