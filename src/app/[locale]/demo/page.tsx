'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/shared/glass-card';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/animations/fade-in';
import { siteConfig } from '@/lib/constants';

export default function DemoPage() {
  const t = useTranslations('demo');
  const whatsappLink = `${siteConfig.links.whatsapp}?text=${encodeURIComponent('Hi, I want to book a Kannada demo class.')}`;

  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-200/20 dark:bg-primary-900/15 rounded-full blur-[100px]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#16112a] border border-gray-200 dark:border-[#2a2440] text-[13px] font-medium text-gray-600 dark:text-gray-400 mb-6 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-primary-500" />
                Best Kannada Tutor | Online Kannada Teacher
              </div>
              <SectionHeader titleKey="title" subtitleKey="subtitle" namespace="demo" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding -mt-8">
        <div className="max-w-3xl mx-auto px-4">
          <FadeIn>
            <div className="grid gap-5">
              <GlassCard className="overflow-hidden">
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    'Free 30-minute demo class',
                    'Personalized learning plan',
                    'For school, PUC, degree, and spoken Kannada',
                    'Online Kannada teacher support',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl bg-primary-50/50 dark:bg-primary-950/20 p-3.5">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary-500 shrink-0" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-semibold shadow-sm shadow-primary-600/20 transition-all text-sm">
                    <MessageCircle className="h-4 w-4" />
                    Book via WhatsApp
                  </Link>
                  <Link href="https://forms.gle/tgMLip8JM6ZvYSyT6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-[#16112a] border border-gray-200 dark:border-[#2a2440] text-gray-700 dark:text-gray-300 font-semibold hover:border-primary-300 dark:hover:border-primary-800 transition-all text-sm">
                    Open Google Form
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </GlassCard>

              <GlassCard className="p-0 overflow-hidden">
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