'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Sparkles, Trophy, RotateCcw, Volume2, VolumeX, 
  Check, Play, ArrowRight, HelpCircle, Star, Timer, BookOpen
} from 'lucide-react';
import { GlassCard } from '@/components/shared/glass-card';

// Types
interface VocabItem {
  id: string;
  english: string;
  kannada: string;
  phonetic: string;
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

// Vocab Levels configuration
const LEVELS: Level[] = [
  {
    id: 1,
    titleKey: 'level1',
    colorClass: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-600 dark:text-blue-400',
    vocab: [
      { id: '1-1', english: 'Hello / Greetings', kannada: 'ನಮಸ್ಕಾರ', phonetic: 'Namaskāra' },
      { id: '1-2', english: 'Thank you', kannada: 'ಧನ್ಯವಾದ', phonetic: 'Dhanyavāda' },
      { id: '1-3', english: 'Welcome', kannada: 'ಸುಸ್ವಾಗತ', phonetic: 'Suswāgatha' },
      { id: '1-4', english: 'Goodbye', kannada: 'ಹೋಗಿ ಬರುತ್ತೇನೆ', phonetic: 'Hōgi baruttēne' },
    ]
  },
  {
    id: 2,
    titleKey: 'level2',
    colorClass: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-600 dark:text-amber-400',
    vocab: [
      { id: '2-1', english: 'Water', kannada: 'ನೀರು', phonetic: 'Neeru' },
      { id: '2-2', english: 'Food', kannada: 'ಊಟ', phonetic: 'Oota' },
      { id: '2-3', english: 'House', kannada: 'ಮನೆ', phonetic: 'Mane' },
      { id: '2-4', english: 'Road', kannada: 'ರಸ್ತೆ', phonetic: 'Raste' },
    ]
  },
  {
    id: 3,
    titleKey: 'level3',
    colorClass: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
    vocab: [
      { id: '3-1', english: 'One', kannada: 'ಒಂದು', phonetic: 'Ondu' },
      { id: '3-2', english: 'Two', kannada: 'ಎರಡು', phonetic: 'Eradu' },
      { id: '3-3', english: 'Three', kannada: 'ಮೂರು', phonetic: 'Mooru' },
      { id: '3-4', english: 'Four', kannada: 'ನಾಲ್ಕು', phonetic: 'Nālku' },
    ]
  },
  {
    id: 4,
    titleKey: 'level4',
    colorClass: 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-600 dark:text-pink-400',
    vocab: [
      { id: '4-1', english: 'Where is it?', kannada: 'ಎಲ್ಲಿದೆ?', phonetic: 'Ellide?' },
      { id: '4-2', english: 'How much?', kannada: 'ಎಷ್ಟು?', phonetic: 'Eshtu?' },
      { id: '4-3', english: 'What is it?', kannada: 'ಏನದು?', phonetic: 'Ēnadu?' },
      { id: '4-4', english: 'Come', kannada: 'ಬನ್ನಿ', phonetic: 'Banni' },
    ]
  }
];

export default function GamesPage() {
  const t = useTranslations('games');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  
  // Game States
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'complete'>('idle');
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedCardIds, setMatchedCardIds] = useState<string[]>([]);
  const [turns, setTurns] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [highScores, setHighScores] = useState<Record<number, number>>({});
  
