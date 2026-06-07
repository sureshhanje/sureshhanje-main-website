'use client';

import { useTranslations, useLocale } from 'next-intl';
import { GraduationCap, Award, BookOpen, CheckCircle, Clock, Target, Users } from 'lucide-react';
import { GlassCard } from '@/components/shared/glass-card';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { AnimatedCounter } from '@/components/shared/animated-counter';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  const t = useTranslations('about');

  const timeline = Array.from({ length: 6 }, (_, i) => ({
    year: t(`tl${i + 1}_year`),
    title: t(`tl${i + 1}_title`),
    desc: t(`tl${i + 1}_desc`),
  }));

  const achievements = Array.from({ length: 6 }, (_, i) => t(`ach${i + 1}`));
  const philosophy = Array.from({ length: 5 }, (_, i) => t(`philosophy_${i + 1}`));

  const methodology = Array.from({ length: 4 }, (_, i) => ({
    title: t(`meth${i + 1}_title`),
    desc: t(`meth${i + 1}_desc`),
    icon: [Target, BookOpen, Users, CheckCircle][i],
    num: i + 1,
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader titleKey="title" subtitleKey="subtitle" namespace="about" />
        </div>
      </section>

      {/* Bio */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left">
            <div className="relative">
              <div className="w-full aspect-[4/5] max-w-md mx-auto glass-card rounded-3xl flex flex-col items-center justify-center p-8">
                <div className="text-9xl text-primary-500 dark:text-primary-400 mb-4">ಕ</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">ಸುರೇಶ ಹಂಜೆ</div>
                <div className="text-gray-500 mt-2">15+ Years Experience</div>
                <div className="mt-6 grid grid-cols-2 gap-3 w-full">
                  <div className="text-center p-3 rounded-xl bg-primary-50 dark:bg-primary-950/40">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400"><AnimatedCounter end={500} suffix="+" /></div>
                    <div className="text-xs text-gray-500">Students</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30">
                    <div className="text-2xl font-bold text-amber-600 dark:text-amber-400"><AnimatedCounter end={95} suffix="%" /></div>
                    <div className="text-xs text-gray-500">Pass Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('bio_title')}</h2>
            <div className="space-y-4 text-gray-500 dark:text-gray-400 leading-relaxed">
              <p>{t('bio_p1')}</p>
              <p>{t('bio_p2')}</p>
              <p>{t('bio_p3')}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="feature-card-bg rounded-3xl p-8 md:p-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('philosophy_title')}</h2>
              <blockquote className="text-lg italic text-primary-600 dark:text-primary-400 mb-8">
                &ldquo;{t('philosophy_quote')}&rdquo;
              </blockquote>
              <ul className="space-y-3 text-left max-w-lg mx-auto">
                {philosophy.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <SectionHeader titleKey="timeline_title" namespace="about" />
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-900/40" />
            {timeline.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'} className={`relative flex ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} mb-8`}>
                <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${i % 2 !== 0 ? 'md:ml-auto' : ''}`}>
                  <GlassCard>
                    <div className="text-primary-600 dark:text-primary-400 font-bold text-sm mb-1">{item.year}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </GlassCard>
                </div>
                <div className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 top-6 w-3 h-3 rounded-full bg-primary-600 dark:bg-primary-500 border-2 border-white dark:border-[#0c0a14]" />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <SectionHeader titleKey="achievements_title" namespace="about" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-6">
            {achievements.map((ach, idx) => {
              const colSpan = idx % 6 === 0 || idx % 6 === 5 
                ? 'md:col-span-4' 
                : idx % 6 === 1 || idx % 6 === 4 
                  ? 'md:col-span-8' 
                  : 'md:col-span-6'; // Alternating 4/8, 8/4, 6/6 spans
              return (
                <div key={idx} className={cn('col-span-1 flex flex-col', colSpan)}>
                  <GlassCard className="flex items-center gap-3 p-4 h-full w-full hover-lift">
                    <Award className="h-5 w-5 text-amber-500 shrink-0" />
                    <span className="font-medium text-gray-900 dark:text-white text-sm">{ach}</span>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <SectionHeader titleKey="methodology_title" namespace="about" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
            {methodology.map((step, idx) => {
              const colSpan = idx % 4 === 0 || idx % 4 === 3 ? 'md:col-span-4' : 'md:col-span-8';
              return (
                <div key={step.num} className={cn('col-span-1 flex flex-col', colSpan)}>
                  <div className="feature-card-bg rounded-2xl p-6 text-center h-full w-full hover-lift flex flex-col justify-center">
                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold mx-auto mb-4 text-sm shrink-0">
                      {step.num}
                    </div>
                    <h3 className="font-semibold text-base mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
