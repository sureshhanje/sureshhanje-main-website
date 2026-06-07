'use client';

export function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary-100/30 dark:bg-primary-950/20 rounded-full blur-[100px]" />
    </div>
  );
}
