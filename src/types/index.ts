export interface Course {
  id: string;
  slug: string;
  category: 'school-1-5' | 'school-6-8' | 'school-9-10' | 'puc-1' | 'puc-2' | 'degree' | 'spoken' | 'non-kannadigas' | 'competitive';
  categoryLabel: string;
  titleKey: string;
  descriptionKey: string;
  duration: string;
  level: string;
  features: string[];
  curriculumKeys: string[];
  outcomesKeys: string[];
  icon: string;
  popular?: boolean;
  fees: string;
}

export interface Review {
  id: number;
  name: string;
  verified: 'Yes' | 'No badge shown' | '—';
  date: string;
  category: string;
  board: string;
  subject: string;
  rating: number;
  text: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  titleKey: string;
  excerptKey: string;
  contentKey: string;
  category: string;
  categoryKey: string;
  date: string;
  readTime: string;
  author: string;
  tags: string[];
  featured?: boolean;
}

export interface FAQ {
  id: number;
  questionKey: string;
  answerKey: string;
  category: string;
}

export interface Resource {
  id: string;
  titleKey: string;
  descriptionKey: string;
  type: 'notes' | 'pdf' | 'worksheet' | 'sample-paper';
  level: string;
  downloadUrl: string;
  icon: string;
}

export interface NavItem {
  labelKey: string;
  href: string;
  children?: NavItem[];
}
