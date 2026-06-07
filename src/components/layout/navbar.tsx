'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Menu, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { MobileNav } from './mobile-nav';
import { navItems } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { getLocalizedPath, isActiveNavLink, navLinkClass } from '@/lib/navigation';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getHref = (href: string) => getLocalizedPath(locale, href);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
        <nav
          className={cn(
            'w-full max-w-7xl transition-all duration-500',
            scrolled
              ? 'glass-nav px-4 lg:px-6 py-2'
              : 'bg-white/60 dark:bg-[#0c0a14]/60 backdrop-blur-sm rounded-full px-4 lg:px-6 py-2 border border-transparent'
          )}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={getHref('/')} className="flex items-center gap-2.5 group shrink-0">
              <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-base shadow-sm shadow-primary-600/20 group-hover:shadow-md group-hover:shadow-primary-600/30 transition-shadow">
                ಕ
              </div>
              <div className="hidden sm:block">
                <div className="font-semibold text-sm text-gray-900 dark:text-white leading-tight">Suresh Hanje</div>
              </div>
            </Link>

            {/* Desktop Nav — clean links */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = isActiveNavLink(pathname, locale, item.href);

                return (
                  <Link
                    key={item.href}
                    href={getHref(item.href)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200',
                      isActive
                        ? 'text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-white/5'
                    )}
                  >
                    {t(item.labelKey)}
                  </Link>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="hidden lg:flex items-center gap-1.5">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              <Link
                href={getHref('/demo')}
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-[13px] font-semibold rounded-full shadow-sm shadow-primary-600/20 hover:shadow-md hover:shadow-primary-600/30 transition-all duration-200"
              >
                {t('nav.bookDemo')}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
