'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-[#6d28d9] via-[#7c3aed] to-[#0891b2] shadow-[0_0_18px_rgba(124,58,237,0.35)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
