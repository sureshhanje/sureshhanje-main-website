import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import { getMessages } from 'next-intl/server';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollProgress } from '@/components/layout/scroll-progress';
import { FloatingWidgets } from '@/components/layout/floating-widgets';
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
      default: isKn
        ? 'ಆನ್‌ಲೈನ್ ಕನ್ನಡ ಟ್ಯೂಷನ್ ಮತ್ತು ಶಿಕ್ಷಕ | ಸುರೇಶ ಹಂಜೆ (CBSE, ICSE, PUC, Spoken Kannada)'
        : 'Best Online Kannada Tuition in Bangalore | Suresh Hanje Kannada Tutor',
      template: isKn ? '%s | ಸುರೇಶ ಹಂಜೆ - ಆನ್‌ಲೈನ್ ಕನ್ನಡ ಶಿಕ್ಷಕ' : '%s | Suresh Hanje - Best Online Kannada Tutor',
    },
    description: isKn
      ? '15+ ವರ್ಷಗಳ ಅನುಭವವಿರುವ ಪ್ರಸಿದ್ಧ ಶಿಕ್ಷಕರಿಂದ ಆನ್‌ಲೈನ್ ಕನ್ನಡ ಟ್ಯೂಷನ್. CBSE, ICSE, State ಬೋರ್ಡ್, 1 & 2ನೇ PUC, ಸ್ಪರ್ಧಾತ್ಮಕ ಪರೀಕ್ಷೆ ಮತ್ತು ಆಡು ಕನ್ನಡ ತರಗತಿಗಳು. ಇಂದೇ ಉಚಿತ ಡೆಮೊ ಬುಕ್ ಮಾಡಿ!'
      : 'Top-rated online Kannada tuition & classes in Bangalore by experienced tutor Suresh Hanje (15+ yrs exp). Expert coaching for CBSE, ICSE, State Board, 1st/2nd PUC, Non-Kannadigas & Competitive Exams. Book a Free Demo!',
    keywords: [
      'online kannada tuition',
      'kannada online tuition',
      'best kannada tutor in bangalore',
      'online kannada classes',
      'kannada tuition near me',
      'spoken kannada classes online',
      'kannada tuition for cbse',
      'kannada tuition for icse',
      'puc kannada tuition',
      'kannada for non kannadigas',
      'private kannada tutor bangalore',
      'learn kannada online',
      'kannada teacher online',
      'suresh hanje kannada tutor',
      'online kannada grammar class',
      'sslc kannada tuition',
    ],
    authors: [{ name: 'Suresh Hanje' }],
    creator: 'Suresh Hanje',
    publisher: 'Suresh Hanje Kannada Academy',
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
      title: isKn
        ? 'ಆನ್‌ಲೈನ್ ಕನ್ನಡ ಟ್ಯೂಷನ್ ಮತ್ತು ಶಿಕ್ಷಕ | ಸುರೇಶ ಹಂಜೆ'
        : 'Best Online Kannada Tuition in Bangalore | Suresh Hanje',
      description: isKn
        ? 'CBSE, ICSE, State ಬೋರ್ಡ್, PUC ಮತ್ತು ಆಡು ಕನ್ನಡಕ್ಕೆ ಅತ್ಯುತ್ತಮ ಆನ್‌ಲೈನ್ ಕನ್ನಡ ತರಗತಿಗಳು.'
        : 'Top-rated online Kannada classes & private tuition in Bangalore for CBSE, ICSE, PUC, Spoken Kannada & Competitive Exams.',
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: 'Suresh Hanje - Best Online Kannada Tutor in Bangalore',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isKn
        ? 'ಆನ್‌ಲೈನ್ ಕನ್ನಡ ಟ್ಯೂಷನ್ | ಸುರೇಶ ಹಂಜೆ'
        : 'Best Online Kannada Tuition in Bangalore | Suresh Hanje',
      description: isKn
        ? 'ಅನುಭವಿ ಶಿಕ್ಷಕರಿಂದ ಕನ್ನಡ ಕಲಿಯಿರಿ. ಉಚಿತ ಡೆಮೊ ಬುಕ್ ಮಾಡಿ.'
        : 'Learn Kannada online with 15+ years experienced master tutor. Book a free demo class today.',
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
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'system';var d=document.documentElement;var r=t==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;if(r==='dark'){d.classList.add('dark');}else{d.classList.remove('dark');}d.style.colorScheme=r;}catch(e){}})();`
          }}
        />
        <Script
          id="educational-organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['EducationalOrganization', 'LocalBusiness', 'EducationalOccupationalProgram'],
              name: 'Suresh Hanje Kannada Tutor & Online Tuition',
              alternateName: [
                'Best Online Kannada Tuition Bangalore',
                'Suresh Hanje Online Kannada Classes',
                'Kannada Tutor for CBSE ICSE PUC',
              ],
              url: siteConfig.url,
              logo: `${siteConfig.url}/icon.svg`,
              image: `${siteConfig.url}/images/og-image.jpg`,
              description:
                'Top-rated Online Kannada Tuition in Bangalore providing one-on-one and group coaching for CBSE, ICSE, State Board, 1st & 2nd PUC, Non-Kannadigas spoken Kannada, and Karnataka competitive exams.',
              telephone: siteConfig.links.phone.replace('tel:', ''),
              email: siteConfig.links.email.replace('mailto:', ''),
              priceRange: '₹₹',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Bangalore',
                addressRegion: 'Karnataka',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 12.9716,
                longitude: 77.5946,
              },
              areaServed: [
                { '@type': 'City', name: 'Bangalore' },
                { '@type': 'State', name: 'Karnataka' },
                { '@type': 'Country', name: 'India' },
                { '@type': 'AdministrativeArea', name: 'Worldwide Online' },
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5.0',
                reviewCount: '40',
                bestRating: '5',
                worstRating: '1',
              },
              knowsAbout: [
                'Kannada Language',
                'Spoken Kannada',
                'CBSE Kannada Syllabus',
                'ICSE Kannada Syllabus',
                'Karnataka State Board Kannada',
                '1st & 2nd PUC Kannada',
                'Hale Kannada Grammar & Literature',
                'KAS, FDA, SDA Competitive Exam Kannada',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: siteConfig.links.phone.replace('tel:', ''),
                contactType: 'admissions and tutoring support',
                availableLanguage: ['en', 'kn', 'hi'],
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
