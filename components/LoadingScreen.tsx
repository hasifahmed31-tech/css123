'use client';

import { useEffect, useRef } from 'react';

export default function LoadingScreen() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem('hasif-loaded') === '1') {
      if (ref.current) ref.current.style.display = 'none';
      return;
    }

    document.body.style.overflow = 'hidden';

    if (ref.current) {
      ref.current.style.opacity = '1';
    }

    const fade = window.setTimeout(() => {
      if (ref.current) {
        ref.current.style.opacity = '0';
        ref.current.style.pointerEvents = 'none';
      }
    }, 200);

    const remove = window.setTimeout(() => {
      if (ref.current) {
        ref.current.style.display = 'none';
      }
      document.body.style.overflow = '';
      try { sessionStorage.setItem('hasif-loaded', '1'); } catch { /* ignore */ }
    }, 350);

    return () => {
      window.clearTimeout(fade);
      window.clearTimeout(remove);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      ref={ref}
      className="loading-screen"
      style={{ opacity: 0 }}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="loading-bg" />

      <div className="loading-orbit-container">
        <div className="loading-orbit loading-orbit-1" />
        <div className="loading-orbit loading-orbit-2" />

        <div className="loading-logo-premium">
          <div className="loading-logo-inner" />
        </div>
      </div>

      <div className="loading-bar-container">
        <div className="loading-bar-premium" />
      </div>

      <div className="loading-text">
        Hasif
        <span className="loading-dots">
          <span>.</span><span>.</span><span>.</span>
        </span>
      </div>
    </div>
  );
}
