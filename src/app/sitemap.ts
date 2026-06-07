import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/constants';

const routes = ['', '/about', '/courses', '/reviews', '/demo', '/faq', '/contact', '/resources'];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'kn'];

  return locales.flatMap((locale) => {
    const baseUrl = locale === 'en' ? siteConfig.url : `${siteConfig.url}/${locale}`;

    return routes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '/demo' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : 0.8,
    }));
  });
}