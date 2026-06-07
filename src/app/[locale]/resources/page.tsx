'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Download, FileText, ClipboardList, FileCheck } from 'lucide-react';
import { GradientOrbs } from '@/components/shared/gradient-orbs';
import { GlassCard } from '@/components/shared/glass-card';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { resources } from '@/data/resources';

const filters = [
  { key: 'filterAll', value: 'all' },
  { key: 'filterNotes', value: 'notes' },
  { key: 'filterPdf', value: 'pdf' },
  { key: 'filterWorksheet', value: 'worksheet' },
  { key: 'filterSamplePaper', value: 'sample-paper' },
];

const iconMap: Record<string, React.ComponentType<{className?: string}>> = {
  FileText, Download, ClipboardList, FileCheck,
};

export default function ResourcesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const t = useTranslations('resources');
  const filtered = activeFilter === 'all' ? resources : resources.filter(r => r.type === activeFilter);

  return (
    <>
      <section className="relative pt-28 pb-16 kannada-pattern overflow-hidden">
        <GradientOrbs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader titleKey="title" subtitleKey="subtitle" namespace="resources" />
          <FadeIn className="flex flex-wrap justify-center gap-2 mt-8">
            {filters.map((f) => (
              <button key={f.value} onClick={() => setActiveFilter(f.value)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeFilter === f.value ? 'gradient-bg text-white shadow-lg' : 'glass-card text-slate-700 dark:text-slate-300'}`}>
                {t(f.key)}
              </button>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="section-padding -mt-8">
        <div className="max-w-7xl mx-auto">
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.06}>
            {filtered.map((resource) => {
              const Icon = iconMap[resource.icon] || FileText;
              return (
                <StaggerItem key={resource.id}>
                  <GlassCard className="h-full flex flex-col text-center">
                    <div className="p-3 rounded-2xl bg-primary-50 dark:bg-primary-900/20 w-fit mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary-500" />
                    </div>
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-2">{resource.titleKey}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 flex-1">{resource.descriptionKey}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <span className="px-2 py-1 rounded bg-primary-50 dark:bg-primary-900/20 text-primary-600">{resource.level}</span>
                      <span className="px-2 py-1 rounded bg-green-50 dark:bg-green-900/20 text-green-600 font-semibold">{t('free')}</span>
                    </div>
                    <a href={resource.downloadUrl} className="inline-flex items-center justify-center gap-2 w-full py-2.5 gradient-bg text-white font-medium rounded-xl text-sm">
                      <Download className="h-4 w-4" />{t('download')}
                    </a>
                  </GlassCard>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
