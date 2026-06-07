'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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

  const pathname = usePathname();
  // Check if we are on the homepage (locale-agnostic checks)
  const isHomepage = pathname === '/' || pathname === '/en' || pathname === '/kn';

  // Framer Motion Scroll Tracking
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });

  // Calculate coordinates (X, Y) along the path d="M 80 0 L 80 450 L 40 550 L 40 1000"
  // Segment lengths: 450 (vertical), 107.7 (diagonal), 450 (vertical). Total = 1007.7
  const headX = useTransform(smoothScroll, (p) => {
    const total = 1007.7;
    const d = p * total;
    if (d <= 450) return 80;
    if (d <= 557.7) {
      const t = (d - 450) / 107.7;
      return 80 - t * 40;
    }
    return 40;
  });

  const headY = useTransform(smoothScroll, (p) => {
    const total = 1007.7;
    const d = p * total;
    if (d <= 450) return d;
    if (d <= 557.7) {
      const t = (d - 450) / 107.7;
      return 450 + t * 100;
    }
    return 550 + (d - 557.7);
  });

  // dashoffset animate from 140 (hidden/at top) to 140 - 1007.7 (at bottom)
  const dashOffset = useTransform(smoothScroll, [0, 1], [140, 140 - 1007.7]);

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

      {/* Scroll-driven line on the left side - ONLY on homepage */}
      {isHomepage && (
        <svg
          className="fixed top-0 left-4 md:left-8 h-screen w-24 pointer-events-none z-10"
          viewBox="0 0 120 1000"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="scroll-tail-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />      {/* Blue fade at back */}
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />    {/* Faint blue */}
              <stop offset="85%" stopColor="#8b5cf6" stopOpacity="0.6" />    {/* Purple */}
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.9" />   {/* Pink near head */}
            </linearGradient>
            <linearGradient id="head-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>

          {/* Faint guide track of the path */}
          <path
            d="M 80 0 L 80 450 L 40 550 L 40 1000"
            fill="none"
            className="stroke-primary-500/10 dark:stroke-primary-500/5"
            strokeWidth="1"
          />

          {/* Glowing Tail Line Segment traveling on the grid line itself (very thin 1.5px) */}
          <motion.path
            d="M 80 0 L 80 450 L 40 550 L 40 1000"
            fill="none"
            stroke="url(#scroll-tail-grad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: '140 1100',
              strokeDashoffset: dashOffset
            }}
          />

          {/* Glowing Head Point - water drop shape, small, with blue-purple-pink glow */}
          <motion.g style={{ x: headX, y: headY }}>
            {/* Neon Glow Circles */}
            <circle r="7" fill="#3b82f6" opacity="0.2" className="blur-[1.5px]" />
            <circle r="4" fill="#8b5cf6" opacity="0.4" className="blur-[1px]" />
            
            {/* Water-drop shape pointing backwards (top-left) */}
            <path
              d="M 0,-3 C 1.5,-3 2.5,-2 2.5,-0.5 C 2.5,1 1,2.5 0,4 C -1,2.5 -2.5,1 -2.5,-0.5 C -2.5,-2 -1.5,-3 0,-3 Z"
              fill="url(#head-grad)"
              transform="rotate(-45)"
            />
          </motion.g>
        </svg>
      )}

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
