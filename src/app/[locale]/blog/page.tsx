'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, Clock, Tag, ArrowRight } from 'lucide-react';
import { GradientOrbs } from '@/components/shared/gradient-orbs';
import { GlassCard } from '@/components/shared/glass-card';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { blogPosts } from '@/data/blog-posts';

const categories = ['cat_all', 'cat_learn', 'cat_grammar', 'cat_spoken', 'cat_exam', 'cat_culture', 'cat_tips'];
const categoryMap: Record<string, string> = { cat_all: 'all', cat_learn: 'learn-kannada', cat_grammar: 'grammar', cat_spoken: 'spoken', cat_exam: 'exam-prep', cat_culture: 'culture', cat_tips: 'tips' };

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('cat_all');
  const [searchQuery, setSearchQuery] = useState('');
  const t = useTranslations('blog');

  const filtered = blogPosts.filter(post => {
    const catMatch = activeCategory === 'cat_all' || post.category === categoryMap[activeCategory];
    const searchMatch = !searchQuery || t(post.titleKey.replace('blog.', '')).toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <>
      <section className="relative pt-28 pb-16 kannada-pattern overflow-hidden">
        <GradientOrbs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader titleKey="title" subtitleKey="subtitle" namespace="blog" />
          <FadeIn className="max-w-md mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text" placeholder={t('search')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl glass-card focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </FadeIn>
          <FadeIn className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? 'gradient-bg text-white shadow-lg' : 'glass-card text-slate-700 dark:text-slate-300'}`}>
                {t(cat)}
              </button>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="section-padding -mt-8">
        <div className="max-w-7xl mx-auto">
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {filtered.map((post) => (
              <StaggerItem key={post.id}>
                <GlassCard className="h-full flex flex-col">
                  <div className="h-48 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/20 mb-4 flex items-center justify-center">
                    <span className="text-5xl text-primary-400/50">📚</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 text-xs rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium">
                      {t(post.categoryKey.replace('blog.', ''))}
                    </span>
                    {post.featured && <span className="px-2 py-1 text-xs rounded-lg bg-accent-100 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300">★ Featured</span>}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white leading-tight">{t(post.titleKey.replace('blog.', ''))}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 flex-1">{t(post.excerptKey.replace('blog.', ''))}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readTime} {t('readTime')}</span>
                      <span>{post.date}</span>
                    </div>
                    <span className="text-primary-500 font-medium flex items-center gap-1 hover:underline cursor-pointer">
                      {t('readMore')} <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