  // Settings
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ttsEnabled, setTtsEnabled] = useState(true);

  // Load High Scores & TTS voices on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kannada_games_high_scores');
      if (saved) {
        try {
          setHighScores(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.getVoices();
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

  // Audio Synthesizer using Web Audio API
  const playSynthSound = (type: 'click' | 'match' | 'mismatch' | 'victory') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
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
    } catch (err) {
      console.error('Audio synthesizer error:', err);
    }
  };

  // Text-To-Speech engine using browser speechSynthesis
  const speakKannadaWord = (text: string) => {
    if (!ttsEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'kn-IN';
      
      const voices = window.speechSynthesis.getVoices();
      const knVoice = voices.find(v => v.lang.startsWith('kn') || v.lang.includes('kannada'));
      if (knVoice) {
        utterance.voice = knVoice;
      }
      utterance.rate = 0.82; // Slightly slower for language learners
      window.speechSynthesis.speak(utterance);
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

  // Start a Vocab Match level
  const initLevel = (levelId: number) => {
    const level = LEVELS.find(l => l.id === levelId);
    if (!level) return;

    // Build card list from vocabulary items
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

    // Shuffle the 8 cards
    const shuffled = [...cardList].sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedCardIds([]);
    setTurns(0);
    setTimeSpent(0);
    setGameState('playing');
    setCurrentLevelId(levelId);
  };

  // Game Board Click Handler
  const handleCardClick = (idx: number) => {
    // Prevent clicking matched or already flipped cards or if 2 cards are currently flipped
    if (
      flippedIndices.includes(idx) || 
      matchedCardIds.includes(cards[idx].id) ||
      flippedIndices.length >= 2
    ) return;

    playSynthSound('click');
    const card = cards[idx];
    
    // Pronounce word when flipping Kannada card
    if (card.type === 'kannada') {
      speakKannadaWord(card.text);
    }

    const nextFlipped = [...flippedIndices, idx];
    setFlippedIndices(nextFlipped);

    // If this is the second card flipped, verify the match
    if (nextFlipped.length === 2) {
      setTurns(prev => prev + 1);
      const firstCard = cards[nextFlipped[0]];
      const secondCard = cards[nextFlipped[1]];

      if (firstCard.matchId === secondCard.matchId && firstCard.type !== secondCard.type) {
        // MATCH FOUND
        setTimeout(() => {
          playSynthSound('match');
          const newlyMatched = [firstCard.id, secondCard.id];
          setMatchedCardIds(prev => {
            const next = [...prev, ...newlyMatched];
            
            // Check if level is fully completed
            if (next.length === cards.length) {
              setGameState('complete');
              playSynthSound('victory');
              setTimeout(startConfettiRain, 150);

              // Update High Score if more efficient (fewer turns) or first try
              setHighScores(prevScores => {
                const currentBest = prevScores[currentLevelId];
                const newTurns = turns + 1; // current turns count plus this final match
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
        // MISMATCH
        setTimeout(() => {
          playSynthSound('mismatch');
          setFlippedIndices([]);
        }, 1200);
      }
    }
  };

  // Star Rating calculator based on flips
  const calculateStars = (flips: number) => {
    if (flips <= 5) return 3;
    if (flips <= 8) return 2;
    return 1;
  };

  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <>
      {/* Confetti Overlay Canvas */}
      <canvas id="confetti-canvas" className="fixed inset-0 pointer-events-none z-50 w-full h-full" />

      {/* PERSPECTIVE CARD FLIPPING INLINE CSS STYLES */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>

      <div className="min-h-screen pt-28 pb-16 relative z-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col justify-between">
        
        {/* HEADER TOOLBAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white/40 dark:bg-[#16112a]/30 border border-gray-200/50 dark:border-white/5 p-4 rounded-3xl backdrop-blur-md">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {tCommon('backToHome')}
          </Link>
          
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400 bg-clip-text text-transparent flex items-center gap-1.5 font-kannada">
            <Sparkles className="h-5 w-5 text-primary-500 animate-pulse" />
            {t('title')}
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

        {/* ACTIVE GAME WINDOW CONTAINER */}
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full">
            <AnimatePresence mode="wait">
              
              {/* IDLE / WELCOME SCREEN */}
              {gameState === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="w-full text-center py-10"
                >
                  <GlassCard className="p-8 sm:p-12 max-w-2xl mx-auto shadow-xl">
                    <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-6">
                      <Trophy className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h2 className="text-3xl font-extrabold mb-4 text-gray-900 dark:text-white">{t('game1_title')}</h2>
                    <p className="text-base text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                      {t('game1_desc')}
                    </p>

                    <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                      {t('select_level')}
                    </h3>
                    
                    <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
                      {LEVELS.map(level => {
                        const best = highScores[level.id];
                        return (
                          <button
                            key={level.id}
                            onClick={() => initLevel(level.id)}
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

              {/* GAMEPLAY SCREEN */}
              {gameState === 'playing' && (
                <motion.div
                  key="playing"
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

                  {/* Level Title banner */}
                  <div className={`p-4 rounded-2xl border text-center bg-gradient-to-r ${LEVELS[currentLevelId - 1].colorClass}`}>
                    <h3 className="font-bold text-base">{t(LEVELS[currentLevelId - 1].titleKey)}</h3>
                  </div>

                  {/* Card Matrix Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto w-full">
                    {cards.map((card, idx) => {
                      const isFlipped = flippedIndices.includes(idx);
                      const isMatched = matchedCardIds.includes(card.id);
                      
                      return (
                        <div 
                          key={card.id} 
                          className="w-full aspect-[4/3] sm:aspect-square relative perspective-1000 cursor-pointer"
                          onClick={() => handleCardClick(idx)}
                        >
                          <div
                            className="w-full h-full transition-transform duration-500 transform-style-3d relative"
                            style={{
                              transform: isFlipped || isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)',
                            }}
                          >
                            {/* Unflipped Face (Front) */}
                            <div className="absolute inset-0 backface-hidden rounded-2xl border border-gray-200/60 dark:border-white/5 bg-white/70 dark:bg-[#16112a]/70 backdrop-blur-md flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:border-primary-400 dark:hover:border-primary-800 transition-all">
                              <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-950/40 flex items-center justify-center mb-1">
                                <HelpCircle className="h-5 w-5 text-primary-500" />
                              </div>
                              <span className="text-[11px] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">ಕನ್ನಡ</span>
                            </div>

                            {/* Flipped Face (Back) */}
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

                  {/* Audio helper notice */}
                  <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-2">
                    {t('pronounce_help')}
                  </p>
                </motion.div>
              )}

              {/* LEVEL COMPLETE VICTORY SCREEN */}
              {gameState === 'complete' && (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full py-6 text-center"
                >
                  <GlassCard className="p-8 sm:p-12 max-w-xl mx-auto shadow-2xl relative overflow-hidden">
                    {/* Background glow */}
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

                    <h2 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">{t('victory')}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                      {t('victory_desc')}
                    </p>

                    {/* Stats display */}
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
                        onClick={() => initLevel(currentLevelId)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 dark:border-[#2a2440] bg-white dark:bg-[#16112a] text-gray-750 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-full font-bold transition-all text-sm"
                      >
                        <RotateCcw className="h-4 w-4" />
                        {t('play_again')}
                      </button>

                      {currentLevelId < LEVELS.length ? (
                        <button
                          onClick={() => initLevel(currentLevelId + 1)}
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

            </AnimatePresence>
          </div>
        </div>

        {/* STUDY BOARD & SOUNDBOARD CHEAT SHEET */}
        {gameState !== 'complete' && (
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
