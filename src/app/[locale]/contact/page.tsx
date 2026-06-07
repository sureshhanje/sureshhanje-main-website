'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from '@/components/shared/social-icons';
import { GradientOrbs } from '@/components/shared/gradient-orbs';
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
      <section className="relative pt-28 pb-16 kannada-pattern overflow-hidden">
        <GradientOrbs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader titleKey="title" subtitleKey="subtitle" namespace="contact" />
        </div>
      </section>

      <section className="section-padding -mt-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-1 gap-12">
          {/* <FadeIn direction="left">
            <GlassCard hover={false} className="p-8">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4 text-white text-2xl">✓</div>
                  <p className="text-green-600 dark:text-green-400 font-medium">{t('form_success')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { label: t('form_name'), type: 'text', name: 'name' },
                    { label: t('form_email'), type: 'email', name: 'email' },
                    { label: t('form_phone'), type: 'tel', name: 'phone' },
                    { label: t('form_subject'), type: 'text', name: 'subject' },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{f.label}</label>
                      <input type={f.type} required className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('form_message')}</label>
                    <textarea rows={4} required className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none transition-all" />
                  </div>
                  <button type="submit" className="w-full py-4 gradient-bg text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                    <Send className="h-4 w-4" />{t('form_send')}
                  </button>
                </form>
              )}
            </GlassCard>
          </FadeIn> */}

          <FadeIn direction="right">
            <div className="flex flex-col gap-8">
              <GlassCard>
                <h3 className="text-xl font-semibold gradient-text mb-6">{t('info_title')}</h3>
                <div className="space-y-4">
                  {[
                    { icon: Phone, text: t('info_phone') },
                    { icon: Mail, text: t('info_email') },
                    { icon: MapPin, text: t('info_location') },
                    { icon: Clock, text: t('info_hours') },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/20"><item.icon className="h-5 w-5 text-primary-500" /></div>
                      <span className="text-slate-700 dark:text-slate-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-4">{t('social_title')}</h3>
                <div className="flex items-center gap-3">
                  {[
                    { icon: YoutubeIcon, href: siteConfig.links.youtube, color: 'hover:text-red-500' },
                    { icon: InstagramIcon, href: siteConfig.links.instagram, color: 'hover:text-pink-500' },
                    { icon: FacebookIcon, href: siteConfig.links.facebook, color: 'hover:text-blue-500' },
                    { icon: TwitterIcon, href: siteConfig.links.twitter, color: 'hover:text-sky-500' },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={`p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 ${s.color} transition-colors`}>
                      <s.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </GlassCard>

              <a href={siteConfig.links.whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-green-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                <MessageCircle className="h-5 w-5" />{t('whatsapp')}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
