'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, GraduationCap, Users, Clock, Star, CheckCircle, Monitor, Sparkles } from 'lucide-react';
import { GradientOrbs } from '@/components/shared/gradient-orbs';
import { GlassCard } from '@/components/shared/glass-card';
import { AnimatedCounter } from '@/components/shared/animated-counter';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { SectionHeader } from '@/components/shared/section-header';
import { siteConfig } from '@/lib/constants';
import { courses } from '@/data/courses';
import { reviews } from '@/data/reviews';

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const getHref = (href: string) => `/${locale}${href}`;
  const popularCourses = courses.filter(c => c.popular).slice(0, 4);
  const topReviews = reviews.filter(r => r.rating === 5).slice(0, 6);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center kannada-pattern overflow-hidden">
        <GradientOrbs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeIn delay={0.1}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-primary-600 dark:text-primary-400 mb-6">
                  <Sparkles className="h-4 w-4" />
                  {t('home.hero.badge')}
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
                  <span className="block text-slate-800 dark:text-white">{t('home.hero.greeting')}</span>
                  <span className="block gradient-text mt-2">{t('home.hero.name')}</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-xl lg:text-2xl text-primary-700 dark:text-primary-300 font-medium mb-4">
                  {t('home.hero.tagline')}
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg leading-relaxed">
                  {t('home.hero.subtitle')}
                </p>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={getHref('/demo')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 gradient-bg text-white font-semibold rounded-2xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-1 transition-all duration-300 text-lg"
                  >
                    {t('home.hero.cta1')}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    href={getHref('/courses')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 glass-card text-primary-700 dark:text-primary-300 font-semibold rounded-2xl hover-lift text-lg"
                  >
                    {t('home.hero.cta2')}
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Hero Visual */}
            <FadeIn direction="right" delay={0.3}>
              <div className="relative hidden lg:block">
                <div className="w-full aspect-square max-w-lg mx-auto relative">
                  <div className="absolute inset-0 gradient-bg rounded-3xl opacity-20 blur-2xl" />
                  <div className="absolute inset-4 glass-card rounded-3xl flex flex-col items-center justify-center p-8 overflow-hidden">
                    <img
                      src="/placeholder.jpeg"
                      alt="Kannada Tutor"
                      className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-3xl" />
                    <div className="relative z-10 flex flex-col items-center justify-end h-full">
                      <div className="text-2xl font-bold gradient-text">ಸುರೇಶ ಹಂಜೆ</div>
                      <div className="text-slate-950 dark:text-slate-950 text-center">ಕನ್ನಡ ಶಿಕ್ಷಕ</div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="relative -mt-8 z-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: siteConfig.stats.experience, suffix: '+', label: t('home.stats.experience'), icon: Clock },
              { value: siteConfig.stats.students, suffix: '+', label: t('home.stats.students'), icon: Users },
              { value: siteConfig.stats.classes, suffix: '+', label: t('home.stats.classes'), icon: BookOpen },
              { value: siteConfig.stats.rating, suffix: '', label: t('home.stats.rating'), icon: Star, decimals: 1 },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1} className="text-center">
                <stat.icon className="h-6 w-6 text-primary-500 mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold gradient-text">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">{stat.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE ===== */}
      <section className="section-padding relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeader titleKey="whyChoose.title" subtitleKey="whyChoose.subtitle" namespace="home" />
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {[
              { icon: Clock, titleKey: 'exp_title', descKey: 'exp_desc', color: 'text-blue-500' },
              { icon: Monitor, titleKey: 'online_title', descKey: 'online_desc', color: 'text-green-500' },
              { icon: GraduationCap, titleKey: 'levels_title', descKey: 'levels_desc', color: 'text-purple-500' },
              { icon: Sparkles, titleKey: 'demo_title', descKey: 'demo_desc', color: 'text-amber-500' },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <GlassCard className="text-center h-full">
                  <div className={`inline-flex p-3 rounded-2xl bg-primary-50 dark:bg-primary-900/20 mb-4 ${item.color}`}>
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">
                    {t(`home.whyChoose.${item.titleKey}`)}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {t(`home.whyChoose.${item.descKey}`)}
                  </p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ===== FEATURED COURSES ===== */}
      <section className="section-padding relative bg-slate-50/50 dark:bg-slate-900/50">
        <GradientOrbs />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeader titleKey="featured.title" subtitleKey="featured.subtitle" namespace="home" />
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {popularCourses.map((course) => (
              <StaggerItem key={course.id}>
                <GlassCard className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/20">
                      <BookOpen className="h-5 w-5 text-primary-500" />
                    </div>
                    {course.popular && (
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full gradient-bg text-white">
                        {t('courses.popular')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">{t(course.titleKey)}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 flex-1">{t(course.descriptionKey)}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{course.duration}</span>
                    <span>{course.level}</span>
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
          <FadeIn className="text-center mt-10">
            <Link href={getHref('/courses')} className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              {t('home.featured.viewAll')} <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeader titleKey="testimonials.title" subtitleKey="testimonials.subtitle" namespace="home" />
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {topReviews.map((review) => (
              <StaggerItem key={review.id}>
                <GlassCard className="h-full">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-4 text-sm leading-relaxed">&ldquo;{locale === 'kn' ? review.textKn : review.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
                    <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-semibold text-sm">
                      {(locale === 'kn' ? review.nameKn : review.name).charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-sm text-slate-800 dark:text-white">{locale === 'kn' ? review.nameKn : review.name}</div>
                      <div className="text-xs text-slate-500">{review.class}</div>
                    </div>
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
          <FadeIn className="text-center mt-10">
            <Link href={getHref('/reviews')} className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:underline">
              {t('home.testimonials.viewAll')} <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-95" />
        <GradientOrbs />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">{t('home.cta.title')}</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">{t('home.cta.subtitle')}</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto">
              {['f1', 'f2', 'f3', 'f4'].map((key) => (
                <div key={key} className="flex items-center gap-2 text-sm text-white/90">
                  <CheckCircle className="h-4 w-4 text-green-300 shrink-0" />
                  <span>{t(`home.cta.${key}`)}</span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link
              href={getHref('/demo')}
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-primary-700 font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              {t('home.cta.button')}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
