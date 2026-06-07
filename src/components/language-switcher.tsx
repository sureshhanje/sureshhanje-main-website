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
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-200 disabled:opacity-50"
      aria-label="Switch language"
    >
      <Globe className="h-3.5 w-3.5" />
      <span>{locale === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
    </button>
  );
}
