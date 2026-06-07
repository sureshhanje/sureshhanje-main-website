'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { BookOpen, Clock, BarChart, ArrowRight } from 'lucide-react';
import { GradientOrbs } from '@/components/shared/gradient-orbs';
import { GlassCard } from '@/components/shared/glass-card';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { courses, getCoursesByCategory } from '@/data/courses';

const filters = [
  { key: 'filterAll', value: 'all' },
  { key: 'filterSchool', value: 'school' },
  { key: 'filterPuc', value: 'puc' },
  { key: 'filterDegree', value: 'degree' },
  { key: 'filterSpoken', value: 'spoken' },
  { key: 'filterCompetitive', value: 'competitive' },
];

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const t = useTranslations('courses');
  const locale = useLocale();
  const filtered = getCoursesByCategory(activeFilter);

  return (
    <>
      <section className="relative pt-28 pb-16 kannada-pattern overflow-hidden">
        <GradientOrbs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader titleKey="title" subtitleKey="subtitle" namespace="courses" />

          <FadeIn className="flex flex-wrap justify-center gap-2 mt-8">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeFilter === f.value
                    ? 'gradient-bg text-white shadow-lg shadow-primary-500/25'
                    : 'glass-card text-slate-700 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                }`}
              >
                {t(f.key)}
              </button>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="section-padding -mt-8">
        <div className="max-w-7xl mx-auto">
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {filtered.map((course) => (
              <StaggerItem key={course.id}>
                <GlassCard className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/20">
                      <BookOpen className="h-5 w-5 text-primary-500" />
                    </div>
                    {course.popular && (
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full gradient-bg text-white">{t('popular')}</span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">{t(course.titleKey.replace('courses.', ''))}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 flex-1">{t(course.descriptionKey.replace('courses.', ''))}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.duration}</span>
                    <span className="flex items-center gap-1"><BarChart className="h-3.5 w-3.5" />{course.level}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {course.features.map((f, i) => (
                      <span key={i} className="px-2 py-1 text-xs rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300">{f}</span>
                    ))}
                  </div>
                  <Link
                    href={`/${locale}/demo`}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 gradient-bg text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    {t('bookDemo')} <ArrowRight className="h-4 w-4" />
                  </Link>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
