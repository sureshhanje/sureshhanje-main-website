'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Star } from 'lucide-react';
import { GlassCard } from '@/components/shared/glass-card';
import { SectionHeader } from '@/components/shared/section-header';
import { AnimatedCounter } from '@/components/shared/animated-counter';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { FadeIn } from '@/components/animations/fade-in';
import { reviews } from '@/data/reviews';
import { cn } from '@/lib/utils';

export default function ReviewsPage() {
  const t = useTranslations('reviews');
  const locale = useLocale();
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader titleKey="title" subtitleKey="subtitle" namespace="reviews" />
          <FadeIn className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8">
            <div className="relative overflow-hidden bg-white dark:bg-[#16112a] border border-gray-100 dark:border-[#2a2440] rounded-3xl p-6 shadow-sm min-w-[220px] text-center hover-lift">
              <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 w-16 h-16 bg-amber-400/10 rounded-full blur-lg" />
              <div className="text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
                <AnimatedCounter end={parseFloat(avgRating)} decimals={1} />
              </div>
              <div className="flex items-center justify-center gap-1 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{t('overallRating')}</div>
            </div>

            <div className="relative overflow-hidden bg-white dark:bg-[#16112a] border border-gray-100 dark:border-[#2a2440] rounded-3xl p-6 shadow-sm min-w-[220px] text-center hover-lift">
              <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 w-16 h-16 bg-primary-500/10 rounded-full blur-lg" />
              <div className="text-4xl font-extrabold text-primary-600 dark:text-primary-400 leading-tight">
                <AnimatedCounter end={reviews.length} suffix="+" />
              </div>
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-3">{t('totalReviews')}</div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding -mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance] w-full">
            {reviews.map((review, idx) => {
              const cardStyle = idx % 5;

              return (
                <div key={review.id} className="break-inside-avoid mb-6 inline-block w-full">
                  {cardStyle === 0 && (
                    <div className="bg-primary-600 dark:bg-primary-700 text-white rounded-3xl p-6 shadow-md hover-lift flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
                            ))}
                          </div>
                          <span className="text-[10px] uppercase tracking-widest text-primary-200 font-bold">Featured Review</span>
                        </div>
                        <p className="text-white mb-6 text-sm leading-relaxed font-medium">
                          &ldquo;{locale === 'kn' ? review.textKn : review.text}&rdquo;
                        </p>
                      </div>
                      <div className="flex items-center gap-3 pt-4 border-t border-primary-500/50">
                        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {(locale === 'kn' ? review.nameKn : review.name).charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-white">{locale === 'kn' ? review.nameKn : review.name}</div>
                          <div className="text-[11px] text-primary-200">{review.class} • {review.date}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {cardStyle === 1 && (
                    <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 rounded-3xl p-6 hover-lift flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-0.5 mb-4">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                          ))}
                          {[...Array(5 - review.rating)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 text-gray-200 dark:text-gray-800" />
                          ))}
                        </div>
                        <p className="text-amber-950 dark:text-amber-100 mb-6 text-sm leading-relaxed italic">
                          &ldquo;{locale === 'kn' ? review.textKn : review.text}&rdquo;
                        </p>
                      </div>
                      <div className="flex items-center gap-3 pt-4 border-t border-amber-200/40 dark:border-amber-900/20">
                        <div className="w-9 h-9 rounded-full bg-amber-200 dark:bg-amber-900/40 flex items-center justify-center text-amber-900 dark:text-amber-200 font-bold text-sm shrink-0">
                          {(locale === 'kn' ? review.nameKn : review.name).charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-amber-900 dark:text-amber-200">{locale === 'kn' ? review.nameKn : review.name}</div>
                          <div className="text-[11px] text-amber-600/80 dark:text-amber-400/80">{review.class} • {review.date}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {cardStyle === 2 && (
                    <div className="bg-white dark:bg-[#16112a] border border-gray-100 dark:border-[#2a2440] rounded-3xl p-6 shadow-sm hover-lift relative overflow-hidden flex flex-col justify-between">
                      <div className="absolute top-0 right-4 text-7xl font-serif text-primary-100/40 dark:text-primary-950/20 pointer-events-none select-none">
                        &ldquo;
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-700 dark:text-primary-400 font-bold text-sm shrink-0">
                            {(locale === 'kn' ? review.nameKn : review.name).charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-gray-900 dark:text-white">{locale === 'kn' ? review.nameKn : review.name}</div>
                            <div className="text-[11px] text-gray-400">{review.class} • {review.date}</div>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed relative z-10">
                          &ldquo;{locale === 'kn' ? review.textKn : review.text}&rdquo;
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-0.5 mt-6 pt-3 border-t border-gray-50 dark:border-white/5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 dark:text-gray-800'}`} />
                        ))}
                      </div>
                    </div>
                  )}

                  {cardStyle === 3 && (
                    <div className="bg-white dark:bg-[#16112a] border-2 border-dashed border-primary-200 dark:border-primary-900/50 rounded-3xl p-6 hover-lift flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 dark:text-gray-800'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                          &ldquo;{locale === 'kn' ? review.textKn : review.text}&rdquo;
                        </p>
                      </div>
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-[#2a2440]">
                        <div className="w-9 h-9 rounded-full bg-pink-100 dark:bg-pink-950/40 flex items-center justify-center text-pink-700 dark:text-pink-400 font-bold text-sm shrink-0">
                          {(locale === 'kn' ? review.nameKn : review.name).charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900 dark:text-white">{locale === 'kn' ? review.nameKn : review.name}</div>
                          <div className="text-[11px] text-gray-400">{review.class} • {review.date}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {cardStyle === 4 && (
                    <div className="bg-gradient-to-br from-primary-50/50 to-white dark:from-primary-950/15 dark:to-[#16112a] border border-primary-100/50 dark:border-primary-900/20 rounded-3xl p-6 hover-lift flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-0.5 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 dark:text-gray-800'}`} />
                          ))}
                        </div>
                        <p className="text-gray-750 dark:text-gray-200 mb-6 text-[15px] font-medium leading-relaxed">
                          &ldquo;{locale === 'kn' ? review.textKn : review.text}&rdquo;
                        </p>
                      </div>
                      <div className="flex items-center gap-3 pt-4 border-t border-primary-100/50 dark:border-primary-900/20">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold text-sm shrink-0">
                          {(locale === 'kn' ? review.nameKn : review.name).charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900 dark:text-white">{locale === 'kn' ? review.nameKn : review.name}</div>
                          <div className="text-[11px] text-gray-400">{review.class} • {review.date}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
