'use client';

import { useState } from 'react';
import Script from 'next/script';
import { useTranslations, useLocale } from 'next-intl';
import { Star, ChevronDown, Sparkles, Heart } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { reviews } from '@/data/reviews';

const REVIEWS_PER_PAGE = 8;

export default function ReviewsPage() {
  const t = useTranslations('reviews');
  const locale = useLocale();
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE);

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + REVIEWS_PER_PAGE, reviews.length));
  };

  return (
    <>
      {/* Header Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
              {t('title')}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('subtitle')}
            </p>

            {/* Overall Rating Display */}
            <FadeIn className="inline-flex items-center gap-3 mt-6 px-5 py-2.5 rounded-full bg-white dark:bg-[#16112a] border border-gray-200/80 dark:border-[#2a2440] shadow-sm">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {avgRating} / 5.0
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                • {t('overallRating')}
              </span>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="section-padding !pt-2 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance] w-full">
            {visibleReviews.map((review, idx) => {
              const cardStyle = idx % 5;
              const hasBoard = review.board && review.board !== '—';
              const hasSubject = review.subject && review.subject !== '—';

              return (
                <div key={review.id} className="break-inside-avoid mb-6 inline-block w-full">
                  {cardStyle === 0 && (
                    <div className="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 text-white rounded-3xl p-6 shadow-md hover-lift flex flex-col justify-between border border-primary-500/30">
                      <div>
                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
                          ))}
                        </div>

                        {/* Category & Board Tags */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-4">
                          <span className="px-2.5 py-0.5 rounded-lg bg-white/20 text-white text-[11px] font-medium">
                            {review.category}
                          </span>
                          {hasBoard && (
                            <span className="px-2 py-0.5 rounded-lg bg-white/10 text-primary-100 text-[11px] font-medium">
                              Board: {review.board}
                            </span>
                          )}
                          {hasSubject && (
                            <span className="px-2 py-0.5 rounded-lg bg-white/10 text-primary-100 text-[11px] font-medium">
                              {review.subject}
                            </span>
                          )}
                        </div>

                        {/* Review Text */}
                        <p className="text-white/95 mb-6 text-sm leading-relaxed font-normal">
                          &ldquo;{review.text}&rdquo;
                        </p>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center gap-3 pt-4 border-t border-primary-500/40">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm shrink-0 border border-white/30">
                          {review.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-sm text-white truncate">{review.name}</div>
                          <div className="text-[11px] text-primary-200">{review.date}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {cardStyle === 1 && (
                    <div className="bg-amber-50/80 dark:bg-[#1a1528] border border-amber-200/60 dark:border-amber-900/30 rounded-3xl p-6 hover-lift flex flex-col justify-between shadow-sm">
                      <div>
                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                          ))}
                        </div>

                        {/* Category & Board Tags */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-4">
                          <span className="px-2.5 py-0.5 rounded-lg bg-amber-200/50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 text-[11px] font-medium border border-amber-300/40 dark:border-amber-800/30">
                            {review.category}
                          </span>
                          {hasBoard && (
                            <span className="px-2 py-0.5 rounded-lg bg-white dark:bg-[#16112a] text-gray-600 dark:text-gray-300 text-[11px] font-medium border border-gray-200 dark:border-gray-700/50">
                              {review.board}
                            </span>
                          )}
                          {hasSubject && (
                            <span className="px-2 py-0.5 rounded-lg bg-white dark:bg-[#16112a] text-gray-600 dark:text-gray-300 text-[11px] font-medium border border-gray-200 dark:border-gray-700/50">
                              {review.subject}
                            </span>
                          )}
                        </div>

                        {/* Review Text */}
                        <p className="text-gray-700 dark:text-gray-200 mb-6 text-sm leading-relaxed">
                          &ldquo;{review.text}&rdquo;
                        </p>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center gap-3 pt-4 border-t border-amber-200/50 dark:border-amber-900/30">
                        <div className="w-10 h-10 rounded-full bg-amber-200 dark:bg-amber-900/50 flex items-center justify-center text-amber-900 dark:text-amber-200 font-bold text-sm shrink-0">
                          {review.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-sm text-gray-900 dark:text-white truncate">{review.name}</div>
                          <div className="text-[11px] text-gray-500 dark:text-gray-400">{review.date}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {cardStyle === 2 && (
                    <div className="bg-white dark:bg-[#16112a] border border-gray-100 dark:border-[#2a2440] rounded-3xl p-6 shadow-sm hover-lift relative overflow-hidden flex flex-col justify-between">
                      <div>
                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                          ))}
                        </div>

                        {/* Category & Board Tags */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-4">
                          <span className="px-2.5 py-0.5 rounded-lg bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 text-[11px] font-medium border border-primary-100 dark:border-primary-900/30">
                            {review.category}
                          </span>
                          {hasBoard && (
                            <span className="px-2 py-0.5 rounded-lg bg-gray-50 dark:bg-[#1a1430] text-gray-600 dark:text-gray-300 text-[11px] font-medium border border-gray-100 dark:border-gray-800">
                              {review.board}
                            </span>
                          )}
                          {hasSubject && (
                            <span className="px-2 py-0.5 rounded-lg bg-gray-50 dark:bg-[#1a1430] text-gray-600 dark:text-gray-300 text-[11px] font-medium border border-gray-100 dark:border-gray-800">
                              {review.subject}
                            </span>
                          )}
                        </div>

                        {/* Review Text */}
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          &ldquo;{review.text}&rdquo;
                        </p>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-[#2a2440] mt-4">
                        <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold text-sm shrink-0">
                          {review.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-sm text-gray-900 dark:text-white truncate">{review.name}</div>
                          <div className="text-[11px] text-gray-400">{review.date}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {cardStyle === 3 && (
                    <div className="bg-white dark:bg-[#16112a] border-2 border-dashed border-primary-200 dark:border-primary-900/50 rounded-3xl p-6 hover-lift flex flex-col justify-between shadow-sm">
                      <div>
                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                          ))}
                        </div>

                        {/* Category & Board Tags */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-4">
                          <span className="px-2.5 py-0.5 rounded-lg bg-pink-50 dark:bg-pink-950/30 text-pink-700 dark:text-pink-300 text-[11px] font-medium border border-pink-100 dark:border-pink-900/30">
                            {review.category}
                          </span>
                          {hasBoard && (
                            <span className="px-2 py-0.5 rounded-lg bg-gray-50 dark:bg-[#1a1430] text-gray-600 dark:text-gray-300 text-[11px] font-medium border border-gray-100 dark:border-gray-800">
                              {review.board}
                            </span>
                          )}
                          {hasSubject && (
                            <span className="px-2 py-0.5 rounded-lg bg-gray-50 dark:bg-[#1a1430] text-gray-600 dark:text-gray-300 text-[11px] font-medium border border-gray-100 dark:border-gray-800">
                              {review.subject}
                            </span>
                          )}
                        </div>

                        {/* Review Text */}
                        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                          &ldquo;{review.text}&rdquo;
                        </p>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-[#2a2440]">
                        <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-950/40 flex items-center justify-center text-pink-700 dark:text-pink-400 font-bold text-sm shrink-0">
                          {review.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-sm text-gray-900 dark:text-white truncate">{review.name}</div>
                          <div className="text-[11px] text-gray-400">{review.date}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {cardStyle === 4 && (
                    <div className="bg-gradient-to-br from-primary-50/50 to-white dark:from-primary-950/15 dark:to-[#16112a] border border-primary-100/60 dark:border-primary-900/30 rounded-3xl p-6 hover-lift flex flex-col justify-between shadow-sm">
                      <div>
                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                          ))}
                        </div>

                        {/* Category & Board Tags */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-4">
                          <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 text-[11px] font-medium border border-emerald-100 dark:border-emerald-900/30">
                            {review.category}
                          </span>
                          {hasBoard && (
                            <span className="px-2 py-0.5 rounded-lg bg-white dark:bg-[#16112a] text-gray-600 dark:text-gray-300 text-[11px] font-medium border border-gray-200 dark:border-gray-700/50">
                              {review.board}
                            </span>
                          )}
                          {hasSubject && (
                            <span className="px-2 py-0.5 rounded-lg bg-white dark:bg-[#16112a] text-gray-600 dark:text-gray-300 text-[11px] font-medium border border-gray-200 dark:border-gray-700/50">
                              {review.subject}
                            </span>
                          )}
                        </div>

                        {/* Review Text */}
                        <p className="text-gray-700 dark:text-gray-200 mb-6 text-sm leading-relaxed font-normal">
                          &ldquo;{review.text}&rdquo;
                        </p>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center gap-3 pt-4 border-t border-primary-100/50 dark:border-primary-900/20">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold text-sm shrink-0">
                          {review.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-sm text-gray-900 dark:text-white truncate">{review.name}</div>
                          <div className="text-[11px] text-gray-400">{review.date}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Show More Button */}
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={handleShowMore}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 active:scale-95 text-white font-semibold text-sm shadow-md transition-all duration-200 hover-lift"
              >
                <span>Show More Reviews</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Endless Reviews Note Banner */}
          <div className="mt-14 max-w-3xl mx-auto">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-primary-50/80 via-white to-amber-50/60 dark:from-[#1c1533] dark:via-[#16112a] dark:to-[#221a3a] border border-primary-100 dark:border-[#2f274a] text-center shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary-700 dark:text-primary-300">
                  {locale === 'kn' ? 'ಅಂತ್ಯವಿಲ್ಲದ ವಿಮರ್ಶೆಗಳು ಮತ್ತು ಮೆಚ್ಚುಗೆಗಳು' : 'Endless Reviews & Appreciation'}
                </span>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              </div>
              <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base font-medium leading-relaxed">
                {locale === 'kn'
                  ? 'ಕಳೆದ ಹಲವು ವರ್ಷಗಳಿಂದ ವಿದ್ಯಾರ್ಥಿಗಳು ಮತ್ತು ಪೋಷಕರಿಂದ ನೂರಾರು ಅದ್ಭುತ ವಿಮರ್ಶೆಗಳು ನಿರಂತರವಾಗಿ ಬರುತ್ತಿವೆ. ಈ ಅಪಾರ ಪ್ರೀತಿ ಮತ್ತು ಮೆಚ್ಚುಗೆಯನ್ನು ಒಂದೇ ಪುಟದಲ್ಲಿ ಪೂರ್ಣವಾಗಿ ಪ್ರದರ್ಶಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ನಮ್ಮ ಮೇಲೆ ಇಟ್ಟಿರುವ ನಂಬಿಕೆಗೆ ಹೃತ್ಪೂರ್ವಕ ಧನ್ಯವಾದಗಳು!'
                  : 'We receive endless heartfelt reviews and wonderful feedback from students and parents year after year. With hundreds of success stories and notes of appreciation, we couldn’t fit them all on a single page. We are deeply grateful for your continuous trust and love!'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Script
        id="reviews-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Suresh Hanje Kannada Tutor & Online Tuition',
            url: 'https://sureshhanje.com/reviews',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: avgRating,
              reviewCount: reviews.length.toString(),
              bestRating: '5',
              worstRating: '1',
            },
            review: reviews.slice(0, 20).map((r) => ({
              '@type': 'Review',
              author: {
                '@type': 'Person',
                name: r.name,
              },
              datePublished: r.date,
              reviewBody: r.text,
              reviewRating: {
                '@type': 'Rating',
                ratingValue: r.rating.toString(),
                bestRating: '5',
                worstRating: '1',
              },
            })),
          }),
        }}
      />
    </>
  );
}
