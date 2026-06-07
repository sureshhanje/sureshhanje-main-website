'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Download, FileText, ClipboardList, FileCheck } from 'lucide-react';
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
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader titleKey="title" subtitleKey="subtitle" namespace="resources" />
          <FadeIn className="flex flex-wrap justify-center gap-2 mt-8">
            {filters.map((f) => (
              <button key={f.value} onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${activeFilter === f.value ? 'bg-primary-600 text-white shadow-sm shadow-primary-600/20' : 'bg-white dark:bg-[#16112a] border border-gray-200 dark:border-[#2a2440] text-gray-600 dark:text-gray-400 hover:border-primary-300 dark:hover:border-primary-800'}`}>
                {t(f.key)}
              </button>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="section-padding -mt-8">
        <div className="max-w-6xl mx-auto">
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.06}>
            {filtered.map((resource) => {
              const Icon = iconMap[resource.icon] || FileText;
              return (
                <StaggerItem key={resource.id}>
                  <GlassCard className="h-full flex flex-col text-center">
                    <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/40 w-fit mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">{resource.titleKey}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex-1">{resource.descriptionKey}</p>
                    <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium mb-4">
                      <span className="px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400">{resource.level}</span>
                      <span className="px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 font-semibold">{t('free')}</span>
                    </div>
                    <a href={resource.downloadUrl} className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-full text-xs transition-all">
                      <Download className="h-3.5 w-3.5" />{t('download')}
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
