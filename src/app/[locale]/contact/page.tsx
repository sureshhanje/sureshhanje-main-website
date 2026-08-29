'use client';

import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { GlassCard } from '@/components/shared/glass-card';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/animations/fade-in';
import { siteConfig } from '@/lib/constants';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader titleKey="title" subtitleKey="subtitle" namespace="contact" />
        </div>
      </section>

      <section className="section-padding -mt-8 pb-20">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex flex-col gap-6">
              <GlassCard className="p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('info_title')}</h3>
                <div className="space-y-5">
                  {[
                    { icon: Phone, text: t('info_phone'), href: siteConfig.links.phone },
                    { icon: Mail, text: t('info_email'), href: siteConfig.links.email },
                    { icon: MapPin, text: t('info_location') },
                    { icon: Clock, text: t('info_hours') },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400">
                        <item.icon className="h-5 w-5" />
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-base text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-base text-gray-700 dark:text-gray-200 font-medium">{item.text}</span>
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>

              <a
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-4 bg-green-500 hover:bg-green-600 active:scale-[0.99] text-white font-semibold text-base rounded-2xl shadow-lg shadow-green-500/20 transition-all hover-lift"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{t('whatsapp')}</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
