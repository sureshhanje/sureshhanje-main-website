'use client';

import { useState, useTransition } from 'react';
import Script from 'next/script';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronDown, Search, X, HelpCircle, GraduationCap, DollarSign, Settings, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/animations/fade-in';
import { faqs } from '@/data/faqs';

const categories = [
  { key: 'all', labelEn: 'All Questions', labelKn: 'ಎಲ್ಲಾ ಪ್ರಶ್ನೆಗಳು', icon: Layers },
  { key: 'general', labelEn: 'General Info', labelKn: 'ಸಾಮಾನ್ಯ', icon: HelpCircle },
  { key: 'courses', labelEn: 'Classes & Syllabus', labelKn: 'ತರಗತಿಗಳು', icon: GraduationCap },
  { key: 'fees', labelEn: 'Fees & Timings', labelKn: 'ಶುಲ್ಕ ಮತ್ತು ಸಮಯ', icon: DollarSign },
  { key: 'technical', labelEn: 'Online Class Setup', labelKn: 'ಆನ್‌ಲೈನ್ ಮಾಹಿತಿ', icon: Settings },
];

function FAQItem({
  questionKey,
  answerKey,
  isOpen,
  onClick,
  searchQuery,
}: {
  questionKey: string;
  answerKey: string;
  isOpen: boolean;
  onClick: () => void;
  searchQuery: string;
}) {
  const t = useTranslations();

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-100 px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden hover:border-primary-300 dark:hover:border-primary-800 transition-all duration-300">
      <button onClick={onClick} className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-gray-50/40 dark:hover:bg-white/5">
        <span className="font-semibold text-gray-900 dark:text-white pr-4 text-sm sm:text-base leading-snug">
          {highlightText(t(questionKey), searchQuery)}
        </span>
        <ChevronDown className={`h-4 w-4 text-primary-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 pt-1 text-gray-500 dark:text-gray-400 leading-relaxed text-sm sm:text-base border-t border-gray-50 dark:border-white/5">
              {t(answerKey)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const filteredFaqs = faqs.filter((faq) => {
    const question = t(faq.questionKey).toLowerCase();
    const answer = t(faq.answerKey).toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = question.includes(query) || answer.includes(query);
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader titleKey="title" subtitleKey="subtitle" namespace="faq" />

          {/* Search Bar - Premium visual style */}
          <FadeIn delay={0.15} className="max-w-2xl mx-auto mt-10 px-2">
            <div className="relative flex items-center bg-white dark:bg-[#16112a] border border-gray-200 dark:border-[#2a2440] rounded-full px-5 py-3 shadow-sm focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent transition-all duration-300">
              <Search className="h-5 w-5 text-gray-400 dark:text-gray-500 shrink-0" />
              <input
                type="text"
                placeholder={locale === 'kn' ? 'ಪ್ರಶ್ನೆಗಳನ್ನು ಹುಡುಕಿ...' : 'Search questions or keywords...'}
                value={searchQuery}
                onChange={(e) => startTransition(() => setSearchQuery(e.target.value))}
                className="w-full bg-transparent border-none outline-none focus:ring-0 ml-3 text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-450 dark:placeholder-gray-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-150 dark:hover:bg-white/5 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </FadeIn>

          {/* Category Filter Pills */}
          <FadeIn delay={0.2} className="flex flex-wrap justify-center gap-2 mt-8 px-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const label = locale === 'kn' ? cat.labelKn : cat.labelEn;
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    setActiveCategory(cat.key);
                    setOpenId(null);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 border ${
                    isActive
                      ? 'bg-primary-600 border-primary-600 text-white shadow-md shadow-primary-600/20'
                      : 'bg-white dark:bg-[#16112a] border-gray-200 dark:border-[#2a2440] text-gray-600 dark:text-gray-450 hover:border-primary-400 dark:hover:border-primary-700'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{label}</span>
                </button>
              );
            })}
          </FadeIn>
        </div>
      </section>

      {/* FAQs List Section */}
      <section className="section-padding -mt-8 pt-4 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              <motion.div
                key="faq-list"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {filteredFaqs.map((faq, i) => (
                  <FAQItem
                    key={faq.id}
                    questionKey={faq.questionKey}
                    answerKey={faq.answerKey}
                    isOpen={openId === faq.id}
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    searchQuery={searchQuery}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-16 bg-white dark:bg-[#16112a] border border-gray-100 dark:border-[#2a2440] rounded-3xl p-8"
              >
                <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {locale === 'kn' ? 'ಯಾವುದೇ ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ' : 'No questions found'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-450 mb-6 max-w-sm mx-auto">
                  {locale === 'kn'
                    ? 'ನಿಮ್ಮ ಹುಡುಕಾಟ ಪದಗಳನ್ನು ಬದಲಾಯಿಸಲು ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ಬೇರೆ ವರ್ಗವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.'
                    : "Try adjusting your keywords or clearing the filter to find what you're looking for."}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-full shadow-sm transition-all"
                >
                  {locale === 'kn' ? 'ಹುಡುಕಾಟವನ್ನು ತೆರವುಗೊಳಿಸಿ' : 'Clear Filters'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.slice(0, 15).map((faq) => ({
              '@type': 'Question',
              name: t(faq.questionKey),
              acceptedAnswer: {
                '@type': 'Answer',
                text: t(faq.answerKey),
              },
            })),
          }),
        }}
      />
    </>
  );
}
