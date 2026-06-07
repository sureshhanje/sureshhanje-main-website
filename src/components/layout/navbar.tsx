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
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'glass-nav shadow-sm' : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href={getHref('/')} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
                ಕ
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg text-slate-800 dark:text-white leading-tight">Suresh Hanje</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Kannada Tutor</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = isActiveNavLink(pathname, locale, item.href);

                return (
                <div key={item.href} className="relative group"
                  onMouseEnter={() => item.children && setCoursesOpen(true)}
                  onMouseLeave={() => item.children && setCoursesOpen(false)}
                >
                  <Link
                    href={getHref(item.href)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'px-3 py-2 text-sm font-medium transition-colors relative flex items-center gap-1',
                      'after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-primary-500 after:transition-all after:duration-300',
                      navLinkClass(isActive)
                    )}
                  >
                    {t(item.labelKey)}
                    {item.children && <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />}
                  </Link>

                  {item.children && coursesOpen && (
                    <div className="absolute top-full left-0 pt-2 w-56 animate-fade-in">
                      <div className="glass-card rounded-xl p-2 shadow-xl">
                        {item.children.map((child) => {
                          const childActive = pathname.includes('/courses');
                          return (
                          <Link
                            key={child.href}
                            href={getHref(child.href)}
                            className={cn(
                              'block px-4 py-2.5 text-sm rounded-lg transition-colors',
                              childActive
                                ? 'text-primary-600 dark:text-primary-400 font-medium bg-primary-50/70 dark:bg-primary-900/30'
                                : 'text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-900/20'
                            )}
                          >
                            {t(child.labelKey)}
                          </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <div className="hidden lg:flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              <Link
                href={getHref('/demo')}
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 gradient-bg text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                {t('nav.bookDemo')}
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
