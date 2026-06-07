'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { BookOpen, Clock, BarChart, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/shared/glass-card';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { courses, getCoursesByCategory } from '@/data/courses';
import { cn } from '@/lib/utils';

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
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader titleKey="title" subtitleKey="subtitle" namespace="courses" />

          <FadeIn className="flex flex-wrap justify-center gap-2 mt-8">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                  activeFilter === f.value
                    ? 'bg-primary-600 text-white shadow-sm shadow-primary-600/20'
                    : 'bg-white dark:bg-[#16112a] border border-gray-200 dark:border-[#2a2440] text-gray-600 dark:text-gray-400 hover:border-primary-300 dark:hover:border-primary-800'
                }`}
              >
                {t(f.key)}
              </button>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="section-padding -mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => {
              return (
                <div key={course.id} className="flex flex-col">
                  <GlassCard className="hover-lift p-6 flex flex-col justify-between h-full w-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-950/40">
                          <BookOpen className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                        </div>
                        {course.popular && (
                          <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-primary-600 text-white uppercase tracking-wide">{t('popular')}</span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t(course.titleKey.replace('courses.', ''))}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{t(course.descriptionKey.replace('courses.', ''))}</p>
                    </div>
                    <div className="mt-auto">
                      <div className="flex items-center gap-4 text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-4 pt-2 border-t border-gray-100/60 dark:border-white/5">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
                        <span className="flex items-center gap-1"><BarChart className="h-3 w-3" />{course.level}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {course.features.map((f, i) => (
                          <span key={i} className="px-2 py-0.5 text-[11px] rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 font-medium">{f}</span>
                        ))}
                      </div>
                      <Link
                        href={`/${locale}/demo`}
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full shadow-sm shadow-primary-600/20 transition-all text-sm"
                      >
                        {t('bookDemo')} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
