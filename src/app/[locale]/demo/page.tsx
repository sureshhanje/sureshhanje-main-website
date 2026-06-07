'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { GradientOrbs } from '@/components/shared/gradient-orbs';
import { GlassCard } from '@/components/shared/glass-card';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/animations/fade-in';
import { siteConfig } from '@/lib/constants';

export default function DemoPage() {
  const t = useTranslations('demo');
  const whatsappLink = `${siteConfig.links.whatsapp}?text=${encodeURIComponent('Hi, I want to book a Kannada demo class.')}`;

  return (
    <>
      <section className="relative pt-28 pb-16 kannada-pattern overflow-hidden">
        <GradientOrbs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-primary-600 dark:text-primary-400 mb-5">
                <Sparkles className="h-4 w-4" />
                Best Kannada Tutor | Online Kannada Teacher
              </div>
              <SectionHeader titleKey="title" subtitleKey="subtitle" namespace="demo" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding -mt-8">
        <div className="max-w-4xl mx-auto px-4">
          <FadeIn>
            <div className="grid gap-6">
              <GlassCard className="overflow-hidden">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    'Free 30-minute demo class',
                    'Personalized learning plan',
                    'For school, PUC, degree, and spoken Kannada',
                    'Online Kannada teacher support',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/50 dark:bg-slate-900/40 p-4">
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary-500 shrink-0" />
                      <p className="text-sm text-slate-600 dark:text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-semibold shadow-lg shadow-primary-500/25">
                    <MessageCircle className="h-4 w-4" />
                    Book via WhatsApp
                  </Link>
                  <Link href="https://forms.gle/tgMLip8JM6ZvYSyT6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass-card text-primary-700 dark:text-primary-300 font-semibold">
                    Open Google Form
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </GlassCard>

              <GlassCard className="p-0 overflow-hidden border-none shadow-2xl">
                <div className="relative w-full min-h-[900px] sm:min-h-[980px] md:h-[1050px]">
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSfOjkiEANDqRvsYYco0kOF7W47cFwEX3HeY-es-MrLZtUKyYQ/viewform?embedded=true"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    className="bg-white"
                    title="Book Kannada demo class form"
                  >
                    Loading...
                  </iframe>
                </div>
              </GlassCard>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}