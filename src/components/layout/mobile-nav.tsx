'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { X, Home, User, BookOpen, Star, Calendar, Download, HelpCircle, Phone, Video, Camera, Share2 } from 'lucide-react';
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
  // { key: 'blog', href: '/blog', icon: FileText },
  { key: 'resources', href: '/resources', icon: Download },
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] z-50 lg:hidden bg-white dark:bg-slate-900 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-lg">ಕ</div>
                  <div>
                    <div className="font-bold text-sm">Suresh Hanje</div>
                    <div className="text-xs text-slate-500">Kannada Tutor</div>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Close menu">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {menuItems.map((item, i) => {
                    const isActive = isActiveNavLink(pathname, locale, item.href);

                    return (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={getLocalizedPath(locale, item.href)}
                        onClick={onClose}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors border-l-2',
                          isActive
                            ? 'bg-primary-50 dark:bg-primary-900/25 text-primary-600 dark:text-primary-400 font-semibold border-primary-500'
                            : 'text-slate-700 dark:text-slate-300 border-transparent hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400'
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{t(item.key)}</span>
                      </Link>
                    </motion.div>
                    );
                  })}
                </div>
              </nav>

              <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-2">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
                <Link
                  href={`/${locale}/demo`}
                  onClick={onClose}
                  className="block w-full text-center px-5 py-3 gradient-bg text-white font-semibold rounded-xl shadow-lg"
                >
                  {t('bookDemo')}
                </Link>
                <div className="flex items-center justify-center gap-4 pt-2">
                  <a href="#" className="text-slate-400 hover:text-red-500 transition-colors"><Video className="h-5 w-5" /></a>
                  <a href="#" className="text-slate-400 hover:text-pink-500 transition-colors"><Camera className="h-5 w-5" /></a>
                  <a href="#" className="text-slate-400 hover:text-blue-500 transition-colors"><Share2 className="h-5 w-5" /></a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
