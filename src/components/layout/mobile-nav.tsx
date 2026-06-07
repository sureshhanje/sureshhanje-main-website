'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { X, Home, User, BookOpen, Star, Calendar, Download, HelpCircle, Phone } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { getLocalizedPath, isActiveNavLink } from '@/lib/navigation';
import { cn } from '@/lib/utils';

const menuItems = [
  { key: 'home', href: '/', icon: Home },
  { key: 'about', href: '/about', icon: User },
  { key: 'courses', href: '/courses', icon: BookOpen },
  { key: 'reviews', href: '/reviews', icon: Star },
  { key: 'demo', href: '/demo', icon: Calendar },
  { key: 'faq', href: '/faq', icon: HelpCircle },
  { key: 'contact', href: '/contact', icon: Phone },
];

export function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] z-50 lg:hidden bg-white dark:bg-[#0c0a14] shadow-2xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-[#1e1835]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">ಕ</div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900 dark:text-white">Suresh Hanje</div>
                    <div className="text-[11px] text-gray-400">Kannada Tutor</div>
                  </div>
                </div>
                <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors" aria-label="Close menu">
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-3">
                <div className="space-y-0.5">
                  {menuItems.map((item, i) => {
                    const isActive = isActiveNavLink(pathname, locale, item.href);

                    return (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={getLocalizedPath(locale, item.href)}
                        onClick={onClose}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-sm',
                          isActive
                            ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-400 font-semibold'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{t(item.key)}</span>
                      </Link>
                    </motion.div>
                    );
                  })}
                </div>
              </nav>

              <div className="p-4 border-t border-gray-100 dark:border-[#1e1835] space-y-3">
                <div className="flex items-center gap-2">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
                <Link
                  href={`/${locale}/demo`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-full shadow-sm text-sm"
                >
                  {t('bookDemo')}
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
