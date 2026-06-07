'use client';

import { motion } from 'framer-motion';

export function PlayfulBackground() {
  const shapes = [
    { text: 'ಕ', top: '12%', left: '6%', delay: 0, size: 'text-3xl sm:text-4xl', color: 'text-primary-500/10 dark:text-primary-400/5' },
    { text: 'ಖ', top: '78%', left: '4%', delay: 2, size: 'text-2xl sm:text-3xl', color: 'text-accent-500/10 dark:text-accent-400/5' },
    { text: 'ಗ', top: '22%', left: '90%', delay: 1, size: 'text-4xl sm:text-5xl', color: 'text-primary-500/12 dark:text-primary-400/6' },
    { text: 'ಘ', top: '65%', left: '88%', delay: 3, size: 'text-3xl sm:text-4xl', color: 'text-accent-500/10 dark:text-accent-400/5' },
    { text: '★', top: '42%', left: '10%', delay: 4, size: 'text-lg sm:text-xl', color: 'text-amber-500/15 dark:text-amber-400/8' },
    { text: '✦', top: '15%', left: '76%', delay: 0.5, size: 'text-2xl sm:text-3xl', color: 'text-amber-500/15 dark:text-amber-400/8' },
    { text: '✿', top: '82%', left: '78%', delay: 2.5, size: 'text-2xl sm:text-3xl', color: 'text-pink-500/10 dark:text-pink-400/5' },
    { text: 'ಚ', top: '48%', left: '92%', delay: 1.5, size: 'text-2xl sm:text-3xl', color: 'text-primary-500/10 dark:text-primary-400/5' },
    { text: 'ಜ', top: '72%', left: '14%', delay: 3.5, size: 'text-3xl sm:text-4xl', color: 'text-accent-500/10 dark:text-accent-400/5' },
    { text: 'ಟ', top: '8%', left: '40%', delay: 5, size: 'text-xl sm:text-2xl', color: 'text-primary-500/10 dark:text-primary-400/5' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Small thin grid in background that fades off at all edges */}
      <div
        className="absolute inset-0 opacity-50 dark:opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139, 92, 246, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(circle at center, black 30%, rgba(0, 0, 0, 0.5) 65%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, rgba(0, 0, 0, 0.5) 65%, transparent 90%)',
        }}
      />

      {/* Floating playful elements */}
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute font-bold select-none leading-none ${shape.size} ${shape.color}`}
          style={{ top: shape.top, left: shape.left }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, i % 2 === 0 ? 12 : -12, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 7 + (i % 3) * 2,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'easeInOut',
          }}
        >
          {shape.text}
        </motion.div>
      ))}
    </div>
  );
}
