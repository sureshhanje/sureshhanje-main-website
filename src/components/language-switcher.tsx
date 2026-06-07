'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { routing } from '@/i18n/routing';
import { useTransition } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = () => {
    const nextLocale = locale === 'en' ? 'kn' : 'en';
    const segments = pathname.split('/');
    if (routing.locales.includes(segments[1] as 'en' | 'kn')) {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }
    startTransition(() => {
      router.replace(segments.join('/'));
    });
  };

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 text-sm font-medium disabled:opacity-50"
      aria-label="Switch language"
    >
      <Globe className="h-4 w-4" />
      <span>{locale === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
    </button>
  );
}
