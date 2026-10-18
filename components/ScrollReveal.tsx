'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';
  duration?: number;
  distance?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.3,
}: Props) {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = revealRef.current;
    if (!element) return;

    if (direction === 'none' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.dataset.reveal = 'visible';
      return;
    }

    if (!('IntersectionObserver' in window)) {
      element.dataset.reveal = 'visible';
      return;
    }

    element.dataset.reveal = 'pending';
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.dataset.reveal = 'visible';
      observer.disconnect();
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, direction]);

  if (!children) return null;

  const offsets = {
    up: 'translate3d(0, 18px, 0)',
    down: 'translate3d(0, -18px, 0)',
    left: 'translate3d(18px, 0, 0)',
    right: 'translate3d(-18px, 0, 0)',
    scale: 'scale(.96)',
    none: 'translate3d(0, 0, 0)',
  };
  const style: CSSProperties = {
    transitionDelay: `${delay}s`,
    transitionDuration: `${duration}s`,
    ['--reveal-offset' as string]: offsets[direction],
  };

  return (
    <div ref={revealRef} className={className} data-reveal="visible" style={style}>
      {children}
    </div>
  );
}
