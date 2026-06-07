import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollProgress } from '@/components/layout/scroll-progress';
import { FloatingWidgets } from '@/components/layout/floating-widgets';
import { ThemeScript } from '@/components/theme-script';
import { VercelStats } from '@/components/vercel-stats';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isKn = locale === 'kn';
  return {
    title: { default: isKn ? 'ಸುರೇಶ ಹಂಜೆ - ಕನ್ನಡ ಶಿಕ್ಷಕ | ಆನ್‌ಲೈನ್ ಕನ್ನಡ ಕಲಿಯಿರಿ' : 'Suresh Hanje - Kannada Tutor | Learn Kannada Online', template: isKn ? '%s | ಸುರೇಶ ಹಂಜೆ' : '%s | Suresh Hanje' },
    description: isKn ? 'ಅನುಭವಿ ಶಿಕ್ಷಕರಿಂದ ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಕನ್ನಡ ಕಲಿಯಿರಿ.' : 'Learn Kannada with confidence from an experienced teacher. 15+ years experience.',
    keywords: ['Online Kannada Tutor', 'Kannada Classes Online', 'Spoken Kannada Classes', 'Kannada Teacher', 'Learn Kannada Online'],
    openGraph: { type: 'website', locale: isKn ? 'kn_IN' : 'en_IN', url: 'https://sureshhanje.com', siteName: 'Suresh Hanje' },
    twitter: { card: 'summary_large_image', title: 'Suresh Hanje - Kannada Tutor' },
    robots: { index: true, follow: true },
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
      apple: '/apple-icon',
    },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth" className={inter.variable}>
      <head>
        <ThemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-surface-light dark:bg-surface-dark text-slate-800 dark:text-slate-200 antialiased">
        <Providers locale={locale} messages={messages}>
          <ScrollProgress />
          <Navbar />
          <main className="flex-1 min-h-0">{children}</main>
          <Footer />
          <FloatingWidgets />
          <VercelStats />
        </Providers>
      </body>
    </html>
  );
}
