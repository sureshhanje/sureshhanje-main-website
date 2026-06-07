import { Course } from '@/types';

export const courses: Course[] = [
  {
    id: 'school-1-5', slug: 'kannada-class-1-5', category: 'school-1-5', categoryLabel: 'School (1-5)',
    titleKey: 'courses.school15_title', descriptionKey: 'courses.school15_desc',
    duration: '10 months', level: 'Beginner',
    features: ['Interactive lessons', 'Story-based learning', 'Worksheets', 'Monthly assessments'],
    curriculumKeys: [], outcomesKeys: [], icon: 'BookOpen', popular: true,
  },
  {
    id: 'school-6-8', slug: 'kannada-class-6-8', category: 'school-6-8', categoryLabel: 'School (6-8)',
    titleKey: 'courses.school68_title', descriptionKey: 'courses.school68_desc',
    duration: '10 months', level: 'Intermediate',
    features: ['Grammar mastery', 'Essay writing', 'Poetry analysis', 'Regular tests'],
    curriculumKeys: [], outcomesKeys: [], icon: 'GraduationCap',
  },
  {
    id: 'school-9-10', slug: 'kannada-class-9-10', category: 'school-9-10', categoryLabel: 'School (9-10)',
    titleKey: 'courses.school910_title', descriptionKey: 'courses.school910_desc',
    duration: '10 months', level: 'Intermediate',
    features: ['SSLC syllabus coverage', 'Model papers', 'Mock tests', 'Exam strategies'],
    curriculumKeys: [], outcomesKeys: [], icon: 'Award', popular: true,
  },
  {
    id: 'puc-1', slug: 'puc-1-kannada', category: 'puc-1', categoryLabel: 'PUC-1',
    titleKey: 'courses.puc1_title', descriptionKey: 'courses.puc1_desc',
    duration: '10 months', level: 'Advanced',
    features: ['Textbook analysis', 'Grammar deep-dive', 'Non-detail texts', 'Exam prep'],
    curriculumKeys: [], outcomesKeys: [], icon: 'BookOpen',
  },
  {
    id: 'puc-2', slug: 'puc-2-kannada', category: 'puc-2', categoryLabel: 'PUC-2',
    titleKey: 'courses.puc2_title', descriptionKey: 'courses.puc2_desc',
    duration: '10 months', level: 'Advanced',
    features: ['Complete syllabus', 'Board exam prep', 'Model papers', 'Time management'],
    curriculumKeys: [], outcomesKeys: [], icon: 'GraduationCap', popular: true,
  },
  {
    id: 'degree', slug: 'degree-kannada', category: 'degree', categoryLabel: 'Degree',
    titleKey: 'courses.degree_title', descriptionKey: 'courses.degree_desc',
    duration: '12 months', level: 'Advanced',
    features: ['University syllabus', 'Literature analysis', 'Research methods', 'Academic writing'],
    curriculumKeys: [], outcomesKeys: [], icon: 'Award',
  },
  {
    id: 'spoken-basic', slug: 'spoken-kannada-basic', category: 'spoken', categoryLabel: 'Spoken',
    titleKey: 'courses.spoken_title', descriptionKey: 'courses.spoken_desc',
    duration: '3 months', level: 'Beginner',
    features: ['Daily conversations', 'Practical scenarios', 'Audio practice', 'Cultural context'],
    curriculumKeys: [], outcomesKeys: [], icon: 'MessageCircle', popular: true,
  },
  {
    id: 'spoken-advanced', slug: 'spoken-kannada-advanced', category: 'spoken', categoryLabel: 'Spoken',
    titleKey: 'courses.spokenAdv_title', descriptionKey: 'courses.spokenAdv_desc',
    duration: '3 months', level: 'Advanced',
    features: ['Complex sentences', 'Idioms & proverbs', 'Formal register', 'Debates'],
    curriculumKeys: [], outcomesKeys: [], icon: 'MessageCircle',
  },
  {
    id: 'non-kannadigas', slug: 'kannada-for-non-kannadigas', category: 'non-kannadigas', categoryLabel: 'Non-Kannadigas',
    titleKey: 'courses.nonKannadigas_title', descriptionKey: 'courses.nonKannadigas_desc',
    duration: '4 months', level: 'Beginner',
    features: ['Script learning', '500+ words', 'Practical conversations', 'Cultural etiquette'],
    curriculumKeys: [], outcomesKeys: [], icon: 'Globe',
  },
  {
    id: 'competitive', slug: 'competitive-exam-kannada', category: 'competitive', categoryLabel: 'Competitive',
    titleKey: 'courses.competitive_title', descriptionKey: 'courses.competitive_desc',
    duration: '6 months', level: 'Advanced',
    features: ['KAS/SDA/FDA prep', 'Previous papers', 'Grammar shortcuts', 'Mock tests'],
    curriculumKeys: [], outcomesKeys: [], icon: 'Target', popular: true,
  },
];

export function getCoursesByCategory(category: string): Course[] {
  if (category === 'all') return courses;
  if (category === 'school') return courses.filter(c => c.category.startsWith('school'));
  if (category === 'puc') return courses.filter(c => c.category.startsWith('puc'));
  if (category === 'spoken') return courses.filter(c => c.category === 'spoken' || c.category === 'non-kannadigas');
  return courses.filter(c => c.category === category);
}
