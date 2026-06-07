'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from '@/components/shared/social-icons';
import { GlassCard } from '@/components/shared/glass-card';
import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/animations/fade-in';
import { siteConfig } from '@/lib/constants';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const t = useTranslations('contact');

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader titleKey="title" subtitleKey="subtitle" namespace="contact" />
        </div>
      </section>

      <section className="section-padding -mt-8">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex flex-col gap-5">
              <GlassCard>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">{t('info_title')}</h3>
                <div className="space-y-4">
                  {[
                    { icon: Phone, text: t('info_phone') },
                    { icon: Mail, text: t('info_email') },
                    { icon: MapPin, text: t('info_location') },
                    { icon: Clock, text: t('info_hours') },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-950/40">
                        <item.icon className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('social_title')}</h3>
                <div className="flex items-center gap-2">
                  {[
                    { icon: YoutubeIcon, href: siteConfig.links.youtube },
                    { icon: InstagramIcon, href: siteConfig.links.instagram },
                    { icon: FacebookIcon, href: siteConfig.links.facebook },
                    { icon: TwitterIcon, href: siteConfig.links.twitter },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30 transition-all">
                      <s.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </GlassCard>

              <a href={siteConfig.links.whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-md shadow-green-500/20 transition-all">
                <MessageCircle className="h-5 w-5" />{t('whatsapp')}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
