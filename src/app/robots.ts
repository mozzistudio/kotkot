/**
 * Robots.txt Generator
 * Controls search engine crawling
 */

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/login',
          '/signup',
          '/onboarding',
          '/payment/',
          '/_next/',
          '/static/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/login',
          '/signup',
          '/onboarding',
          '/payment/',
        ],
      },
    ],
    sitemap: 'https://kotkot.ai/sitemap.xml',
    host: 'https://kotkot.ai',
  };
}
