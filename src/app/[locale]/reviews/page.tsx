'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Star } from 'lucide-react';
import { GradientOrbs } from '@/components/shared/gradient-orbs';
import { GlassCard } from '@/components/shared/glass-card';
import { SectionHeader } from '@/components/shared/section-header';
import { AnimatedCounter } from '@/components/shared/animated-counter';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { FadeIn } from '@/components/animations/fade-in';
import { reviews } from '@/data/reviews';

export default function ReviewsPage() {
  const t = useTranslations('reviews');
  const locale = useLocale();
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <>
      <section className="relative pt-28 pb-16 kannada-pattern overflow-hidden">
        <GradientOrbs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader titleKey="title" subtitleKey="subtitle" namespace="reviews" />
          <FadeIn className="flex justify-center gap-8 mt-8">
            <GlassCard className="text-center px-8 py-6">
              <div className="text-4xl font-bold gradient-text"><AnimatedCounter end={parseFloat(avgRating)} decimals={1} /></div>
              <div className="flex items-center justify-center gap-1 my-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />)}
              </div>
              <div className="text-sm text-slate-500">{t('overallRating')}</div>
            </GlassCard>
            <GlassCard className="text-center px-8 py-6">
              <div className="text-4xl font-bold gradient-text"><AnimatedCounter end={reviews.length} suffix="+" /></div>
              <div className="text-sm text-slate-500 mt-2">{t('totalReviews')}</div>
            </GlassCard>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding -mt-8">
        <div className="max-w-7xl mx-auto">
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.05}>
            {reviews.map((review) => (
              <StaggerItem key={review.id}>
                <GlassCard className="h-full">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-4 text-sm leading-relaxed">
                    &ldquo;{locale === 'kn' ? review.textKn : review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
                    <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-semibold text-sm">
                      {(locale === 'kn' ? review.nameKn : review.name).charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-sm text-slate-800 dark:text-white">{locale === 'kn' ? review.nameKn : review.name}</div>
                      <div className="text-xs text-slate-500">{review.class} • {review.date}</div>
                    </div>
                    {review.isVideo && (
                      <span className="ml-auto px-2 py-1 text-xs rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400">🎥 Video</span>
                    )}
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
