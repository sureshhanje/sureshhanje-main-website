'use client';

import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/animations/fade-in';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  titleKey: string;
  subtitleKey?: string;
  centered?: boolean;
  className?: string;
  gradient?: boolean;
  namespace?: string;
}

export function SectionHeader({ titleKey, subtitleKey, centered = true, className = '', gradient = true, namespace }: SectionHeaderProps) {
  const t = useTranslations(namespace);

  return (
    <FadeIn className={cn('mb-12 md:mb-16', centered && 'text-center', className)}>
      <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight mb-4 text-gray-900 dark:text-white leading-tight">
        {t(titleKey)}
      </h2>
      {subtitleKey && (
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          {t(subtitleKey)}
        </p>
      )}
    </FadeIn>
  );
}
