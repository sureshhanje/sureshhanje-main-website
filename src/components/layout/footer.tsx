'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, Phone, Heart } from 'lucide-react';
import { siteConfig } from '@/lib/constants';
import { getLocalizedPath, isActiveNavLink, footerLinkClass } from '@/lib/navigation';
import { cn } from '@/lib/utils';

const quickLinks = [
  { href: '/', key: 'home' },
  { href: '/courses', key: 'courses' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
] as const;

const resourceLinks = [
  // { href: '/blog', key: 'blog' },
  { href: '/faq', key: 'faq' },
  { href: '/reviews', key: 'reviews' },
  // { href: '/resources', key: 'resources' },
] as const;

function FooterNavLink({
  href,
  label,
  locale,
  pathname,
}: {
  href: string;
  label: string;
  locale: string;
  pathname: string;
}) {
  const isActive = isActiveNavLink(pathname, locale, href);

  return (
    <li>
      <Link
        href={getLocalizedPath(locale, href)}
        aria-current={isActive ? 'page' : undefined}
        className={cn('inline-block text-sm transition-colors duration-200', footerLinkClass(isActive))}
      >
        {label}
      </Link>
    </li>
  );
}

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <footer className="border-t border-gray-100 dark:border-[#1e1835] bg-white dark:bg-[#0c0a14]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={getLocalizedPath(locale, '/')} className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">ಕ</div>
              <span className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {siteConfig.name.split(' - ')[0]}
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 leading-relaxed max-w-xs">
              {t('description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ href, key }) => (
                <FooterNavLink
                  key={key}
                  href={href}
                  label={t(key)}
                  locale={locale}
                  pathname={pathname}
                />
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
              {t('resources')}
            </h4>
            <ul className="space-y-2.5">
              {resourceLinks.map(({ href, key }) => (
                <FooterNavLink
                  key={key}
                  href={href}
                  label={t(key)}
                  locale={locale}
                  pathname={pathname}
                />
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
              {t('contact')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gray-400" />
                <a
                  href={`mailto:${siteConfig.links.email.replace('mailto:', '')}`}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors break-all"
                >
                  {siteConfig.links.email.replace('mailto:', '')}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gray-400" />
                <a
                  href={siteConfig.links.phone}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {siteConfig.links.phone.replace('tel:', '')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-100 dark:border-[#1e1835] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} {siteConfig.name.split(' - ')[0]}. {t('allRightsReserved')}
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            {t('madeWith')}
            <Heart className="w-3 h-3 text-red-400 fill-red-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}
