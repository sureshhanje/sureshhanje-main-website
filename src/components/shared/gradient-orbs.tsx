'use client';

export function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-accent-400/15 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-2/3 right-1/3 w-64 h-64 bg-primary-300/10 rounded-full blur-3xl animate-float" />
    </div>
  );
}
