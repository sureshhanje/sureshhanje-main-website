'use client';

import { useTranslations } from 'next-intl';
import { GradientOrbs } from '@/components/shared/gradient-orbs';
import { GlassCard } from '@/components/shared/glass-card';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/animations/fade-in';

export default function DemoPage() {
  const t = useTranslations('demo'); // Make sure to add 'demo' keys to your kn.json and en.json

  return (
    <>
      <section className="relative pt-28 pb-16 kannada-pattern overflow-hidden">
        <GradientOrbs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Using the same SectionHeader as your reviews page */}
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
              <div className="relative w-full" style={{ height: "850px" }}>
                {/* 
                  Note: I've converted your link to the embed format. 
                  Google Forms need the /viewform?embedded=true suffix to look right inside a site.
                */}
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSfOjkiEANDqRvsYYco0kOF7W47cFwEX3HeY-es-MrLZtUKyYQ/viewform?embedded=true"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="bg-white"
                >
                  Loading…
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