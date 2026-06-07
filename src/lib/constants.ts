import { NavItem } from '@/types';

export const siteConfig = {
  name: 'Suresh Hanje - Kannada Tutor',
  nameKn: 'ಸುರೇಶ ಹಂಜೆ - ಕನ್ನಡ ಶಿಕ್ಷಕ',
  description: 'Learn Kannada with Confidence from an Experienced Teacher. 15+ Years Experience, Online Classes, 1st Standard to Degree.',
  url: 'https://sureshhanje.com',
  ogImage: '/images/og-image.jpg',
  links: {
    whatsapp: 'https://wa.me/91XXXXXXXXXX',
    email: 'mailto:suresh.hanje@example.com',
    phone: 'tel:+91XXXXXXXXXX',
    youtube: 'https://youtube.com/@sureshhanje',
    instagram: 'https://instagram.com/sureshhanje',
    facebook: 'https://facebook.com/sureshhanje',
    twitter: 'https://twitter.com/sureshhanje',
  },
  stats: {
    experience: 15,
    students: 500,
    classes: 1000,
    rating: 4.9,
  },
};

export const navItems: NavItem[] = [
  { labelKey: 'nav.home', href: '/' },
  { labelKey: 'nav.about', href: '/about' },
  {
    labelKey: 'nav.courses',
    href: '/courses',
    children: [
      { labelKey: 'nav.courses_school', href: '/courses?category=school' },
      { labelKey: 'nav.courses_puc', href: '/courses?category=puc' },
      { labelKey: 'nav.courses_degree', href: '/courses?category=degree' },
      { labelKey: 'nav.courses_spoken', href: '/courses?category=spoken' },
      { labelKey: 'nav.courses_competitive', href: '/courses?category=competitive' },
    ],
  },
  { labelKey: 'nav.reviews', href: '/reviews' },
  { labelKey: 'nav.demo', href: '/demo' },
  { labelKey: 'nav.blog', href: '/blog' },
  { labelKey: 'nav.resources', href: '/resources' },
  { labelKey: 'nav.faq', href: '/faq' },
  { labelKey: 'nav.contact', href: '/contact' },
];
