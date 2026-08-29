'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, BookOpen, GraduationCap, Users, Clock, Star, CheckCircle, Monitor, Sparkles, Play, BarChart } from 'lucide-react';
import { GlassCard } from '@/components/shared/glass-card';
import { AnimatedCounter } from '@/components/shared/animated-counter';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { SectionHeader } from '@/components/shared/section-header';
import { siteConfig } from '@/lib/constants';
import { courses } from '@/data/courses';
import { reviews } from '@/data/reviews';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const getHref = (href: string) => `/${locale}${href}`;
  const popularCourses = courses.filter(c => c.popular).slice(0, 4);
  const topReviews = reviews.filter(r => r.rating === 5).slice(0, 4);

  return (
    <>
      {/* ===== HERO — Left text, Right photo with playful kid-friendly details ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle purple radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-[120px]" />

        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side: Text & CTAs */}
            <div className="lg:col-span-7 text-left flex flex-col items-start">
              {/* Badge pill */}
              <FadeIn delay={0.1}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#16112a] border border-gray-200 dark:border-[#2a2440] text-[13px] font-medium text-gray-600 dark:text-gray-400 mb-6 shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-primary-500" />
                  {t('home.hero.badge')}
                </div>
              </FadeIn>

              {/* Main heading */}
              <FadeIn delay={0.2}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[66px] font-bold tracking-tight leading-[1.1] mb-6">
                  <span className="text-gray-900 dark:text-white">{t('home.hero.greeting')}</span>
                  <br />
                  <span className="text-primary-600 dark:text-primary-400">{t('home.hero.name')}</span>
                </h1>
              </FadeIn>

              {/* Subtitle */}
              <FadeIn delay={0.3}>
                <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-xl leading-relaxed">
                  {t('home.hero.subtitle')}
                </p>
              </FadeIn>

              {/* CTA Buttons */}
              <FadeIn delay={0.4}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                  <Link
                    href={getHref('/demo')}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full shadow-md shadow-primary-600/20 hover:shadow-lg hover:shadow-primary-600/30 transition-all duration-200 text-[15px]"
                  >
                    {t('home.hero.cta1')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={getHref('/courses')}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white dark:bg-[#16112a] border border-gray-200 dark:border-[#2a2440] text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-[15px]"
                  >
                    {t('home.hero.cta2')}
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Right side: Photo card with cute kid-friendly style */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <FadeIn delay={0.5} className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
                {/* Playful backdrop shapes for kids */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-400/20 dark:bg-amber-400/10 rounded-full blur-xl" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-400/20 dark:bg-primary-500/10 rounded-3xl blur-xl" />

                {/* Playful hand-drawn-style border frame */}
                <div className="absolute inset-0 border-2 border-dashed border-primary-300 dark:border-primary-850 rounded-3xl translate-x-3.5 translate-y-3.5 -z-10" />

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 dark:border-[#2a2440] bg-white dark:bg-[#16112a] hover-lift">
                  <img
                    src="/placeholder.jpeg"
                    alt="Suresh Hanje — Kannada Tutor"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                    <div className="text-lg font-bold text-white">ಸುರೇಶ ಹಂಜೆ</div>
                    <div className="text-sm text-white/70">ಕನ್ನಡ ಶಿಕ್ಷಕ • 15+ Years</div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS — Clean row ===== */}
      <section className="relative -mt-4 z-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: siteConfig.stats.experience, suffix: '+', label: t('home.stats.experience'), icon: Clock },
              { value: siteConfig.stats.students, suffix: '+', label: t('home.stats.students'), icon: Users },
              { value: siteConfig.stats.classes, suffix: '+', label: t('home.stats.classes'), icon: BookOpen },
              { value: siteConfig.stats.rating, suffix: '', label: t('home.stats.rating'), icon: Star, decimals: 1 },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="stat-card">
                  <stat.icon className="h-5 w-5 text-primary-500 mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE — Feature cards with purple tint like Krowtt ===== */}
      <section className="section-padding relative">
        <div className="max-w-6xl mx-auto">
          <SectionHeader titleKey="whyChoose.title" subtitleKey="whyChoose.subtitle" namespace="home" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full mt-10">
            {[
              { icon: Clock, titleKey: 'exp_title', descKey: 'exp_desc' },
              { icon: Monitor, titleKey: 'online_title', descKey: 'online_desc' },
              { icon: GraduationCap, titleKey: 'levels_title', descKey: 'levels_desc' },
              { icon: Sparkles, titleKey: 'demo_title', descKey: 'demo_desc' },
            ].map((item, idx) => {
              const colSpan = idx % 4 === 0 || idx % 4 === 3 ? 'md:col-span-4' : 'md:col-span-8';
              return (
                <div key={idx} className={cn('col-span-1 flex flex-col', colSpan)}>
                  <div className="feature-card-bg rounded-2xl p-6 h-full hover-lift flex flex-col justify-between">
                    <div>
                      <div className="inline-flex p-2.5 rounded-xl bg-white/80 dark:bg-white/5 border border-white/60 dark:border-white/10 mb-4 shadow-sm">
                        <item.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">
                        {t(`home.whyChoose.${item.titleKey}`)}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {t(`home.whyChoose.${item.descKey}`)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURED COURSES ===== */}
      <section className="section-padding relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeader titleKey="featured.title" subtitleKey="featured.subtitle" namespace="home" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full mt-10">
            {popularCourses.map((course, idx) => {
              const colSpan = idx % 4 === 0 || idx % 4 === 3 ? 'md:col-span-4' : 'md:col-span-8';
              return (
                <div key={course.id} className={cn('col-span-1 flex flex-col', colSpan)}>
                  <GlassCard className="hover-lift p-6 flex flex-col justify-between h-full w-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-950/40">
                          <BookOpen className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                        </div>
                        {course.popular && (
                          <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-primary-600 text-white tracking-wide uppercase">
                            {t('courses.popular')}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">{t(course.titleKey)}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">{t(course.descriptionKey)}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-auto pt-2 border-t border-gray-100/60 dark:border-white/5 text-[11px] text-gray-450 dark:text-gray-400 font-medium uppercase tracking-wide">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.duration}</span>
                        <span className="flex items-center gap-1"><BarChart className="h-3.5 w-3.5" />{course.level}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-350 font-bold text-xs border border-amber-100/50 dark:border-amber-900/20 normal-case">
                        {course.fees}
                      </span>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
          <FadeIn className="text-center mt-6">
            <Link href={getHref('/courses')} className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full shadow-sm shadow-primary-600/20 transition-all text-sm">
              {t('home.featured.viewAll')} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding relative">
        <div className="max-w-6xl mx-auto">
          <SectionHeader titleKey="testimonials.title" subtitleKey="testimonials.subtitle" namespace="home" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full mt-10">
            {topReviews.map((review, idx) => {
              const colSpan = idx % 4 === 0 || idx % 4 === 3 ? 'md:col-span-4' : 'md:col-span-8';
              return (
                <div key={review.id} className={cn('col-span-1 flex flex-col', colSpan)}>
                  <GlassCard className="hover-lift p-6 flex flex-col justify-between h-full w-full">
                    <div>
                      <div className="flex items-center gap-0.5 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                    </div>
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-[#2a2440]">
                      <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-700 dark:text-primary-400 font-semibold text-sm shrink-0">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-gray-900 dark:text-white">{review.name}</div>
                        <div className="text-[11px] text-gray-400">
                          {review.category}{review.board && review.board !== '—' ? ` • ${review.board}` : ''}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
          <FadeIn className="text-center mt-10">
            <Link href={getHref('/reviews')} className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium text-sm hover:underline">
              {t('home.testimonials.viewAll')} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ===== CTA — Clean purple section ===== */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight">{t('home.cta.title')}</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-base text-primary-100 mb-8 max-w-xl mx-auto">{t('home.cta.subtitle')}</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
              {['f1', 'f2', 'f3', 'f4'].map((key) => (
                <div key={key} className="flex items-center gap-1.5 text-sm text-white/90">
                  <CheckCircle className="h-4 w-4 text-green-300 shrink-0" />
                  <span>{t(`home.cta.${key}`)}</span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link
              href={getHref('/demo')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-700 font-bold rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 text-[15px]"
            >
              {t('home.cta.button')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
