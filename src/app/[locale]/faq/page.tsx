'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/animations/fade-in';
import { faqs } from '@/data/faqs';

function FAQItem({ questionKey, answerKey, isOpen, onClick }: { questionKey: string; answerKey: string; isOpen: boolean; onClick: () => void }) {
  const t = useTranslations();

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <button onClick={onClick} className="w-full flex items-center justify-between p-5 text-left">
        <span className="font-semibold text-gray-900 dark:text-white pr-4 text-sm">{t(questionKey)}</span>
        <ChevronDown className={`h-4 w-4 text-primary-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 pb-5 text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
              {t(answerKey)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader titleKey="title" subtitleKey="subtitle" namespace="faq" />
        </div>
      </section>

      <section className="section-padding -mt-8">
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <FadeIn key={faq.id} delay={i * 0.03}>
              <FAQItem
                questionKey={faq.questionKey}
                answerKey={faq.answerKey}
                isOpen={openId === faq.id}
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
