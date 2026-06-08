'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Sparkles, Trophy, RotateCcw, Volume2, VolumeX, 
  Check, Play, ArrowRight, HelpCircle, Star, Timer, BookOpen,
  Heart, Volume1, RefreshCw
} from 'lucide-react';
import { GlassCard } from '@/components/shared/glass-card';

// Types
interface VocabItem {
  id: string;
  english: string;
  kannada: string;
  phonetic: string;
  syllables?: string[];
  phoneticSyllables?: string[];
  englishTtsPhonetic?: string;
}

interface Level {
  id: number;
  titleKey: string;
  colorClass: string;
  vocab: VocabItem[];
}

interface Card {
  id: string;
  type: 'english' | 'kannada';
  text: string;
  matchId: string;
  phonetic?: string;
}

interface Question {
  correctItem: VocabItem;
  options: string[];
}

interface ScrambledBlock {
  id: string;
  text: string;
}

// Vocab Levels configuration
const LEVELS: Level[] = [
  {
    id: 1,
    titleKey: 'level1',
    colorClass: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-600 dark:text-blue-400',
    vocab: [
      { 
        id: '1-1', 
        english: 'Hello / Greetings', 
        kannada: 'ನಮಸ್ಕಾರ', 
        phonetic: 'Namaskāra',
        syllables: ['ನ', 'ಮ', 'ಸ್ಕಾ', 'ರ'],
        phoneticSyllables: ['Na', 'mas', 'kā', 'ra'],
        englishTtsPhonetic: 'numus-kaara'
      },
      { 
        id: '1-2', 
        english: 'Thank you', 
        kannada: 'ಧನ್ಯವಾದ', 
        phonetic: 'Dhanyavāda',
        syllables: ['ಧ', 'ನ್ಯ', 'ವಾ', 'ದ'],
        phoneticSyllables: ['Dhan', 'ya', 'vā', 'da'],
        englishTtsPhonetic: 'dhunya-vaada'
      },
      { 
        id: '1-3', 
        english: 'Welcome', 
        kannada: 'ಸುಸ್ವಾಗತ', 
        phonetic: 'Suswāgatha',
        syllables: ['ಸು', 'ಸ್ವಾ', 'ಗ', 'ತ'],
        phoneticSyllables: ['Sus', 'wā', 'ga', 'tha'],
        englishTtsPhonetic: 'soos-waagatha'
      },
      { 
        id: '1-4', 
        english: 'Goodbye', 
        kannada: 'ಹೋಗಿ ಬರುತ್ತೇನೆ', 
        phonetic: 'Hōgi baruttēne',
        syllables: ['ಹೋ', 'ಗಿ', 'ಬ', 'ರು', 'ತ್ತೇ', 'ನೆ'],
        phoneticSyllables: ['Hō', 'gi', 'ba', 'rut', 'tē', 'ne'],
        englishTtsPhonetic: 'ho gee barutheynay'
      },
    ]
  },
  {
    id: 2,
    titleKey: 'level2',
    colorClass: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-600 dark:text-amber-400',
    vocab: [
      { 
        id: '2-1', 
        english: 'Water', 
        kannada: 'ನೀರು', 
        phonetic: 'Neeru',
        syllables: ['ನೀ', 'ರು'],
        phoneticSyllables: ['Nee', 'ru'],
        englishTtsPhonetic: 'neeru'
      },
      { 
        id: '2-2', 
        english: 'Food', 
        kannada: 'ಊಟ', 
        phonetic: 'Oota',
        syllables: ['ಊ', 'ಟ'],
        phoneticSyllables: ['Oo', 'ta'],
        englishTtsPhonetic: 'oota'
      },
      { 
        id: '2-3', 
        english: 'House', 
        kannada: 'ಮನೆ', 
        phonetic: 'Mane',
        syllables: ['ಮ', 'ನೆ'],
        phoneticSyllables: ['Ma', 'ne'],
        englishTtsPhonetic: 'mun-ay'
      },
      { 
        id: '2-4', 
        english: 'Road', 
        kannada: 'ರಸ್ತೆ', 
        phonetic: 'Raste',
        syllables: ['ರ', 'ಸ್ತೆ'],
        phoneticSyllables: ['Ras', 'te'],
        englishTtsPhonetic: 'rus-thay'
      },
    ]
  },
  {
    id: 3,
    titleKey: 'level3',
    colorClass: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
    vocab: [
      { 
        id: '3-1', 
        english: 'One', 
        kannada: 'ಒಂದು', 
        phonetic: 'Ondu',
        syllables: ['ಒಂ', 'ದು'],
        phoneticSyllables: ['On', 'du'],
        englishTtsPhonetic: 'ondu'
      },
      { 
        id: '3-2', 
        english: 'Two', 
        kannada: 'ಎರಡು', 
        phonetic: 'Eradu',
        syllables: ['ಎ', 'ರ', 'ಡು'],
        phoneticSyllables: ['E', 'ra', 'du'],
        englishTtsPhonetic: 'yera-du'
      },
      { 
        id: '3-3', 
        english: 'Three', 
        kannada: 'ಮೂರು', 
        phonetic: 'Mooru',
        syllables: ['ಮೂ', 'ರು'],
        phoneticSyllables: ['Moo', 'ru'],
        englishTtsPhonetic: 'mooru'
      },
      { 
        id: '3-4', 
        english: 'Four', 
        kannada: 'ನಾಲ್ಕು', 
        phonetic: 'Nālku',
        syllables: ['ನಾಲ್', 'ಕು'],
        phoneticSyllables: ['Nāl', 'ku'],
        englishTtsPhonetic: 'naalku'
      },
    ]
  },
  {
    id: 4,
    titleKey: 'level4',
    colorClass: 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-600 dark:text-pink-400',
    vocab: [
      { 
        id: '4-1', 
        english: 'Where is it?', 
        kannada: 'ಎಲ್ಲಿದೆ?', 
        phonetic: 'Ellide?',
        syllables: ['ಎಲ್', 'ಲಿ', 'ದೆ'],
        phoneticSyllables: ['El', 'li', 'de'],
        englishTtsPhonetic: 'ellyday'
      },
      { 
        id: '4-2', 
        english: 'How much?', 
        kannada: 'ಎಷ್ಟು?', 
        phonetic: 'Eshtu?',
        syllables: ['ಎಶ್', 'ಟು'],
        phoneticSyllables: ['Esh', 'tu'],
        englishTtsPhonetic: 'esh-too'
      },
      { 
        id: '4-3', 
        english: 'What is it?', 
        kannada: 'ಏನದು?', 
        phonetic: 'Ēnadu?',
        syllables: ['ಏ', 'ನ', 'ದು'],
        phoneticSyllables: ['Ē', 'na', 'du'],
        englishTtsPhonetic: 'ay-nadoo'
      },
      { 
        id: '4-4', 
        english: 'Come', 
        kannada: 'ಬನ್ನಿ', 
        phonetic: 'Banni',
        syllables: ['ಬನ್', 'ನಿ'],
        phoneticSyllables: ['Ban', 'ni'],
        englishTtsPhonetic: 'bun-nee'
      },
    ]
  },
  {
    id: 5,
    titleKey: 'level5',
    colorClass: 'from-purple-500/20 to-violet-500/20 border-purple-500/30 text-purple-600 dark:text-purple-400',
    vocab: [
      { 
        id: '5-1', 
        english: 'Red', 
        kannada: 'ಕೆಂಪು', 
        phonetic: 'Kempu',
        syllables: ['ಕೆಂ', 'ಪು'],
        phoneticSyllables: ['Kem', 'pu'],
        englishTtsPhonetic: 'kem-poo'
      },
      { 
        id: '5-2', 
        english: 'Blue', 
        kannada: 'ನೀಲಿ', 
        phonetic: 'Neeli',
        syllables: ['ನೀ', 'ಲಿ'],
        phoneticSyllables: ['Nee', 'li'],
        englishTtsPhonetic: 'nee-lee'
      },
      { 
        id: '5-3', 
        english: 'Green', 
        kannada: 'ಹಸಿರು', 
        phonetic: 'Hasiru',
        syllables: ['ಹ', 'ಸಿ', 'ರು'],
        phoneticSyllables: ['Ha', 'si', 'ru'],
        englishTtsPhonetic: 'hu-see-roo'
      },
      { 
        id: '5-4', 
        english: 'Yellow', 
        kannada: 'ಹಳದಿ', 
        phonetic: 'Haladi',
        syllables: ['ಹ', 'ಳ', 'ದಿ'],
        phoneticSyllables: ['Ha', 'la', 'di'],
        englishTtsPhonetic: 'hu-luh-dee'
      },
    ]
  },
  {
    id: 6,
    titleKey: 'level6',
    colorClass: 'from-cyan-500/20 to-sky-500/20 border-cyan-500/30 text-cyan-600 dark:text-cyan-400',
    vocab: [
      { 
        id: '6-1', 
        english: 'Father', 
        kannada: 'ಅಪ್ಪ', 
        phonetic: 'Appa',
        syllables: ['ಅಪ್', 'ಪ'],
        phoneticSyllables: ['Ap', 'pa'],
        englishTtsPhonetic: 'up-pah'
      },
      { 
        id: '6-2', 
        english: 'Mother', 
        kannada: 'ಅಮ್ಮ', 
        phonetic: 'Amma',
        syllables: ['ಅಮ್', 'ಮ'],
        phoneticSyllables: ['Am', 'ma'],
        englishTtsPhonetic: 'um-mah'
      },
      { 
        id: '6-3', 
        english: 'Brother', 
        kannada: 'ಅಣ್ಣ', 
        phonetic: 'Anna',
        syllables: ['ಅಣ್', 'ಣ'],
        phoneticSyllables: ['An', 'na'],
        englishTtsPhonetic: 'un-nah'
      },
      { 
        id: '6-4', 
        english: 'Sister', 
        kannada: 'ಅಕ್ಕ', 
        phonetic: 'Akka',
        syllables: ['ಅಕ್', 'ಕ'],
        phoneticSyllables: ['Ak', 'ka'],
        englishTtsPhonetic: 'uk-kah'
      },
    ]
  },
  {
    id: 7,
    titleKey: 'level7',
    colorClass: 'from-lime-500/20 to-green-500/20 border-lime-500/30 text-lime-600 dark:text-lime-400',
    vocab: [
      { 
        id: '7-1', 
        english: 'Eye', 
        kannada: 'ಕಣ್ಣು', 
        phonetic: 'Kannu',
        syllables: ['ಕಣ್', 'ಣು'],
        phoneticSyllables: ['Kan', 'nu'],
        englishTtsPhonetic: 'kun-noo'
      },
      { 
        id: '7-2', 
        english: 'Ear', 
        kannada: 'ಕಿವಿ', 
        phonetic: 'Kivi',
        syllables: ['ಕಿ', 'ವಿ'],
        phoneticSyllables: ['Ki', 'vi'],
        englishTtsPhonetic: 'kee-vee'
      },
      { 
        id: '7-3', 
        english: 'Hand', 
        kannada: 'ಕೈ', 
        phonetic: 'Kai',
        syllables: ['ಕೈ'],
        phoneticSyllables: ['Kai'],
        englishTtsPhonetic: 'kye'
      },
      { 
        id: '7-4', 
        english: 'Head', 
        kannada: 'ತಲೆ', 
        phonetic: 'Tale',
        syllables: ['ತ', 'ಲೆ'],
        phoneticSyllables: ['Ta', 'le'],
        englishTtsPhonetic: 'thuh-lay'
      },
    ]
  },
  {
    id: 8,
    titleKey: 'level8',
    colorClass: 'from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-600 dark:text-orange-400',
    vocab: [
      { 
        id: '8-1', 
        english: 'Cat', 
        kannada: 'ಬೆಕ್ಕು', 
        phonetic: 'Bekku',
        syllables: ['ಬೆಕ್', 'ಕು'],
        phoneticSyllables: ['Bek', 'ku'],
        englishTtsPhonetic: 'bek-koo'
      },
      { 
        id: '8-2', 
        english: 'Dog', 
        kannada: 'ನಾಯಿ', 
        phonetic: 'Nayi',
        syllables: ['ನಾ', 'ಯಿ'],
        phoneticSyllables: ['Nā', 'yi'],
        englishTtsPhonetic: 'naa-yee'
      },
      { 
        id: '8-3', 
        english: 'Cow', 
        kannada: 'ಹಸು', 
        phonetic: 'Hasu',
        syllables: ['ಹ', 'ಸು'],
        phoneticSyllables: ['Ha', 'su'],
        englishTtsPhonetic: 'hu-soo'
      },
      { 
        id: '8-4', 
        english: 'Tiger', 
        kannada: 'ಹುಲಿ', 
        phonetic: 'Huli',
        syllables: ['ಹು', 'ಲಿ'],
        phoneticSyllables: ['Hu', 'li'],
        englishTtsPhonetic: 'hoo-lee'
      },
    ]
  },
  {
    id: 9,
    titleKey: 'level9',
    colorClass: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-600 dark:text-yellow-400',
    vocab: [
      { 
        id: '9-1', 
        english: 'Banana', 
        kannada: 'ಬಾಳೆಹಣ್ಣು', 
        phonetic: 'Balehannu',
        syllables: ['ಬಾ', 'ಳೆ', 'ಹಣ್', 'ಣು'],
        phoneticSyllables: ['Bā', 'le', 'han', 'nu'],
        englishTtsPhonetic: 'baa-lay-hun-noo'
      },
      { 
        id: '9-2', 
        english: 'Mango', 
        kannada: 'ಮಾವಿನಹಣ್ಣು', 
        phonetic: 'Mavinahannu',
        syllables: ['ಮಾ', 'ವಿ', 'ನ', 'ಹಣ್', 'ಣು'],
        phoneticSyllables: ['Mā', 'vi', 'na', 'han', 'nu'],
        englishTtsPhonetic: 'maa-vee-nuh-hun-noo'
      },
      { 
        id: '9-3', 
        english: 'Apple', 
        kannada: 'ಸೇಬು', 
        phonetic: 'Sebu',
        syllables: ['ಸೇ', 'ಬು'],
        phoneticSyllables: ['Sē', 'bu'],
        englishTtsPhonetic: 'say-boo'
      },
      { 
        id: '9-4', 
        english: 'Coconut', 
        kannada: 'ತೆಂಗಿನಕಾಯಿ', 
        phonetic: 'Tenginakai',
        syllables: ['ತೆಂ', 'ಗಿ', 'ನ', 'ಕಾ', 'ಯಿ'],
        phoneticSyllables: ['Ten', 'gi', 'na', 'kā', 'yi'],
        englishTtsPhonetic: 'then-gee-nuh-ka-yee'
      },
    ]
  },
  {
    id: 10,
    titleKey: 'level10',
    colorClass: 'from-teal-500/20 to-emerald-500/20 border-teal-500/30 text-teal-600 dark:text-teal-400',
    vocab: [
      { 
        id: '10-1', 
        english: 'Today', 
        kannada: 'ಇಂದು', 
        phonetic: 'Indu',
        syllables: ['ಇಂ', 'ದು'],
        phoneticSyllables: ['In', 'du'],
        englishTtsPhonetic: 'in-doo'
      },
      { 
        id: '10-2', 
        english: 'Tomorrow', 
        kannada: 'ನಾಳೆ', 
        phonetic: 'Nale',
        syllables: ['ನಾ', 'ಳೆ'],
        phoneticSyllables: ['Nā', 'le'],
        englishTtsPhonetic: 'naa-lay'
      },
      { 
        id: '10-3', 
        english: 'Yesterday', 
        kannada: 'ನಿನ್ನೆ', 
        phonetic: 'Ninne',
        syllables: ['ನಿನ್', 'ನೆ'],
        phoneticSyllables: ['Nin', 'ne'],
        englishTtsPhonetic: 'nin-nay'
      },
      { 
        id: '10-4', 
        english: 'Day', 
        kannada: 'ದಿನ', 
        phonetic: 'Dina',
        syllables: ['ದಿ', 'ನ'],
        phoneticSyllables: ['Di', 'na'],
        englishTtsPhonetic: 'dee-nuh'
      },
    ]
  },
  {
    id: 11,
    titleKey: 'level11',
    colorClass: 'from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/30 text-fuchsia-600 dark:text-fuchsia-400',
    vocab: [
      { 
        id: '11-1', 
        english: 'Rice', 
        kannada: 'ಅನ್ನ', 
        phonetic: 'Anna',
        syllables: ['ಅನ್', 'ನ'],
        phoneticSyllables: ['An', 'na'],
        englishTtsPhonetic: 'un-nah'
      },
      { 
        id: '11-2', 
        english: 'Milk', 
        kannada: 'ಹಾಲು', 
        phonetic: 'Halu',
        syllables: ['ಹಾ', 'ಲು'],
        phoneticSyllables: ['Hā', 'lu'],
        englishTtsPhonetic: 'haa-loo'
      },
      { 
        id: '11-3', 
        english: 'Salt', 
        kannada: 'ಉಪ್ಪು', 
        phonetic: 'Uppu',
        syllables: ['ಉಪ್', 'ಪು'],
        phoneticSyllables: ['Up', 'pu'],
        englishTtsPhonetic: 'oop-poo'
      },
      { 
        id: '11-4', 
        english: 'Ghee', 
        kannada: 'ತುಪ್ಪ', 
        phonetic: 'Tuppa',
        syllables: ['ತುಪ್', 'ಪ'],
        phoneticSyllables: ['Tup', 'pa'],
        englishTtsPhonetic: 'toop-pah'
      },
    ]
  },
  {
    id: 12,
    titleKey: 'level12',
    colorClass: 'from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-600 dark:text-rose-400',
    vocab: [
      { 
        id: '12-1', 
        english: 'Eat', 
        kannada: 'ತಿನ್ನು', 
        phonetic: 'Tinnu',
        syllables: ['ತಿನ್', 'ನು'],
        phoneticSyllables: ['Tin', 'nu'],
        englishTtsPhonetic: 'thin-noo'
      },
      { 
        id: '12-2', 
        english: 'Drink', 
        kannada: 'ಕುಡಿ', 
        phonetic: 'Kudi',
        syllables: ['ಕು', 'ಡಿ'],
        phoneticSyllables: ['Ku', 'di'],
        englishTtsPhonetic: 'koo-dee'
      },
      { 
        id: '12-3', 
        english: 'Sleep', 
        kannada: 'ಮಲಗು', 
        phonetic: 'Malagu',
        syllables: ['ಮ', 'ಲ', 'ಗು'],
        phoneticSyllables: ['Ma', 'la', 'gu'],
        englishTtsPhonetic: 'muh-luh-goo'
      },
      { 
        id: '12-4', 
        english: 'Go', 
        kannada: 'ಹೋಗು', 
        phonetic: 'Hogu',
        syllables: ['ಹೋ', 'ಗು'],
        phoneticSyllables: ['Hō', 'gu'],
        englishTtsPhonetic: 'ho-goo'
      },
    ]
  },
  {
    id: 13,
    titleKey: 'level13',
    colorClass: 'from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-600 dark:text-sky-400',
    vocab: [
      { 
        id: '13-1', 
        english: 'Up', 
        kannada: 'ಮೇಲೆ', 
        phonetic: 'Mele',
        syllables: ['ಮೇ', 'ಲೆ'],
        phoneticSyllables: ['Mē', 'le'],
        englishTtsPhonetic: 'may-lay'
      },
      { 
        id: '13-2', 
        english: 'Down', 
        kannada: 'ಕೆಳಗೆ', 
        phonetic: 'Kelage',
        syllables: ['ಕೆ', 'ಳ', 'ಗೆ'],
        phoneticSyllables: ['Ke', 'la', 'ge'],
        englishTtsPhonetic: 'keh-luh-gay'
      },
      { 
        id: '13-3', 
        english: 'Left', 
        kannada: 'ಎಡ', 
        phonetic: 'Eda',
        syllables: ['ಎ', 'ಡ'],
        phoneticSyllables: ['E', 'da'],
        englishTtsPhonetic: 'ed-uh'
      },
      { 
        id: '13-4', 
        english: 'Right', 
        kannada: 'ಬಲ', 
        phonetic: 'Bala',
        syllables: ['ಬ', 'ಲ'],
        phoneticSyllables: ['Ba', 'la'],
        englishTtsPhonetic: 'buh-luh'
      },
    ]
  },
  {
    id: 14,
    titleKey: 'level14',
    colorClass: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-600 dark:text-indigo-400',
    vocab: [
      { 
        id: '14-1', 
        english: 'Who', 
        kannada: 'ಯಾರು?', 
        phonetic: 'Yaru?',
        syllables: ['ಯಾ', 'ರು'],
        phoneticSyllables: ['Yā', 'ru'],
        englishTtsPhonetic: 'yaa-roo'
      },
      { 
        id: '14-2', 
        english: 'When', 
        kannada: 'ಯಾವಾಗ?', 
        phonetic: 'Yavaga?',
        syllables: ['ಯಾ', 'ವಾ', 'ಗ'],
        phoneticSyllables: ['Yā', 'vā', 'ga'],
        englishTtsPhonetic: 'yaa-waa-guh'
      },
      { 
        id: '14-3', 
        english: 'Why', 
        kannada: 'ಏಕೆ?', 
        phonetic: 'Eke?',
        syllables: ['ಏ', 'ಕೆ'],
        phoneticSyllables: ['Ē', 'ke'],
        englishTtsPhonetic: 'ay-kay'
      },
      { 
        id: '14-4', 
        english: 'How', 
        kannada: 'ಹೇಗೆ?', 
        phonetic: 'Hege?',
        syllables: ['ಹೇ', 'ಗೆ'],
        phoneticSyllables: ['Hē', 'ge'],
        englishTtsPhonetic: 'hay-gay'
      },
    ]
  },
  {
    id: 15,
    titleKey: 'level15',
    colorClass: 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-600 dark:text-green-400',
    vocab: [
      { 
        id: '15-1', 
        english: 'Sun', 
        kannada: 'ಸೂರ್ಯ', 
        phonetic: 'Surya',
        syllables: ['ಸೂ', 'ರ್ಯ'],
        phoneticSyllables: ['Sū', 'rya'],
        englishTtsPhonetic: 'soo-ryuh'
      },
      { 
        id: '15-2', 
        english: 'Moon', 
        kannada: 'ಚಂದ್ರ', 
        phonetic: 'Chandra',
        syllables: ['ಚಂ', 'ದ್ರ'],
        phoneticSyllables: ['Chan', 'dra'],
        englishTtsPhonetic: 'chun-dhruh'
      },
      { 
        id: '15-3', 
        english: 'Flower', 
        kannada: 'ಹೂವು', 
        phonetic: 'Hoovu',
        syllables: ['ಹೂ', 'ವು'],
        phoneticSyllables: ['Hoo', 'vu'],
        englishTtsPhonetic: 'hoo-voo'
      },
      { 
        id: '15-4', 
        english: 'Tree', 
        kannada: 'ಮರ', 
        phonetic: 'Mara',
        syllables: ['ಮ', 'ರ'],
        phoneticSyllables: ['Ma', 'ra'],
        englishTtsPhonetic: 'muh-ruh'
      },
    ]
  }
];;

