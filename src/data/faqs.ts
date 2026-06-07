import { FAQ } from '@/types';

export const faqs: FAQ[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  questionKey: `faq.q${i + 1}`,
  answerKey: `faq.a${i + 1}`,
  category: ['general', 'general', 'courses', 'courses', 'fees', 'general', 'general', 'general', 'general', 'general', 'courses', 'general', 'general', 'general', 'fees', 'general', 'general', 'general', 'fees', 'fees', 'general', 'technical', 'general', 'fees', 'general'][i],
}));
