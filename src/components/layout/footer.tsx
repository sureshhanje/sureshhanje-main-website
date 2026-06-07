'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, Phone, Heart } from 'lucide-react';
import { siteConfig } from '@/lib/constants';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from '@/components/shared/social-icons';
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

const socialLinks = [
  { icon: FacebookIcon, href: siteConfig.links.facebook, label: 'Facebook', hover: 'hover:text-blue-500 hover:bg-blue-500/10' },
  { icon: TwitterIcon, href: siteConfig.links.twitter, label: 'Twitter', hover: 'hover:text-sky-500 hover:bg-sky-500/10' },
  { icon: InstagramIcon, href: siteConfig.links.instagram, label: 'Instagram', hover: 'hover:text-pink-500 hover:bg-pink-500/10' },
  { icon: YoutubeIcon, href: siteConfig.links.youtube, label: 'YouTube', hover: 'hover:text-red-500 hover:bg-red-500/10' },
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
        className={cn('inline-block text-sm transition-all duration-200', footerLinkClass(isActive))}
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
    <footer className="relative mt-auto border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-950/50 backdrop-blur-sm">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={getLocalizedPath(locale, '/')} className="inline-block group">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {siteConfig.name.split(' - ')[0]}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Kannada Tutor</p>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 leading-relaxed max-w-xs">
              {t('description')}
            </p>
            <div className="flex items-center gap-2 mt-5">
              {socialLinks.map(({ icon: Icon, href, label, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    'p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80',
                    'text-slate-500 dark:text-slate-400 transition-all duration-200',
                    hover
                  )}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-white mb-4">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-3">
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
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-white mb-4">
              {t('resources')}
            </h4>
            <ul className="space-y-3">
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
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-white mb-4">
              {t('contact')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                  <Mail className="w-4 h-4 text-primary-500" />
                </span>
                <a
                  href={`mailto:${siteConfig.links.email.replace('mailto:', '')}`}
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors break-all pt-1"
                >
                  {siteConfig.links.email.replace('mailto:', '')}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                  <Phone className="w-4 h-4 text-primary-500" />
                </span>
                <a
                  href={siteConfig.links.phone}
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors pt-1"
                >
                  {siteConfig.links.phone.replace('tel:', '')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} {siteConfig.name.split(' - ')[0]}. {t('allRightsReserved')}
          </p>
          <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            {t('madeWith')}
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