export default function GamesPage() {
  const t = useTranslations('games');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  
  // Game Selector Mode: 'select' (game menu), 'vocab' (vocab match), 'sound' (sound quest), 'wordbuilder' (word builder), 'speedy' (speedy review)
  const [gameMode, setGameMode] = useState<'select' | 'vocab' | 'sound' | 'wordbuilder' | 'speedy'>('select');

  // Game States (Shared)
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'complete'>('idle');
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [turns, setTurns] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [highScores, setHighScores] = useState<Record<number, number>>({}); // Vocab Match (best turns)
  const [sqHighScores, setSqHighScores] = useState<Record<number, number>>({}); // Sound Quest (best score)
  const [wbHighScores, setWbHighScores] = useState<Record<number, number>>({}); // Word Builder (best score)
  const [speedyHighScores, setSpeedyHighScores] = useState<Record<number, number>>({}); // Speedy Review (best score)

  // Speedy Review specific states
  const [speedyTimeRemaining, setSpeedyTimeRemaining] = useState(45);
  const [speedyScore, setSpeedyScore] = useState(0);
  const [speedyLives, setSpeedyLives] = useState(3);
  const [speedyStreak, setSpeedyStreak] = useState(0);
  const [speedyActiveQuestion, setSpeedyActiveQuestion] = useState<{
    correctItem: VocabItem;
    displayEnglish: string;
    isCorrectMatch: boolean;
  } | null>(null);
  const [speedyAnswered, setSpeedyAnswered] = useState(false);
  const [speedyFeedback, setSpeedyFeedback] = useState<'correct' | 'incorrect' | null>(null);
  
  // Settings (Shared)
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ttsEnabled, setTtsEnabled] = useState(true);

  // Reusable Audio Context and Speech voices
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Vocab Match specific states
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedCardIds, setMatchedCardIds] = useState<string[]>([]);

  // Sound Quest specific states
  const [sqQuestions, setSqQuestions] = useState<Question[]>([]);
  const [sqCurrentIdx, setSqCurrentIdx] = useState(0);
  const [sqLives, setSqLives] = useState(3);
  const [sqStreak, setSqStreak] = useState(0);
  const [sqScore, setSqScore] = useState(0);
  const [sqSelectedOption, setSqSelectedOption] = useState<string | null>(null);
  const [sqAnswered, setSqAnswered] = useState(false);

  // Word Builder specific states
  const [wbCurrentIdx, setWbCurrentIdx] = useState(0);
  const [wbMode, setWbMode] = useState<'script' | 'phonetic'>('script');
  const [wbSelectedBlockIds, setWbSelectedBlockIds] = useState<string[]>([]);
  const [wbScrambledPool, setWbScrambledPool] = useState<ScrambledBlock[]>([]);
  const [wbLives, setWbLives] = useState(3);
  const [wbStreak, setWbStreak] = useState(0);
  const [wbScore, setWbScore] = useState(0);
  const [wbAnswered, setWbAnswered] = useState(false);
  const [wbIsCorrect, setWbIsCorrect] = useState(false);

  // Load High Scores & TTS voices on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMatch = localStorage.getItem('kannada_games_high_scores');
      if (savedMatch) {
        try {
          setHighScores(JSON.parse(savedMatch));
        } catch (e) {
          console.error(e);
        }
      }

      const savedSq = localStorage.getItem('kannada_games_sq_high_scores');
      if (savedSq) {
        try {
          setSqHighScores(JSON.parse(savedSq));
        } catch (e) {
          console.error(e);
        }
      }

      const savedWb = localStorage.getItem('kannada_games_wb_high_scores');
      if (savedWb) {
        try {
          setWbHighScores(JSON.parse(savedWb));
        } catch (e) {
          console.error(e);
        }
      }

      const savedSpeedy = localStorage.getItem('kannada_games_speedy_high_scores');
      if (savedSpeedy) {
        try {
          setSpeedyHighScores(JSON.parse(savedSpeedy));
        } catch (e) {
          console.error(e);
        }
      }

      if (window.speechSynthesis) {
        const updateVoices = () => {
          setVoices(window.speechSynthesis.getVoices());
        };
        updateVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = updateVoices;
        }
      }
    }
  }, []);

  // Timer Effect
  useEffect(() => {
    let timerId: any;
    if (gameState === 'playing') {
      timerId = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [gameState]);

  const speedyScoreRef = useRef(speedyScore);
  speedyScoreRef.current = speedyScore;
  const currentLevelIdRef = useRef(currentLevelId);
  currentLevelIdRef.current = currentLevelId;

  // Speedy Review Countdown Timer Effect
  useEffect(() => {
    let countdownId: any;
    if (gameMode === 'speedy' && gameState === 'playing') {
      countdownId = setInterval(() => {
        setSpeedyTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(countdownId);
            setGameState('complete');
            playSynthSound('victory');
            setTimeout(startConfettiRain, 150);

            // Save high score
            setSpeedyHighScores(prevScores => {
              const score = speedyScoreRef.current;
              const levelId = currentLevelIdRef.current;
              const currentBest = prevScores[levelId] || 0;
              if (score > currentBest) {
                const updated = { ...prevScores, [levelId]: score };
                localStorage.setItem('kannada_games_speedy_high_scores', JSON.stringify(updated));
                return updated;
              }
              return prevScores;
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdownId);
  }, [gameMode, gameState]);

  // Unlock audio helper to run on click events
  const unlockAudio = () => {
    if (typeof window === 'undefined') return;
    try {
      // Warm up Speech Synthesis
      if (window.speechSynthesis) {
        const unlockUtterance = new SpeechSynthesisUtterance('');
        window.speechSynthesis.speak(unlockUtterance);
      }
      // Warm up Audio Context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
      }
    } catch (e) {
      console.error('Audio unlocking error:', e);
    }
  };

  // Audio Synthesizer using Web Audio API
  const playSynthSound = (type: 'click' | 'match' | 'mismatch' | 'victory') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      
      const startSound = () => {
        if (type === 'click') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(450, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.08);
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.08);
        } else if (type === 'match') {
          const now = ctx.currentTime;
          const playBeep = (freq: number, start: number, duration: number) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0.12, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(start);
            osc.stop(start + duration);
          };
          playBeep(523.25, now, 0.08); // C5
          playBeep(659.25, now + 0.07, 0.12); // E5
        } else if (type === 'mismatch') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(160, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.18);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.18);
        } else if (type === 'victory') {
          const now = ctx.currentTime;
          const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5 arpeggio
          notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.1);
            gain.gain.setValueAtTime(0.12, now + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.25);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.25);
          });
        }
      };

      if (ctx.state === 'suspended') {
        ctx.resume().then(startSound);
      } else {
        startSound();
      }
    } catch (err) {
      console.error('Audio synthesizer error:', err);
    }
  };


  // Text-To-Speech engine using browser speechSynthesis
  const speakKannadaWord = (text: string) => {
    if (!ttsEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      let retryCount = 0;
      
      const speak = () => {
        const voiceList = window.speechSynthesis.getVoices();
        
        // If voices list is empty on quick navigation, retry up to 5 times (500ms max) to prevent premature phonetic fallback
        if (voiceList.length === 0 && retryCount < 5) {
          retryCount++;
          setTimeout(speak, 100);
          return;
        }
        
        // Try to find a female/lady Kannada voice first (Microsoft Kalpana, Google, Lekha)
        let knVoice = voiceList.find(v => 
          (v.lang.startsWith('kn') || v.lang.includes('kannada')) && 
          (v.name.toLowerCase().includes('kalpana') || v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('lekha'))
        );
        
        // Fallback to any Kannada voice
        if (!knVoice) {
          knVoice = voiceList.find(v => v.lang.startsWith('kn') || v.lang.includes('kannada'));
        }
        
        let textToSpeak = text;
        let lang = 'kn-IN';
        let targetVoice = knVoice;
        
        if (!knVoice) {
          // Fallback to phonetic spelling if Kannada pack is missing on the client device
          const allVocab = LEVELS.flatMap(l => l.vocab);
          const matchItem = allVocab.find(item => item.kannada === text);
          if (matchItem) {
            // Use custom optimized English fallback pronunciation or normalize the default phonetic string
            textToSpeak = matchItem.englishTtsPhonetic || matchItem.phonetic.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\?/g, "");
            lang = 'en-US';
            
            // Look for a female English voice (e.g. Zira, Hazel, Samantha, Google female, natural)
            const engFemaleVoice = voiceList.find(v => 
              v.lang.startsWith('en') && 
              (v.name.toLowerCase().includes('zira') || 
               v.name.toLowerCase().includes('female') || 
               v.name.toLowerCase().includes('google') || 
               v.name.toLowerCase().includes('samantha') || 
               v.name.toLowerCase().includes('hazel') ||
               v.name.toLowerCase().includes('natural') || 
               v.name.toLowerCase().includes('tessa'))
            );
            if (engFemaleVoice) {
              targetVoice = engFemaleVoice;
            }
          }
        }
        
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = lang;
        if (targetVoice) {
          utterance.voice = targetVoice;
        }
        utterance.rate = 0.68; // Slower rate (0.68) for smooth and clear language learning
        window.speechSynthesis.speak(utterance);
      };

      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        // Give 50ms to allow Chrome to release and clear the speech channel
        setTimeout(speak, 50);
      } else {
        speak();
      }
    } catch (err) {
      console.error('Speech engine error:', err);
    }
  };

  // Canvas Confetti physics simulation
  const startConfettiRain = () => {
    if (typeof window === 'undefined') return;
    const canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];
    const particles: any[] = [];
    
    for (let i = 0; i < 160; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 5 + 4,
        d: Math.random() * canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.05 + 0.02,
        tiltAngle: 0
      });
    }
    
    let animId: number;
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let isActive = false;
      
      particles.forEach((p) => {
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 1.8;
        p.x += Math.sin(p.tiltAngle) * 0.8;
        p.tiltAngle += p.tiltAngleIncremental;
        p.tilt = Math.sin(p.tiltAngle - p.r / 2) * 5;
        
        if (p.y < canvas.height) {
          isActive = true;
        }
        
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();
      });
      
      if (isActive) {
        animId = requestAnimationFrame(drawParticles);
      }
    };
    
    drawParticles();
    return () => cancelAnimationFrame(animId);
  };

  // ==========================================
  // GAME 1: VOCAB MATCH LOGIC
  // ==========================================
  const initVocabMatch = (levelId: number) => {
    unlockAudio();
    const level = LEVELS.find(l => l.id === levelId);
    if (!level) return;

    const cardList: Card[] = [];
    level.vocab.forEach((v) => {
      cardList.push({
        id: `${v.id}_eng`,
        type: 'english',
        text: v.english,
        matchId: v.id
      });
      cardList.push({
        id: `${v.id}_kan`,
        type: 'kannada',
        text: v.kannada,
        matchId: v.id,
        phonetic: v.phonetic
      });
    });

    const shuffled = [...cardList].sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedCardIds([]);
    setTurns(0);
    setTimeSpent(0);
    setGameState('playing');
    setCurrentLevelId(levelId);
  };

  const handleVocabCardClick = (idx: number) => {
    if (
      flippedIndices.includes(idx) || 
      matchedCardIds.includes(cards[idx].id) ||
      flippedIndices.length >= 2
    ) return;

    playSynthSound('click');
    const card = cards[idx];
    
    if (card.type === 'kannada') {
      speakKannadaWord(card.text);
    }

    const nextFlipped = [...flippedIndices, idx];
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      setTurns(prev => prev + 1);
      const firstCard = cards[nextFlipped[0]];
      const secondCard = cards[nextFlipped[1]];

      if (firstCard.matchId === secondCard.matchId && firstCard.type !== secondCard.type) {
        setTimeout(() => {
          playSynthSound('match');
          const newlyMatched = [firstCard.id, secondCard.id];
          setMatchedCardIds(prev => {
            const next = [...prev, ...newlyMatched];
            
            if (next.length === cards.length) {
              setGameState('complete');
              playSynthSound('victory');
              setTimeout(startConfettiRain, 150);

              setHighScores(prevScores => {
                const currentBest = prevScores[currentLevelId];
                const newTurns = turns + 1;
                if (!currentBest || newTurns < currentBest) {
                  const updated = { ...prevScores, [currentLevelId]: newTurns };
                  localStorage.setItem('kannada_games_high_scores', JSON.stringify(updated));
                  return updated;
                }
                return prevScores;
              });
            }
            return next;
          });
          setFlippedIndices([]);
        }, 350);
      } else {
        setTimeout(() => {
          playSynthSound('mismatch');
          setFlippedIndices([]);
        }, 1200);
      }
    }
  };

  // ==========================================
  // GAME 2: SOUND QUEST LOGIC
  // ==========================================
  const initSoundQuest = (levelId: number) => {
    unlockAudio();
    const level = LEVELS.find(l => l.id === levelId);
    if (!level) return;

    const generatedQuestions: Question[] = [];
    // Generate 8 random vocabulary listening questions
    for (let i = 0; i < 8; i++) {
      const correctItem = level.vocab[Math.floor(Math.random() * level.vocab.length)];
      // Shuffled English options (the 4 translations of the level items)
      const options = level.vocab.map(v => v.english).sort(() => Math.random() - 0.5);

      generatedQuestions.push({
        correctItem,
        options
      });
    }

    setSqQuestions(generatedQuestions);
    setSqCurrentIdx(0);
    setSqLives(3);
    setSqStreak(0);
    setSqScore(0);
    setSqSelectedOption(null);
    setSqAnswered(false);
    setTimeSpent(0);
    setGameState('playing');
    setCurrentLevelId(levelId);

    // Speak first audio prompt
    setTimeout(() => {
      speakKannadaWord(generatedQuestions[0].correctItem.kannada);
    }, 400);
  };

  const handleSoundQuestAnswer = (option: string) => {
    if (sqAnswered) return;

    setSqSelectedOption(option);
    setSqAnswered(true);

    const currentCorrect = sqQuestions[sqCurrentIdx].correctItem.english;
    const isCorrect = option === currentCorrect;

    if (isCorrect) {
      playSynthSound('match');
      setSqScore(prev => prev + 10 + (sqStreak >= 2 ? 5 : 0));
      setSqStreak(prev => prev + 1);
    } else {
      playSynthSound('mismatch');
      setSqLives(prev => prev - 1);
      setSqStreak(0);
    }

    // Delay before moving to the next question or ending game
    setTimeout(() => {
      if (sqLives - (isCorrect ? 0 : 1) === 0) {
        // GAME OVER
        setGameState('complete');
        // Synthesizer plays low buzzer
        playSynthSound('mismatch');
      } else if (sqCurrentIdx === 7) {
        // VICTORY (8 questions cleared)
        setGameState('complete');
        playSynthSound('victory');
        setTimeout(startConfettiRain, 150);

        setSqHighScores(prevScores => {
          const currentBest = prevScores[currentLevelId];
          const newScore = sqScore + (isCorrect ? 10 + (sqStreak >= 2 ? 5 : 0) : 0);
          if (!currentBest || newScore > currentBest) {
            const updated = { ...prevScores, [currentLevelId]: newScore };
            localStorage.setItem('kannada_games_sq_high_scores', JSON.stringify(updated));
            return updated;
          }
          return prevScores;
        });
      } else {
        // NEXT QUESTION
        const nextIdx = sqCurrentIdx + 1;
        setSqCurrentIdx(nextIdx);
        setSqSelectedOption(null);
        setSqAnswered(false);
        speakKannadaWord(sqQuestions[nextIdx].correctItem.kannada);
      }
    }, 1600);
  };

  // ==========================================
  // GAME 3: WORD BUILDER LOGIC
  // ==========================================
  const initWordBuilder = (levelId: number) => {
    unlockAudio();
    const level = LEVELS.find(l => l.id === levelId);
    if (!level) return;

    setWbCurrentIdx(0);
    setWbLives(3);
    setWbStreak(0);
    setWbScore(0);
    setWbSelectedBlockIds([]);
    setWbAnswered(false);
    setWbIsCorrect(false);
    setTimeSpent(0);
    setGameState('playing');
    setCurrentLevelId(levelId);

    setupWordBuilderQuestion(level.vocab[0], wbMode);
  };

  const setupWordBuilderQuestion = (vocabItem: VocabItem, mode: 'script' | 'phonetic') => {
    const syllableSource = mode === 'script' 
      ? (vocabItem.syllables || []) 
      : (vocabItem.phoneticSyllables || []);

    // Create unique blocks
    const blocks: ScrambledBlock[] = syllableSource.map((text, idx) => ({
      id: `${vocabItem.id}_${idx}_${mode}`,
      text
    }));

    // Shuffle blocks
    const scrambled = [...blocks].sort(() => Math.random() - 0.5);

    setWbScrambledPool(scrambled);
    setWbSelectedBlockIds([]);
    setWbAnswered(false);
    setWbIsCorrect(false);

    // Speak the word to guide them
    setTimeout(() => {
      speakKannadaWord(vocabItem.kannada);
    }, 450);
  };

  const handleWbBlockClick = (blockId: string) => {
    if (wbAnswered) return;
    playSynthSound('click');
    setWbSelectedBlockIds(prev => [...prev, blockId]);
  };

  const handleWbPlacedBlockClick = (blockId: string) => {
    if (wbAnswered) return;
    playSynthSound('click');
    setWbSelectedBlockIds(prev => prev.filter(id => id !== blockId));
  };

  const checkWordBuilderAnswer = () => {
    if (wbAnswered) return;

    const level = LEVELS.find(l => l.id === currentLevelId);
    if (!level) return;
    const vocabItem = level.vocab[wbCurrentIdx];
    const syllableSource = wbMode === 'script' 
      ? (vocabItem.syllables || []) 
      : (vocabItem.phoneticSyllables || []);

    if (wbSelectedBlockIds.length !== syllableSource.length) return; // Must place all blocks first

    setWbAnswered(true);

    // Map selected IDs back to their index suffix
    const selectedIndices = wbSelectedBlockIds.map(id => {
      const parts = id.split('_');
      return parseInt(parts[parts.length - 2], 10);
    });

    // Verify if it is in perfect ascending order [0, 1, 2, ..., length-1]
    const isCorrect = selectedIndices.every((val, index) => val === index);

    setWbIsCorrect(isCorrect);

    if (isCorrect) {
      playSynthSound('match');
      const newWordScore = 10 + (wbStreak >= 2 ? 5 : 0);
      setWbScore(prev => prev + newWordScore);
      setWbStreak(prev => prev + 1);

      // Speak word again on correct
      speakKannadaWord(vocabItem.kannada);

      // Go to next word after a delay
      setTimeout(() => {
        if (wbCurrentIdx === level.vocab.length - 1) {
          // LEVEL COMPLETE / VICTORY!
          setGameState('complete');
          playSynthSound('victory');
          setTimeout(startConfettiRain, 150);

          setWbHighScores(prevScores => {
            const currentBest = prevScores[currentLevelId];
            const newScore = wbScore + newWordScore;
            if (!currentBest || newScore > currentBest) {
              const updated = { ...prevScores, [currentLevelId]: newScore };
              localStorage.setItem('kannada_games_wb_high_scores', JSON.stringify(updated));
              return updated;
            }
            return prevScores;
          });
        } else {
          const nextIdx = wbCurrentIdx + 1;
          setWbCurrentIdx(nextIdx);
          setupWordBuilderQuestion(level.vocab[nextIdx], wbMode);
        }
      }, 1600);
    } else {
      playSynthSound('mismatch');
      setWbLives(prev => prev - 1);
      setWbStreak(0);

      // Delay before resetting incorrect answer so they can see their mistake
      setTimeout(() => {
        if (wbLives - 1 === 0) {
          // GAME OVER
          setGameState('complete');
          playSynthSound('mismatch');
        } else {
          // Reset only the selected blocks to let them try this word again!
          setWbSelectedBlockIds([]);
          setWbAnswered(false);
          setWbIsCorrect(false);
        }
      }, 1600);
    }
  };

  const handleWbModeToggle = (newMode: 'script' | 'phonetic') => {
    setWbMode(newMode);
    const level = LEVELS.find(l => l.id === currentLevelId);
    if (level) {
      setupWordBuilderQuestion(level.vocab[wbCurrentIdx], newMode);
    }
  };

  // ==========================================
  // GAME 4: SPEEDY REVIEW LOGIC
  // ==========================================
  const initSpeedyReview = (levelId: number) => {
    unlockAudio();
    setSpeedyScore(0);
    setSpeedyLives(3);
    setSpeedyStreak(0);
    setSpeedyTimeRemaining(45);
    setSpeedyAnswered(false);
    setSpeedyFeedback(null);
    setCurrentLevelId(levelId);
    setGameState('playing');
    
    generateSpeedyQuestion(levelId);
  };

  const generateSpeedyQuestion = (levelId: number) => {
    const level = LEVELS.find(l => l.id === levelId);
    if (!level) return;

    // Pick a random target item
    const correctItem = level.vocab[Math.floor(Math.random() * level.vocab.length)];
    const isCorrectMatch = Math.random() < 0.5;
    
    let displayEnglish = correctItem.english;
    if (!isCorrectMatch) {
      // Pick a different English translation from this level
      const otherItems = level.vocab.filter(v => v.id !== correctItem.id);
      displayEnglish = otherItems[Math.floor(Math.random() * otherItems.length)].english;
    }

    setSpeedyActiveQuestion({
      correctItem,
      displayEnglish,
      isCorrectMatch
    });
    setSpeedyAnswered(false);
    setSpeedyFeedback(null);

    // Speak the Kannada word to aid learning
    setTimeout(() => {
      speakKannadaWord(correctItem.kannada);
    }, 50);
  };

  const handleSpeedyAnswer = (userSelectedTrue: boolean) => {
    if (speedyAnswered || !speedyActiveQuestion) return;

    setSpeedyAnswered(true);
    const { isCorrectMatch } = speedyActiveQuestion;
    const isCorrect = userSelectedTrue === isCorrectMatch;

    if (isCorrect) {
      playSynthSound('match');
      setSpeedyFeedback('correct');
      setSpeedyScore(prev => prev + 10 + (speedyStreak >= 2 ? 5 : 0));
      setSpeedyStreak(prev => prev + 1);
    } else {
      playSynthSound('mismatch');
      setSpeedyFeedback('incorrect');
      setSpeedyLives(prev => prev - 1);
      setSpeedyStreak(0);
    }

    // Fast transition delay (280ms) for high-speed review matching!
    setTimeout(() => {
      if (speedyLives - (isCorrect ? 0 : 1) === 0) {
        // Lives run out -> Game Over
        setGameState('complete');
        playSynthSound('mismatch');
        
        // Save score if it's the best
        setSpeedyHighScores(prevScores => {
          const currentBest = prevScores[currentLevelId] || 0;
          const newScore = speedyScore + (isCorrect ? 10 + (speedyStreak >= 2 ? 5 : 0) : 0);
          if (newScore > currentBest) {
            const updated = { ...prevScores, [currentLevelId]: newScore };
            localStorage.setItem('kannada_games_speedy_high_scores', JSON.stringify(updated));
            return updated;
          }
          return prevScores;
        });
      } else {
        generateSpeedyQuestion(currentLevelId);
      }
    }, 280);
  };

  // Shared Helper calculations
  const calculateStars = (flips: number) => {
    if (flips <= 5) return 3;
    if (flips <= 8) return 2;
    return 1;
  };

  const calculateStarsSq = (score: number) => {
    if (score >= 80) return 3;
    if (score >= 60) return 2;
    return 1;
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <>
      <canvas id="confetti-canvas" className="fixed inset-0 pointer-events-none z-50 w-full h-full" />

      {/* Perspective Flip inline classes */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      <div className="min-h-screen pt-28 pb-16 relative z-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col justify-between">
        
        {/* HEADER TOOLBAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white/40 dark:bg-[#16112a]/30 border border-gray-200/50 dark:border-white/5 p-4 rounded-3xl backdrop-blur-md">
          {gameMode === 'select' ? (
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {tCommon('backToHome')}
            </Link>
          ) : (
            <button
              onClick={() => {
                setGameMode('select');
                setGameState('idle');
              }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('select_game') || 'Select Game'}
            </button>
          )}
          
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400 bg-clip-text text-transparent flex items-center gap-1.5 font-kannada">
            <Sparkles className="h-5 w-5 text-primary-500 animate-pulse" />
            {gameMode === 'sound' ? t('sound_quest_title') : (gameMode === 'vocab' ? t('game1_title') : (gameMode === 'wordbuilder' ? t('game3_title') : t('title')))}
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(prev => !prev)}
              className={`p-2 rounded-xl transition-all ${
                soundEnabled 
                  ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400' 
                  : 'bg-gray-100 dark:bg-white/5 text-gray-450 dark:text-gray-500'
              }`}
              title="Toggle Sound Effects"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setTtsEnabled(prev => !prev)}
              className={`p-2 rounded-xl transition-all ${
                ttsEnabled 
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400' 
                  : 'bg-gray-100 dark:bg-white/5 text-gray-450 dark:text-gray-500'
              }`}
              title="Toggle Pronunciation Speech"
            >
              <BookOpen className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ACTIVE CONTENT VIEW */}
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full">
            <AnimatePresence mode="wait">

              {/* GAME SELECTION MENU (SELECT MODE) */}
              {gameMode === 'select' && (
                <motion.div
                  key="select"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="w-full text-center py-6"
                >
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">{t('title')}</h2>
                    <p className="text-base text-gray-500 dark:text-gray-400 mb-10 max-w-lg mx-auto">
                      {t('subtitle')}
                    </p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                      {/* Game 1: Vocab Match */}
                      <GlassCard className="p-6 sm:p-8 hover-lift flex flex-col justify-between h-full border border-primary-200/40 dark:border-[#2a2440]">
                        <div>
                          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                            <BookOpen className="h-6 w-6" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('game1_title')}</h3>
                          <p className="text-sm text-gray-505 dark:text-gray-400 leading-relaxed mb-6">
                            {t('game1_desc')}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            unlockAudio();
                            setGameMode('vocab');
                            setGameState('idle');
                          }}
                          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2"
                        >
                          {t('play_now') || 'Play Now'}
                          <Play className="h-4 w-4 fill-current" />
                        </button>
                      </GlassCard>

                      {/* Game 2: Sound Quest */}
                      <GlassCard className="p-6 sm:p-8 hover-lift flex flex-col justify-between h-full border border-primary-200/40 dark:border-[#2a2440]">
                        <div>
                          <div className="w-12 h-12 rounded-2xl bg-pink-500/10 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 flex items-center justify-center mb-6">
                            <Volume1 className="h-6 w-6" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('sound_quest_title')}</h3>
                          <p className="text-sm text-gray-555 dark:text-gray-400 leading-relaxed mb-6">
                            {t('sound_quest_desc')}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            unlockAudio();
                            setGameMode('sound');
                            setGameState('idle');
                          }}
                          className="w-full py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2"
                        >
                          {t('play_now') || 'Play Now'}
                          <Play className="h-4 w-4 fill-current" />
                        </button>
                      </GlassCard>

                      {/* Game 3: Word Builder */}
                      <GlassCard className="p-6 sm:p-8 hover-lift flex flex-col justify-between h-full border border-primary-200/40 dark:border-[#2a2440]">
                        <div>
                          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
                            <Sparkles className="h-6 w-6" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('game3_title')}</h3>
                          <p className="text-sm text-gray-555 dark:text-gray-400 leading-relaxed mb-6">
                            {t('game3_desc')}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            unlockAudio();
                            setGameMode('wordbuilder');
                            setGameState('idle');
                          }}
                          className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2"
                        >
                          {t('play_now') || 'Play Now'}
                          <Play className="h-4 w-4 fill-current" />
                        </button>
                      </GlassCard>

                      {/* Game 4: Speedy Review */}
                      <GlassCard className="p-6 sm:p-8 hover-lift flex flex-col justify-between h-full border border-primary-200/40 dark:border-[#2a2440]">
                        <div>
                          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                            <Timer className="h-6 w-6" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('game4_title')}</h3>
                          <p className="text-sm text-gray-555 dark:text-gray-400 leading-relaxed mb-6">
                            {t('game4_desc')}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            unlockAudio();
                            setGameMode('speedy');
                            setGameState('idle');
                          }}
                          className="w-full py-3 bg-gradient-to-r from-purple-650 to-indigo-650 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600"
                        >
                          {t('play_now') || 'Play Now'}
                          <Play className="h-4 w-4 fill-current" />
                        </button>
                      </GlassCard>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ======================================= */}
              {/* GAME MODE 1: VOCAB MATCH BOARD          */}
              {/* ======================================= */}
              {gameMode === 'vocab' && gameState === 'idle' && (
                <motion.div
                  key="vocab-idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full text-center py-10"
                >
                  <GlassCard className="p-8 sm:p-12 max-w-4xl mx-auto shadow-xl border border-primary-200/40">
                    <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
                      <Trophy className="h-7 w-7" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">{t('game1_title')}</h2>
                    <p className="text-sm text-gray-505 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                      {t('game1_desc')}
                    </p>

                    <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-555 uppercase tracking-wider mb-4">
                      {t('select_level')}
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                      {LEVELS.map(level => {
                        const best = highScores[level.id];
                        return (
                          <button
                            key={level.id}
                            onClick={() => initVocabMatch(level.id)}
                            className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#16112a] border border-gray-200 dark:border-[#2a2440] hover:border-primary-400 dark:hover:border-primary-850 hover:shadow-md transition-all text-left group"
                          >
                            <div>
                              <div className="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                {t(level.titleKey)}
                              </div>
                              <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                {level.vocab.length} Cards • Match Words
                              </div>
                            </div>
                            {best ? (
                              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30 text-amber-700 dark:text-amber-400 font-bold text-xs">
                                <Check className="h-3 w-3" />
                                {best} {t('turns')}
                              </div>
                            ) : (
                              <div className="p-2 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                                <Play className="h-4 w-4 fill-current" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {gameMode === 'vocab' && gameState === 'playing' && (
                <motion.div
                  key="vocab-playing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col gap-6"
                >
                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-sm px-2 font-semibold text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/50 dark:bg-[#16112a]/30 border border-gray-200/50 dark:border-white/5 shadow-sm">
                      <span className="text-gray-400 font-normal uppercase tracking-wider text-[11px] mr-1">{t('level')}:</span>
                      {currentLevelId}
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <Timer className="h-4 w-4 text-primary-500" />
                        {formatTime(timeSpent)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <RotateCcw className="h-4 w-4 text-primary-500" />
                        {turns} {t('turns')}
                      </span>
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl border text-center bg-gradient-to-r ${LEVELS[currentLevelId - 1].colorClass}`}>
                    <h3 className="font-bold text-base">{t(LEVELS[currentLevelId - 1].titleKey)}</h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto w-full">
                    {cards.map((card, idx) => {
                      const isFlipped = flippedIndices.includes(idx);
                      const isMatched = matchedCardIds.includes(card.id);
                      
                      return (
                        <div 
                          key={card.id} 
                          className="w-full aspect-[4/3] sm:aspect-square relative perspective-1000 cursor-pointer"
                          onClick={() => handleVocabCardClick(idx)}
                        >
                          <div
                            className="w-full h-full transition-transform duration-500 transform-style-3d relative"
                            style={{
                              transform: isFlipped || isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)',
                            }}
                          >
                            {/* Front */}
                            <div className="absolute inset-0 backface-hidden rounded-2xl border border-gray-200/60 dark:border-white/5 bg-white/70 dark:bg-[#16112a]/70 backdrop-blur-md flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:border-primary-400 dark:hover:border-primary-800 transition-all">
                              <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mb-1">
                                <HelpCircle className="h-5 w-5 text-primary-500" />
                              </div>
                              <span className="text-[11px] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">ಕನ್ನಡ</span>
                            </div>

                            {/* Back */}
                            <div
                              className={`absolute inset-0 backface-hidden rounded-2xl flex flex-col items-center justify-center p-4 text-center shadow-inner rotate-y-180 border ${
                                card.type === 'english'
                                  ? 'bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 border-blue-200/60 dark:border-blue-900/30'
                                  : 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200/60 dark:border-amber-900/30'
                              } ${isMatched ? '!border-green-500 dark:!border-green-800 shadow-none' : ''}`}
                            >
                              {card.type === 'english' ? (
                                <>
                                  <span className="text-[9px] text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-wider mb-2">English</span>
                                  <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-tight">{card.text}</p>
                                </>
                              ) : (
                                <>
                                  <span className="text-[9px] text-amber-500 dark:text-amber-400 font-bold uppercase tracking-wider mb-1.5">ಕನ್ನಡ</span>
                                  <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1 font-kannada">{card.text}</p>
                                  <span className="text-xs text-amber-600 dark:text-amber-300 font-medium italic">"{card.phonetic}"</span>
                                </>
                              )}
                              
                              {isMatched && (
                                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                  <Check className="h-3.5 w-3.5 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-2">
                    {t('pronounce_help')}
                  </p>
                </motion.div>
              )}

              {gameMode === 'vocab' && gameState === 'complete' && (
                <motion.div
                  key="vocab-complete"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full py-6 text-center"
                >
                  <GlassCard className="p-8 sm:p-12 max-w-xl mx-auto shadow-2xl relative overflow-hidden border border-primary-200/40">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary-400/20 dark:bg-primary-900/10 rounded-full blur-[80px] -z-10" />

                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
                        >
                          <Star 
                            className={`h-10 w-10 ${
                              i < calculateStars(turns) 
                                ? 'text-amber-400 fill-amber-400 filter drop-shadow-md' 
                                : 'text-gray-300 dark:text-gray-700'
                            }`} 
                          />
                        </motion.div>
                      ))}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">{t('victory')}</h2>
                    <p className="text-sm text-gray-505 dark:text-gray-400 mb-8 max-w-md mx-auto">
                      {t('victory_desc')}
                    </p>

                    <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8 bg-white/50 dark:bg-[#16112a]/30 border border-gray-100 dark:border-white/5 p-4 rounded-2xl">
                      <div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">{t('turns')}</div>
                        <div className="text-xl font-extrabold text-primary-600 dark:text-primary-400 mt-1">{turns}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">{t('time')}</div>
                        <div className="text-xl font-extrabold text-primary-600 dark:text-primary-400 mt-1">{formatTime(timeSpent)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">{t('high_score')}</div>
                        <div className="text-xl font-extrabold text-primary-600 dark:text-primary-400 mt-1">
                          {highScores[currentLevelId] || turns}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                      <button
                        onClick={() => initVocabMatch(currentLevelId)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 dark:border-[#2a2440] bg-white dark:bg-[#16112a] text-gray-750 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-full font-bold transition-all text-sm"
                      >
                        <RotateCcw className="h-4 w-4" />
                        {t('play_again')}
                      </button>

                      {currentLevelId < LEVELS.length ? (
                        <button
                          onClick={() => initVocabMatch(currentLevelId + 1)}
                          className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold shadow-md shadow-primary-600/20 hover:shadow-lg transition-all text-sm"
                        >
                          {t('next_level')}
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setGameState('idle')}
                          className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold shadow-md shadow-primary-600/20 hover:shadow-lg transition-all text-sm"
                        >
                          Levels Board
                          <Trophy className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* ======================================= */}
              {/* GAME MODE 2: SOUND QUEST BOARD          */}
              {/* ======================================= */}
              {gameMode === 'sound' && gameState === 'idle' && (
                <motion.div
                  key="sound-idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full text-center py-10"
                >
                  <GlassCard className="p-8 sm:p-12 max-w-4xl mx-auto shadow-xl border border-primary-200/40">
                    <div className="w-14 h-14 rounded-full bg-pink-50 dark:bg-pink-950/40 flex items-center justify-center mx-auto mb-6 text-pink-600 dark:text-pink-400">
                      <Volume1 className="h-7 w-7" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">{t('sound_quest_title')}</h2>
                    <p className="text-sm text-gray-505 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                      {t('sound_quest_desc')}
                    </p>

                    <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-555 uppercase tracking-wider mb-4">
                      {t('select_level')}
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                      {LEVELS.map(level => {
                        const best = sqHighScores[level.id];
                        return (
                          <button
                            key={level.id}
                            onClick={() => initSoundQuest(level.id)}
                            className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#16112a] border border-gray-200 dark:border-[#2a2440] hover:border-pink-400 dark:hover:border-pink-900 hover:shadow-md transition-all text-left group"
                          >
                            <div>
                              <div className="font-bold text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                                {t(level.titleKey)}
                              </div>
                              <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                8 Questions • Audio Quiz
                              </div>
                            </div>
                            {best ? (
                              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-50 dark:bg-pink-950/30 border border-pink-100 dark:border-pink-900/30 text-pink-700 dark:text-pink-400 font-bold text-xs">
                                <Trophy className="h-3 w-3" />
                                {best} pts
                              </div>
                            ) : (
                              <div className="p-2 rounded-full bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform">
                                <Play className="h-4 w-4 fill-current" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {gameMode === 'sound' && gameState === 'playing' && sqQuestions.length > 0 && (
                <motion.div
                  key="sound-playing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col gap-6 max-w-2xl mx-auto"
                >
                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-sm px-2 font-semibold text-gray-600 dark:text-gray-400 bg-white/30 dark:bg-[#16112a]/30 p-3 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-sm">
                    <span className="text-gray-450 dark:text-gray-500">
                      {t('question') || 'Question'} {sqCurrentIdx + 1}/8
                    </span>
                    
                    {/* Lives representation (Lucide Hearts) */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5" title={`${sqLives} Lives Remaining`}>
                        {[...Array(3)].map((_, i) => (
                          <Heart 
                            key={i} 
                            className={`h-5 w-5 ${
                              i < sqLives 
                                ? 'text-red-500 fill-red-500 filter drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]' 
                                : 'text-gray-300 dark:text-gray-700'
                            }`} 
                          />
                        ))}
                      </div>

                      {sqStreak >= 2 && (
                        <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-bold animate-bounce">
                          🔥 {sqStreak} {t('streak')}
                        </span>
                      )}

                      <span className="font-extrabold text-primary-600 dark:text-primary-400">
                        {t('score')}: {sqScore}
                      </span>
                    </div>
                  </div>

                  {/* Audio Speaker Box */}
                  <GlassCard className="p-8 text-center flex flex-col items-center justify-center border border-pink-200/30 dark:border-pink-950/20 shadow-md">
                    <button
                      onClick={() => speakKannadaWord(sqQuestions[sqCurrentIdx].correctItem.kannada)}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all mb-4 group"
                      title="Replay Audio"
                    >
                      <Volume2 className="h-9 w-9 group-hover:scale-110 transition-transform" />
                    </button>
                    <span className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider mb-1">
                      {t('replay_audio')}
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Listen carefully to the Kannada word spoken above. What is its English meaning?
                    </p>

                    {/* Hint (Phonetic spelling) */}
                    <div className="mt-4 px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/5 text-xs text-gray-450 dark:text-gray-450 italic">
                      Pronunciation hint: "{sqQuestions[sqCurrentIdx].correctItem.phonetic}"
                    </div>
                  </GlassCard>

                  {/* Multiple Choice Grid */}
                  <div className="grid sm:grid-cols-2 gap-3 w-full">
                    {sqQuestions[sqCurrentIdx].options.map((option) => {
                      const isSelected = sqSelectedOption === option;
                      const isCorrect = option === sqQuestions[sqCurrentIdx].correctItem.english;
                      
                      let btnClass = "bg-white dark:bg-[#16112a] border-gray-200 dark:border-[#2a2440] hover:border-pink-300 dark:hover:border-pink-900 hover:shadow-sm";
                      if (sqAnswered) {
                        if (isCorrect) {
                          btnClass = "bg-green-500/10 border-green-500 text-green-700 dark:text-green-400 shadow-sm shadow-green-500/10";
                        } else if (isSelected) {
                          btnClass = "bg-red-500/10 border-red-500 text-red-700 dark:text-red-400 shadow-sm shadow-red-500/10";
                        } else {
                          btnClass = "opacity-60 bg-gray-50 dark:bg-[#16112a]/50 border-gray-250 dark:border-[#2a2440]/50 cursor-not-allowed";
                        }
                      }

                      return (
                        <button
                          key={option}
                          disabled={sqAnswered}
                          onClick={() => handleSoundQuestAnswer(option)}
                          className={`p-4 rounded-2xl border text-left font-bold text-sm sm:text-base transition-all flex items-center justify-between group ${btnClass}`}
                        >
                          <span>{option}</span>
                          
                          {sqAnswered && isCorrect && (
                            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Banner */}
                  <div className="h-10 text-center text-sm font-bold">
                    <AnimatePresence>
                      {sqAnswered && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className={sqSelectedOption === sqQuestions[sqCurrentIdx].correctItem.english ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}
                        >
                          {sqSelectedOption === sqQuestions[sqCurrentIdx].correctItem.english 
                            ? `🎉 ${t('correct') || 'Correct!'}` 
                            : `😢 ${t('incorrect') || 'Incorrect!'} (${sqQuestions[sqCurrentIdx].correctItem.english})`
                          }
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {gameMode === 'sound' && gameState === 'complete' && (
                <motion.div
                  key="sound-complete"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full py-6 text-center"
                >
                  <GlassCard className="p-8 sm:p-12 max-w-xl mx-auto shadow-2xl relative overflow-hidden border border-pink-200/30">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-400/20 dark:bg-pink-900/10 rounded-full blur-[80px] -z-10" />

                    {sqLives === 0 ? (
                      // GAME OVER SCREEN
                      <>
                        <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-950/40 flex items-center justify-center mx-auto mb-6 text-red-500">
                          <Heart className="h-7 w-7" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">
                          {t('game_over') || 'Game Over!'}
                        </h2>
                        <p className="text-sm text-gray-505 dark:text-gray-400 mb-8 max-w-md mx-auto">
                          {t('game_over_desc')}
                        </p>
                      </>
                    ) : (
                      // VICTORY SCREEN
                      <>
                        <div className="flex justify-center gap-1 mb-6">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, rotate: -20 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
                            >
                              <Star 
                                className={`h-10 w-10 ${
                                  i < calculateStarsSq(sqScore) 
                                    ? 'text-amber-400 fill-amber-400 filter drop-shadow-md' 
                                    : 'text-gray-300 dark:text-gray-700'
                                }`} 
                              />
                            </motion.div>
                          ))}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">
                          {t('victory_sound_quest') || 'Victory!'}
                        </h2>
                        <p className="text-sm text-gray-555 dark:text-gray-400 mb-8 max-w-md mx-auto">
                          {t('victory_sound_quest_desc')}
                        </p>
                      </>
                    )}

                    {/* Stats display */}
                    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-8 bg-white/50 dark:bg-[#16112a]/30 border border-gray-100 dark:border-white/5 p-4 rounded-2xl">
                      <div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">{t('score')}</div>
                        <div className="text-xl font-extrabold text-pink-600 dark:text-pink-400 mt-1">{sqScore}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">{t('high_score')}</div>
                        <div className="text-xl font-extrabold text-pink-600 dark:text-pink-400 mt-1">
                          {Math.max(sqHighScores[currentLevelId] || 0, sqScore)}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                      <button
                        onClick={() => initSoundQuest(currentLevelId)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 dark:border-[#2a2440] bg-white dark:bg-[#16112a] text-gray-750 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-full font-bold transition-all text-sm"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Play Again
                      </button>

                      {currentLevelId < LEVELS.length ? (
                        <button
                          onClick={() => initSoundQuest(currentLevelId + 1)}
                          className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full font-bold shadow-md shadow-pink-600/20 hover:shadow-lg transition-all text-sm"
                        >
                          Next Level
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setGameState('idle')}
                          className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full font-bold shadow-md shadow-pink-600/20 hover:shadow-lg transition-all text-sm bg-pink-600"
                        >
                          Back to Levels
                          <Trophy className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* ======================================= */}
              {/* GAME MODE 3: WORD BUILDER BOARD         */}
              {/* ======================================= */}
              {gameMode === 'wordbuilder' && gameState === 'idle' && (
                <motion.div
                  key="wb-idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full text-center py-10"
                >
                  <GlassCard className="p-8 sm:p-12 max-w-4xl mx-auto shadow-xl border border-primary-200/40">
                    <div className="w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center mx-auto mb-6 text-amber-600 dark:text-amber-400">
                      <Sparkles className="h-7 w-7 animate-pulse" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">{t('word_builder_title')}</h2>
                    <p className="text-sm text-gray-505 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                      {t('word_builder_desc')}
                    </p>

                    <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-555 uppercase tracking-wider mb-4">
                      {t('select_level')}
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                      {LEVELS.map(level => {
                        const best = wbHighScores[level.id];
                        return (
                          <button
                            key={level.id}
                            onClick={() => initWordBuilder(level.id)}
                            className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#16112a] border border-gray-200 dark:border-[#2a2440] hover:border-amber-400 dark:hover:border-amber-900 hover:shadow-md transition-all text-left group"
                          >
                            <div>
                              <div className="font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                {t(level.titleKey)}
                              </div>
                              <div className="text-xs text-gray-400 dark:text-gray-550 mt-0.5">
                                {level.vocab.length} Words • Syllable Scramble
                              </div>
                            </div>
                            {best ? (
                              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30 text-amber-700 dark:text-amber-400 font-bold text-xs">
                                <Trophy className="h-3 w-3" />
                                {best} pts
                              </div>
                            ) : (
                              <div className="p-2 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                                <Play className="h-4 w-4 fill-current" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {gameMode === 'wordbuilder' && gameState === 'playing' && (
                <motion.div
                  key="wb-playing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col gap-6 max-w-2xl mx-auto"
                >
                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-sm px-2 font-semibold text-gray-600 dark:text-gray-400 bg-white/30 dark:bg-[#16112a]/30 p-3 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-sm">
                    <span className="text-gray-455 dark:text-gray-500">
                      {t('question') || 'Question'} {wbCurrentIdx + 1}/{LEVELS[currentLevelId - 1].vocab.length}
                    </span>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5" title={`${wbLives} Lives Remaining`}>
                        {[...Array(3)].map((_, i) => (
                          <Heart 
                            key={i} 
                            className={`h-5 w-5 ${
                              i < wbLives 
                                ? 'text-red-500 fill-red-500 filter drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]' 
                                : 'text-gray-300 dark:text-gray-700'
                            }`} 
                          />
                        ))}
                      </div>

                      {wbStreak >= 2 && (
                        <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-bold animate-bounce">
                          🔥 {wbStreak} {t('streak')}
                        </span>
                      )}

                      <span className="font-extrabold text-amber-600 dark:text-amber-450">
                        {t('score')}: {wbScore}
                      </span>
                    </div>
                  </div>

                  {/* Word Cue Card */}
                  <GlassCard className="p-8 text-center flex flex-col items-center justify-center border border-amber-200/30 dark:border-amber-950/20 shadow-md relative overflow-hidden">
                    <div className="absolute top-2 right-2 flex gap-1 bg-gray-150/40 dark:bg-white/5 p-1 rounded-xl">
                      <button
                        onClick={() => handleWbModeToggle('script')}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-all ${
                          wbMode === 'script' 
                            ? 'bg-amber-500 text-white shadow-sm' 
                            : 'text-gray-500 hover:text-gray-800 dark:text-gray-450 dark:hover:text-white'
                        }`}
                      >
                        {t('toggle_script_mode')}
                      </button>
                      <button
                        onClick={() => handleWbModeToggle('phonetic')}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-all ${
                          wbMode === 'phonetic' 
                            ? 'bg-amber-500 text-white shadow-sm' 
                            : 'text-gray-500 hover:text-gray-800 dark:text-gray-450 dark:hover:text-white'
                        }`}
                      >
                        {t('toggle_phonetic_mode')}
                      </button>
                    </div>

                    <h3 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2 mt-4">
                      Translate to Kannada
                    </h3>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
                      "{LEVELS[currentLevelId - 1].vocab[wbCurrentIdx].english}"
                    </h2>

                    <button
                      onClick={() => speakKannadaWord(LEVELS[currentLevelId - 1].vocab[wbCurrentIdx].kannada)}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white flex items-center justify-center shadow-md hover:shadow-lg active:scale-95 transition-all group mb-2"
                      title="Listen to Word"
                    >
                      <Volume2 className="h-7 w-7 group-hover:scale-110 transition-transform" />
                    </button>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                      {t('replay_audio')}
                    </span>
                  </GlassCard>

                  {/* Answer Slots Row */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-gray-450 dark:text-gray-500 px-1 uppercase tracking-wider">
                      Your Assembly (Tap blocks to remove)
                    </span>
                    
                    {/* Shake effect if wrong */}
                    <motion.div 
                      variants={{
                        shake: {
                          x: [0, -10, 10, -10, 10, -10, 10, 0],
                          transition: { duration: 0.5 }
                        }
                      }}
                      animate={wbAnswered && !wbIsCorrect ? "shake" : ""}
                      className="flex flex-wrap items-center justify-center gap-3 p-4 bg-gray-50/50 dark:bg-[#16112a]/20 border border-gray-200/50 dark:border-white/5 rounded-2xl min-h-[82px] w-full"
                    >
                      {/* We render slots for target syllables length */}
                      {(() => {
                        const vocabItem = LEVELS[currentLevelId - 1].vocab[wbCurrentIdx];
                        const syllableSource = wbMode === 'script' 
                          ? (vocabItem.syllables || []) 
                          : (vocabItem.phoneticSyllables || []);

                        return syllableSource.map((_, idx) => {
                          const hasBlock = wbSelectedBlockIds.length > idx;
                          const blockId = hasBlock ? wbSelectedBlockIds[idx] : null;
                          // Find the block details from the pool
                          const block = blockId ? wbScrambledPool.find(b => b.id === blockId) : null;
                          
                          let slotBorderClass = "border-dashed border-gray-300 dark:border-[#2a2440]";
                          let slotBgClass = "bg-transparent";
                          
                          if (wbAnswered) {
                            if (wbIsCorrect) {
                              slotBorderClass = "border-green-500";
                              slotBgClass = "bg-green-500/10 text-green-700 dark:text-green-400";
                            } else {
                              slotBorderClass = "border-red-500";
                              slotBgClass = "bg-red-500/10 text-red-700 dark:text-red-400";
                            }
                          } else if (hasBlock) {
                            slotBorderClass = "border-amber-400 dark:border-amber-800";
                            slotBgClass = "bg-amber-50/70 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 hover:scale-[1.03]";
                          }

                          return (
                            <button
                              key={idx}
                              disabled={!hasBlock || wbAnswered}
                              onClick={() => block && handleWbPlacedBlockClick(block.id)}
                              className={`h-12 min-w-[56px] px-4 rounded-xl border-2 font-bold text-base transition-all flex items-center justify-center ${slotBorderClass} ${slotBgClass}`}
                            >
                              <AnimatePresence mode="wait">
                                {block ? (
                                  <motion.span
                                    key={block.id}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    className="font-kannada font-extrabold"
                                  >
                                    {block.text}
                                  </motion.span>
                                ) : (
                                  <span className="opacity-0">_</span>
                                )}
                              </AnimatePresence>
                            </button>
                          );
                        });
                      })()}
                    </motion.div>
                  </div>

                  {/* Scrambled Syllable Block Pool */}
                  <div className="flex flex-col gap-2 mt-2">
                    <span className="text-xs font-bold text-gray-455 dark:text-gray-550 px-1 uppercase tracking-wider">
                      Syllables Pool (Tap to place)
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-3 p-6 bg-white/40 dark:bg-[#16112a]/30 border border-gray-200/50 dark:border-white/5 rounded-3xl min-h-[92px]">
                      {wbScrambledPool.map((block) => {
                        const isPlaced = wbSelectedBlockIds.includes(block.id);
                        
                        return (
                          <button
                            key={block.id}
                            disabled={isPlaced || wbAnswered}
                            onClick={() => handleWbBlockClick(block.id)}
                            className={`h-12 min-w-[56px] px-4 rounded-xl border border-gray-200 dark:border-[#2a2440] bg-white dark:bg-[#16112a] text-gray-800 dark:text-white font-extrabold text-base shadow-sm hover:shadow hover:border-amber-400 dark:hover:border-amber-900 active:scale-95 transition-all font-kannada flex items-center justify-center ${
                              isPlaced ? 'opacity-0 pointer-events-none' : ''
                            }`}
                          >
                            {block.text}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => {
                        playSynthSound('click');
                        setWbSelectedBlockIds([]);
                      }}
                      disabled={wbSelectedBlockIds.length === 0 || wbAnswered}
                      className="px-5 py-3 border border-gray-200 dark:border-[#2a2440] bg-white dark:bg-[#16112a] text-gray-775 dark:text-gray-300 font-bold rounded-xl text-sm transition-all hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                    >
                      <RotateCcw className="h-4 w-4" />
                      {t('clear')}
                    </button>
                    
                    <button
                      onClick={checkWordBuilderAnswer}
                      disabled={
                        wbSelectedBlockIds.length !== (
                          wbMode === 'script'
                            ? (LEVELS[currentLevelId - 1].vocab[wbCurrentIdx].syllables?.length || 0)
                            : (LEVELS[currentLevelId - 1].vocab[wbCurrentIdx].phoneticSyllables?.length || 0)
                        ) || wbAnswered
                      }
                      className="flex-grow py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl text-sm transition-all hover:from-amber-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-white/5 dark:disabled:to-white/5 disabled:text-gray-450 dark:disabled:text-gray-650 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                    >
                      {t('check_answer')}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Feedback Banner */}
                  <div className="h-8 text-center text-sm font-bold">
                    <AnimatePresence>
                      {wbAnswered && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className={wbIsCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}
                        >
                          {wbIsCorrect 
                            ? `🎉 ${t('correct') || 'Correct!'}` 
                            : `😢 ${t('incorrect') || 'Incorrect!'} (Try again)`
                          }
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {gameMode === 'wordbuilder' && gameState === 'complete' && (
                <motion.div
                  key="wb-complete"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full py-6 text-center"
                >
                  <GlassCard className="p-8 sm:p-12 max-w-xl mx-auto shadow-2xl relative overflow-hidden border border-amber-200/30">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-400/20 dark:bg-amber-900/10 rounded-full blur-[80px] -z-10" />

                    {wbLives === 0 ? (
                      // GAME OVER SCREEN
                      <>
                        <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-950/40 flex items-center justify-center mx-auto mb-6 text-red-500">
                          <Heart className="h-7 w-7" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">
                          {t('game_over') || 'Game Over!'}
                        </h2>
                        <p className="text-sm text-gray-555 dark:text-gray-400 mb-8 max-w-md mx-auto">
                          {t('game_over_desc')}
                        </p>
                      </>
                    ) : (
                      // VICTORY SCREEN
                      <>
                        <div className="flex justify-center gap-1 mb-6">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, rotate: -20 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
                            >
                              <Star 
                                className={`h-10 w-10 ${
                                  i < calculateStarsSq(wbScore) 
                                    ? 'text-amber-400 fill-amber-400 filter drop-shadow-md' 
                                    : 'text-gray-300 dark:text-gray-700'
                                }`} 
                              />
                            </motion.div>
                          ))}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">
                          {t('victory_word_builder')}
                        </h2>
                        <p className="text-sm text-gray-555 dark:text-gray-400 mb-8 max-w-md mx-auto">
                          {t('victory_word_builder_desc')}
                        </p>
                      </>
                    )}

                    {/* Stats display */}
                    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-8 bg-white/50 dark:bg-[#16112a]/30 border border-gray-100 dark:border-white/5 p-4 rounded-2xl">
                      <div>
                        <div className="text-xs text-gray-400 dark:text-gray-550">{t('score')}</div>
                        <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{wbScore}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 dark:text-gray-550">{t('high_score')}</div>
                        <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
                          {Math.max(wbHighScores[currentLevelId] || 0, wbScore)}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                      <button
                        onClick={() => initWordBuilder(currentLevelId)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 dark:border-[#2a2440] bg-white dark:bg-[#16112a] text-gray-750 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-full font-bold transition-all text-sm"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Play Again
                      </button>

                      {currentLevelId < LEVELS.length ? (
                        <button
                          onClick={() => initWordBuilder(currentLevelId + 1)}
                          className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold shadow-md shadow-amber-600/20 hover:shadow-lg transition-all text-sm"
                        >
                          Next Level
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setGameState('idle')}
                          className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold shadow-md shadow-amber-600/20 hover:shadow-lg transition-all text-sm"
                        >
                          Back to Levels
                          <Trophy className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* ======================================= */}
              {/* GAME MODE 4: SPEEDY REVIEW BOARD        */}
              {/* ======================================= */}
              {gameMode === 'speedy' && gameState === 'idle' && (
                <motion.div
                  key="speedy-idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full text-center py-10"
                >
                  <GlassCard className="p-8 sm:p-12 max-w-4xl mx-auto shadow-xl border border-primary-200/40">
                    <div className="w-14 h-14 rounded-full bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
                      <Timer className="h-7 w-7 animate-pulse" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">{t('speedy_review_title')}</h2>
                    <p className="text-sm text-gray-505 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                      {t('speedy_review_desc')}
                    </p>

                    <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-555 uppercase tracking-wider mb-4">
                      {t('select_level')}
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                      {LEVELS.map(level => {
                        const best = speedyHighScores[level.id];
                        return (
                          <button
                            key={level.id}
                            onClick={() => initSpeedyReview(level.id)}
                            className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#16112a] border border-gray-200 dark:border-[#2a2440] hover:border-purple-400 dark:hover:border-purple-900 hover:shadow-md transition-all text-left group"
                          >
                            <div>
                              <div className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {t(level.titleKey)}
                              </div>
                              <div className="text-xs text-gray-400 dark:text-gray-550 mt-0.5">
                                45s Time Rush • True/False
                              </div>
                            </div>
                            {best ? (
                              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/30 text-purple-700 dark:text-purple-400 font-bold text-xs">
                                <Trophy className="h-3 w-3" />
                                {best} pts
                              </div>
                            ) : (
                              <div className="p-2 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                                <Play className="h-4 w-4 fill-current" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {gameMode === 'speedy' && gameState === 'playing' && speedyActiveQuestion && (
                <motion.div
                  key="speedy-playing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col gap-6 max-w-2xl mx-auto relative"
                >
                  {/* Speedy Flash Overlay on Answer */}
                  {speedyAnswered && speedyFeedback && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.12 }}
                      exit={{ opacity: 0 }}
                      className={`absolute inset-0 rounded-3xl pointer-events-none z-30 transition-colors ${
                        speedyFeedback === 'correct' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                  )}

                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-sm px-2 font-semibold text-gray-600 dark:text-gray-400 bg-white/30 dark:bg-[#16112a]/30 p-3 rounded-2xl border border-gray-200/50 dark:border-white/5 shadow-sm">
                    {/* Time Remaining with countdown color coding */}
                    <div className="flex items-center gap-2">
                      <Timer className={`h-5 w-5 ${speedyTimeRemaining <= 10 ? 'text-red-500 animate-pulse' : 'text-purple-500'}`} />
                      <span className={`font-extrabold ${speedyTimeRemaining <= 10 ? 'text-red-500 font-black' : 'text-gray-800 dark:text-gray-200'}`}>
                        {t('time_left') || 'Time Left'}: {speedyTimeRemaining}s
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Hearts for Lives */}
                      <div className="flex items-center gap-1" title={`${speedyLives} Lives Remaining`}>
                        {[...Array(3)].map((_, i) => (
                          <Heart 
                            key={i} 
                            className={`h-5 w-5 ${
                              i < speedyLives 
                                ? 'text-red-500 fill-red-500 filter drop-shadow-[0_0_4px_rgba(239,68,68,0.4)]' 
                                : 'text-gray-300 dark:text-gray-700'
                            }`} 
                          />
                        ))}
                      </div>

                      {speedyStreak >= 2 && (
                        <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-bold animate-bounce">
                          🔥 {speedyStreak}
                        </span>
                      )}

                      <span className="font-extrabold text-purple-600 dark:text-purple-450">
                        {t('score') || 'Score'}: {speedyScore}
                      </span>
                    </div>
                  </div>

                  {/* Countdown Progress Bar */}
                  <div className="w-full h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${speedyTimeRemaining <= 10 ? 'bg-red-500' : 'bg-gradient-to-r from-purple-500 to-indigo-500'}`}
                      initial={{ width: '100%' }}
                      animate={{ width: `${(speedyTimeRemaining / 45) * 100}%` }}
                      transition={{ duration: 1, ease: 'linear' }}
                    />
                  </div>

                  {/* Speedy True/False Card */}
                  <GlassCard className="p-8 text-center flex flex-col items-center justify-center border border-purple-200/30 dark:border-purple-950/20 shadow-md relative overflow-hidden">
                    <h3 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
                      Vocabulary Speedy Run
                    </h3>

                    {/* Spoken word display */}
                    <div className="mb-4 flex flex-col items-center gap-2">
                      <span className="text-[10px] text-gray-400 dark:text-gray-550 uppercase tracking-wide">Spoken Kannada Word</span>
                      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white font-kannada">
                        {speedyActiveQuestion.correctItem.kannada}
                      </h2>
                      <span className="text-xs text-purple-650 dark:text-purple-300 font-medium italic">
                        "{speedyActiveQuestion.correctItem.phonetic}"
                      </span>
                    </div>

                    <div className="w-full border-t border-gray-100 dark:border-white/5 my-4 pt-4 flex flex-col items-center gap-2">
                      <span className="text-[10px] text-gray-400 dark:text-gray-555 uppercase tracking-wide">English Translation Match?</span>
                      <h2 className="text-3xl font-extrabold text-primary-600 dark:text-primary-400">
                        "{speedyActiveQuestion.displayEnglish}"
                      </h2>
                    </div>

                    <button
                      onClick={() => speakKannadaWord(speedyActiveQuestion.correctItem.kannada)}
                      className="mt-2 p-2.5 rounded-full bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 hover:scale-105 active:scale-95 transition-all"
                      title="Replay Pronunciation"
                    >
                      <Volume2 className="h-5 w-5" />
                    </button>
                  </GlassCard>

                  {/* Speedy Judgement Buttons: True/False */}
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {/* False (Cross) Button */}
                    <button
                      disabled={speedyAnswered}
                      onClick={() => handleSpeedyAnswer(false)}
                      className={`py-5 rounded-2xl font-extrabold text-lg transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                        speedyAnswered
                          ? 'opacity-40 cursor-not-allowed bg-gray-100 border border-gray-250 dark:bg-white/5 dark:border-white/5'
                          : 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/10'
                      }`}
                    >
                      {t('false_btn') || 'False'}
                    </button>

                    {/* True (Tick) Button */}
                    <button
                      disabled={speedyAnswered}
                      onClick={() => handleSpeedyAnswer(true)}
                      className={`py-5 rounded-2xl font-extrabold text-lg transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                        speedyAnswered
                          ? 'opacity-40 cursor-not-allowed bg-gray-100 border border-gray-250 dark:bg-white/5 dark:border-white/5'
                          : 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/10'
                      }`}
                    >
                      {t('true_btn') || 'True'}
                    </button>
                  </div>

                  <p className="text-xs text-center text-gray-400 dark:text-gray-500 italic">
                    Tap Correct/Incorrect immediately! Quick decisions score high multipliers.
                  </p>
                </motion.div>
              )}

              {gameMode === 'speedy' && gameState === 'complete' && (
                <motion.div
                  key="speedy-complete"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full py-6 text-center"
                >
                  <GlassCard className="p-8 sm:p-12 max-w-xl mx-auto shadow-2xl relative overflow-hidden border border-purple-250/30">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-400/20 dark:bg-purple-900/10 rounded-full blur-[80px] -z-10" />

                    {speedyLives === 0 ? (
                      // GAME OVER SCREEN
                      <>
                        <div className="w-14 h-14 rounded-full bg-red-50 dark:bg-red-950/40 flex items-center justify-center mx-auto mb-6 text-red-500">
                          <Heart className="h-7 w-7" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">
                          {t('game_over') || 'Game Over!'}
                        </h2>
                        <p className="text-sm text-gray-505 dark:text-gray-400 mb-8 max-w-md mx-auto">
                          You ran out of lives. Move faster and think twice next time!
                        </p>
                      </>
                    ) : (
                      // TIME UP (VICTORY) SCREEN
                      <>
                        <div className="flex justify-center gap-1 mb-6">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, rotate: -20 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
                            >
                              <Star 
                                className={`h-10 w-10 ${
                                  i < calculateStarsSq(speedyScore) 
                                    ? 'text-amber-400 fill-amber-400 filter drop-shadow-md' 
                                    : 'text-gray-300 dark:text-gray-700'
                                }`} 
                              />
                            </motion.div>
                          ))}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">
                          {t('victory_speedy_review') || 'Time Up!'}
                        </h2>
                        <p className="text-sm text-gray-555 dark:text-gray-400 mb-8 max-w-md mx-auto">
                          {t('victory_speedy_review_desc')}
                        </p>
                      </>
                    )}

                    {/* Stats display */}
                    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-8 bg-white/50 dark:bg-[#16112a]/30 border border-gray-100 dark:border-white/5 p-4 rounded-2xl">
                      <div>
                        <div className="text-xs text-gray-400 dark:text-gray-555">{t('score')}</div>
                        <div className="text-xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">{speedyScore}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 dark:text-gray-555">{t('high_score')}</div>
                        <div className="text-xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">
                          {Math.max(speedyHighScores[currentLevelId] || 0, speedyScore)}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                      <button
                        onClick={() => initSpeedyReview(currentLevelId)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 dark:border-[#2a2440] bg-white dark:bg-[#16112a] text-gray-750 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-full font-bold transition-all text-sm"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Play Again
                      </button>

                      {currentLevelId < LEVELS.length ? (
                        <button
                          onClick={() => initSpeedyReview(currentLevelId + 1)}
                          className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold shadow-md shadow-purple-600/20 hover:shadow-lg transition-all text-sm bg-purple-600"
                        >
                          Next Level
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setGameState('idle')}
                          className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold shadow-md shadow-purple-600/20 hover:shadow-lg transition-all text-sm"
                        >
                          Back to Levels
                          <Trophy className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* CHEAT SHEET REFERENCE TABLE */}
        {gameMode !== 'select' && gameState !== 'complete' && (
          <div className="mt-12 bg-white/40 dark:bg-[#16112a]/30 border border-gray-200/50 dark:border-white/5 p-6 rounded-3xl backdrop-blur-md max-w-4xl mx-auto w-full">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BookOpen className="h-4.5 w-4.5 text-primary-500" />
              Study Soundboard (ಕನ್ನಡ ಶಬ್ದಕೋಶ)
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              Review vocabulary items for the current level. Click any card to hear its clear native Kannada audio pronunciation!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {LEVELS[currentLevelId - 1].vocab.map((item) => (
                <button
                  key={item.id}
                  onClick={() => speakKannadaWord(item.kannada)}
                  className="flex flex-col p-4 text-left rounded-2xl bg-white/50 dark:bg-[#16112a]/40 border border-gray-200 dark:border-[#2a2440] hover:border-indigo-400 dark:hover:border-indigo-900 hover:shadow-sm transition-all group relative"
                >
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide">English</span>
                  <div className="font-semibold text-xs text-gray-800 dark:text-gray-200 mt-0.5 line-clamp-1">{item.english}</div>
                  
                  <div className="border-t border-gray-100 dark:border-[#2a2440] my-2 pt-2 flex items-baseline gap-2">
                    <span className="font-bold text-base text-primary-600 dark:text-primary-400 font-kannada">{item.kannada}</span>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium italic">"{item.phonetic}"</span>
                  </div>

                  <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-primary-50 dark:bg-primary-950/30 text-primary-500 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Volume2 className="h-3 w-3" />
                  </div>
                </button>
              ))}
            </div>

            {gameState === 'playing' && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setGameState('idle')}
                  className="text-xs font-semibold text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                >
                  Quit Current Game & Back to Levels Selection
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </>
  );
}
