'use client';

import { useTranslations } from 'next-intl';
import { GradientOrbs } from '@/components/shared/gradient-orbs';
import { GlassCard } from '@/components/shared/glass-card';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/animations/fade-in';

export default function DemoPage() {
  const t = useTranslations('demo');

  return (
    <>
      <section className="relative pt-28 pb-16 kannada-pattern overflow-hidden">
        <GradientOrbs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader 
            titleKey="title" 
            subtitleKey="subtitle" 
            namespace="demo" 
          />
        </div>
      </section>

      <section className="section-padding -mt-8">
        <div className="max-w-4xl mx-auto px-4">
          <FadeIn>
            <GlassCard className="p-0 overflow-hidden border-none shadow-2xl">
              {/* 
                Increased height for mobile (min-h-[900px]) and set a taller desktop height 
                to ensure the "Submit" button is visible and the form is scrollable.
              */}
              <div className="relative w-full h-[800px] md:h-[900px] min-h-[700px]">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSfOjkiEANDqRvsYYco0kOF7W47cFwEX3HeY-es-MrLZtUKyYQ/viewform?embedded=true"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="bg-white"
                  title="Google Form"
                >
                  Loading...
                </iframe>
              </div>
            </GlassCard>
            
            <p className="text-center text-slate-500 mt-6 text-sm">
              Having trouble with the form? Contact us directly via WhatsApp.
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}