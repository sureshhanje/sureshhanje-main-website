'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Clock, UserCheck, FileText, ShieldCheck, Send, MessageCircle } from 'lucide-react';
import { GradientOrbs } from '@/components/shared/gradient-orbs';
import { GlassCard } from '@/components/shared/glass-card';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { siteConfig } from '@/lib/constants';

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations('demo');
  const locale = useLocale();

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  if (submitted) {
    return (
      <section className="relative min-h-screen flex items-center kannada-pattern">
        <GradientOrbs />
        <div className="max-w-lg mx-auto text-center px-4 relative z-10">
          <FadeIn>
            <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6 text-white text-3xl">✓</div>
            <h2 className="text-3xl font-bold gradient-text mb-4">{t('confirm_title')}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">{t('confirm_msg')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={siteConfig.links.whatsapp} className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl">
                <MessageCircle className="h-4 w-4" />{t('confirm_whatsapp')}
              </a>
              <Link href={`/${locale}`} className="inline-flex items-center gap-2 px-6 py-3 glass-card font-semibold rounded-xl">
                {t('confirm_home')}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative pt-28 pb-16 kannada-pattern overflow-hidden">
        <GradientOrbs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader titleKey="title" subtitleKey="subtitle" namespace="demo" />
        </div>
      </section>

      <section className="section-padding -mt-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <FadeIn direction="left">
            <GlassCard hover={false} className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { label: t('form_name'), ph: t('form_namePh'), type: 'text', name: 'name', required: true },
                  { label: t('form_phone'), ph: t('form_phonePh'), type: 'tel', name: 'phone', required: true },
                  { label: t('form_email'), ph: t('form_emailPh'), type: 'email', name: 'email', required: true },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{f.label}</label>
                    <input type={f.type} placeholder={f.ph} required={f.required} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('form_class')}</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all">
                    <option>{t('form_classPh')}</option>
                    <option>Class 1-5</option><option>Class 6-8</option><option>Class 9-10</option>
                    <option>PUC 1</option><option>PUC 2</option><option>Degree</option>
                    <option>Spoken Kannada</option><option>Competitive Exam</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('form_timing')}</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all">
                    <option>{t('form_timingPh')}</option>
                    <option>{t('timing_morning')}</option><option>{t('timing_afternoon')}</option>
                    <option>{t('timing_evening')}</option><option>{t('timing_night')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('form_message')}</label>
                  <textarea rows={3} placeholder={t('form_messagePh')} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none transition-all" />
                </div>
                <button type="submit" className="w-full py-4 gradient-bg text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" />{t('form_submit')}
                </button>
                <a href={siteConfig.links.whatsapp} className="block text-center text-sm text-green-600 font-medium hover:underline">
                  {t('form_whatsapp')} 💬
                </a>
              </form>
            </GlassCard>
          </FadeIn>

          <FadeIn direction="right">
            <h3 className="text-2xl font-bold gradient-text mb-8">{t('expect_title')}</h3>
            <StaggerChildren className="space-y-4">
              {[
                { icon: Clock, tKey: '1' },
                { icon: UserCheck, tKey: '2' },
                { icon: FileText, tKey: '3' },
                { icon: ShieldCheck, tKey: '4' },
              ].map((item) => (
                <StaggerItem key={item.tKey}>
                  <GlassCard className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 shrink-0">
                      <item.icon className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white">{t(`expect${item.tKey}_title`)}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{t(`expect${item.tKey}_desc`)}</p>
                    </div>
                  </GlassCard>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
