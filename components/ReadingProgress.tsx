'use client';

import { useEffect, useRef } from 'react';

export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    let maxScroll = 0;

    const measurePage = () => {
      maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      updateProgress();
    };

    const updateProgress = () => {
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      barRef.current?.style.setProperty('--reading-progress', String(progress));
      ticking = false;
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateProgress);
    };

    measurePage();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', measurePage);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', measurePage);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-[#5b35b8] via-[#7955e8] to-[#0891b2] shadow-[0_0_18px_rgba(124,58,237,0.35)]"
        style={{ transform: 'scaleX(var(--reading-progress, 0))' }}
      />
    </div>
  );
}
