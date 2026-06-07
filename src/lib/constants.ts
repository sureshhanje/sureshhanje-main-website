import { NavItem } from '@/types';

export const siteConfig = {
  name: 'Suresh Hanje - Kannada Tutor',
  nameKn: 'ಸುರೇಶ ಹಂಜೆ - ಕನ್ನಡ ಶಿಕ್ಷಕ',
  description: 'Best Kannada tutor and online Kannada teacher for school, PUC, degree, spoken Kannada, and competitive exam students. Free demo class available.',
  url: 'https://sureshhanje.com',
  ogImage: '/images/og-image.jpg',
  links: {
    whatsapp: 'https://wa.me/919686068162',
    email: 'mailto:sureshhanje96@gmail.com',
    phone: 'tel:+919686068162',
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
  // { labelKey: 'nav.blog', href: '/blog' },
  { labelKey: 'nav.resources', href: '/resources' },
  { labelKey: 'nav.faq', href: '/faq' },
  { labelKey: 'nav.contact', href: '/contact' },
];
