'use client';

import { useTranslations, useLocale } from 'next-intl';
import { GraduationCap, Award, BookOpen, CheckCircle, Clock, Target, Users } from 'lucide-react';
import { GradientOrbs } from '@/components/shared/gradient-orbs';
import { GlassCard } from '@/components/shared/glass-card';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { AnimatedCounter } from '@/components/shared/animated-counter';

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
      <section className="relative pt-28 pb-16 kannada-pattern overflow-hidden">
        <GradientOrbs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader titleKey="title" subtitleKey="subtitle" namespace="about" />
        </div>
      </section>

      {/* Bio */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left">
            <div className="relative">
              <div className="w-full aspect-[4/5] max-w-md mx-auto glass-card rounded-3xl flex flex-col items-center justify-center p-8">
                <div className="text-9xl text-primary-500 mb-4">ಕ</div>
                <div className="text-2xl font-bold gradient-text">ಸುರೇಶ ಹಂಜೆ</div>
                <div className="text-slate-500 mt-2">15+ Years Experience</div>
                <div className="mt-6 grid grid-cols-2 gap-4 w-full">
                  <div className="text-center p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20">
                    <div className="text-2xl font-bold text-primary-600"><AnimatedCounter end={500} suffix="+" /></div>
                    <div className="text-xs text-slate-500">Students</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-accent-50 dark:bg-accent-900/20">
                    <div className="text-2xl font-bold text-accent-600"><AnimatedCounter end={95} suffix="%" /></div>
                    <div className="text-xs text-slate-500">Pass Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <h2 className="text-3xl font-bold gradient-text mb-6">{t('bio_title')}</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>{t('bio_p1')}</p>
              <p>{t('bio_p2')}</p>
              <p>{t('bio_p3')}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <GlassCard className="text-center">
              <h2 className="text-3xl font-bold gradient-text mb-4">{t('philosophy_title')}</h2>
              <blockquote className="text-xl italic text-primary-600 dark:text-primary-400 mb-8">
                &ldquo;{t('philosophy_quote')}&rdquo;
              </blockquote>
              <ul className="space-y-3 text-left max-w-lg mx-auto">
                {philosophy.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">{p}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </FadeIn>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <SectionHeader titleKey="timeline_title" namespace="about" />
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800" />
            {timeline.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'} className={`relative flex ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} mb-8`}>
                <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${i % 2 !== 0 ? 'md:ml-auto' : ''}`}>
                  <GlassCard>
                    <div className="text-primary-500 font-bold text-sm mb-1">{item.year}</div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </GlassCard>
                </div>
                <div className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 top-6 w-3 h-3 rounded-full gradient-bg border-2 border-white dark:border-slate-900" />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <SectionHeader titleKey="achievements_title" namespace="about" />
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach, i) => (
              <StaggerItem key={i}>
                <GlassCard className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-accent-500 shrink-0" />
                  <span className="font-medium text-slate-800 dark:text-white">{ach}</span>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Methodology */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <SectionHeader titleKey="methodology_title" namespace="about" />
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((step) => (
              <StaggerItem key={step.num}>
                <GlassCard className="text-center h-full">
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-800 dark:text-white">{step.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{step.desc}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
