import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/constants';

const routeConfig: { path: string; priority: number; changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' }[] = [
  { path: '', priority: 1.0, changeFrequency: 'daily' },
  { path: '/courses', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/reviews', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/demo', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/games', priority: 0.8, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'kn'];

  return locales.flatMap((locale) => {
    const baseUrl = locale === 'en' ? siteConfig.url : `${siteConfig.url}/${locale}`;

    return routeConfig.map((item) => ({
      url: `${baseUrl}${item.path}`,
      lastModified: new Date(),
      changeFrequency: item.changeFrequency,
      priority: item.priority,
      alternateRefs: [
        {
          href: `${siteConfig.url}${item.path}`,
          hreflang: 'en',
        },
        {
          href: `${siteConfig.url}/kn${item.path}`,
          hreflang: 'kn',
        },
      ],
    }));
  });
}