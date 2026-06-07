import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollProgress } from '@/components/layout/scroll-progress';
import { FloatingWidgets } from '@/components/layout/floating-widgets';
import { ThemeScript } from '@/components/theme-script';
import { VercelStats } from '@/components/vercel-stats';
import { siteConfig } from '@/lib/constants';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isKn = locale === 'kn';
  const canonicalUrl = isKn ? `${siteConfig.url}/kn` : siteConfig.url;
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: isKn ? 'ಸುರೇಶ ಹಂಜೆ | ಆನ್‌ಲೈನ್ ಕನ್ನಡ ಶಿಕ್ಷಕ' : 'Best Kannada Tutor in Karnataka | Online Kannada Teacher',
      template: isKn ? '%s | ಸುರೇಶ ಹಂಜೆ' : '%s | Suresh Hanje',
    },
    description: isKn
      ? 'ಅನುಭವಿ ಆನ್‌ಲೈನ್ ಕನ್ನಡ ಶಿಕ್ಷಕರಿಂದ ಶಾಲೆ, ಪಿಯುಸಿ, ಪದವಿ, ಆಡು ಕನ್ನಡ ಮತ್ತು ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷೆಗಳಿಗೆ ಕನ್ನಡ ಕಲಿಯಿರಿ. ಉಚಿತ ಡೆಮೊ ಬುಕ್ ಮಾಡಿ.'
      : 'Best Kannada tutor and online Kannada teacher for school, PUC, degree, spoken Kannada, and competitive exam students. Book a free demo class online.',
    keywords: ['Best Kannada Tutor', 'Online Kannada Teacher', 'Kannada Tutor Online', 'Kannada Classes Online', 'Spoken Kannada Classes', 'Kannada Teacher', 'Learn Kannada Online', 'Kannada Tuition'],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: siteConfig.url,
        kn: `${siteConfig.url}/kn`,
      },
    },
    openGraph: {
      type: 'website',
      locale: isKn ? 'kn_IN' : 'en_IN',
      url: canonicalUrl,
      siteName: siteConfig.name,
      title: isKn ? 'ಸುರೇಶ ಹಂಜೆ | ಆನ್‌ಲೈನ್ ಕನ್ನಡ ಶಿಕ್ಷಕ' : 'Best Kannada Tutor in Karnataka | Online Kannada Teacher',
      description: isKn
        ? 'ಅನುಭವಿ ಆನ್‌ಲೈನ್ ಕನ್ನಡ ಶಿಕ್ಷಕರಿಂದ ಶಾಲೆ, ಪಿಯುಸಿ, ಪದವಿ, ಆಡು ಕನ್ನಡ ಮತ್ತು ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷೆಗಳಿಗೆ ಕನ್ನಡ ಕಲಿಯಿರಿ.'
        : 'Best Kannada tutor and online Kannada teacher for school, PUC, degree, spoken Kannada, and competitive exam students.',
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isKn ? 'ಸುರೇಶ ಹಂಜೆ | ಆನ್‌ಲೈನ್ ಕನ್ನಡ ಶಿಕ್ಷಕ' : 'Best Kannada Tutor in Karnataka | Online Kannada Teacher',
      description: isKn
        ? 'ಅನುಭವಿ ಆನ್‌ಲೈನ್ ಕನ್ನಡ ಶಿಕ್ಷಕರಿಂದ ಕನ್ನಡ ಕಲಿಯಿರಿ. ಉಚಿತ ಡೆಮೊ ಬುಕ್ ಮಾಡಿ.'
        : 'Learn Kannada with a trusted online teacher. Book a free demo class.',
      images: [siteConfig.ogImage],
    },
    category: 'education',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
      apple: '/apple-icon',
    },
  };
}

import { PlayfulBackground } from '@/components/layout/playful-background';

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth" className={inter.variable}>
      <head>
        <ThemeScript />
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: siteConfig.name,
              alternateName: 'Best Kannada Tutor',
              url: siteConfig.url,
              logo: `${siteConfig.url}/icon.svg`,
              description: siteConfig.description,
              sameAs: [siteConfig.links.facebook, siteConfig.links.instagram, siteConfig.links.youtube, siteConfig.links.twitter],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: siteConfig.links.phone.replace('tel:', ''),
                contactType: 'customer support',
                availableLanguage: ['en', 'kn'],
              },
            }),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-surface-light dark:bg-surface-dark text-gray-900 dark:text-gray-100 antialiased">
        <Providers locale={locale} messages={messages}>
          <PlayfulBackground />
          <ScrollProgress />
          <Navbar />
          <main className="flex-1 min-h-0 relative z-10">{children}</main>
          <Footer />
          <FloatingWidgets />
          <VercelStats />
        </Providers>
      </body>
    </html>
  );
}
