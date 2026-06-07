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
      <div className={cn('flex items-center gap-3 mb-4', centered && 'justify-center')}>
        <div className="h-1 w-8 rounded-full gradient-bg" />
        <div className="h-1 w-3 rounded-full bg-accent-500" />
      </div>
      <h2 className={cn('text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4', gradient && 'gradient-text')}>
        {t(titleKey)}
      </h2>
      {subtitleKey && (
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {t(subtitleKey)}
        </p>
      )}
    </FadeIn>
  );
}
