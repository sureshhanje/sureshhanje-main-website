'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div className={cn('glass-card rounded-2xl p-6', hover && 'hover-lift', className)}>
      {children}
    </div>
  );
}
