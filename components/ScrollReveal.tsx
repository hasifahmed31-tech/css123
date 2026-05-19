'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

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
  distance = 16,
}: Props) {
  const skipAnimation = direction === 'none' && distance === 0;
  const [visible, setVisible] = useState(skipAnimation);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skipAnimation) {
      setVisible(true);
      return;
    }

    if (typeof window === 'undefined') {
      setVisible(true);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) {
      setVisible(true);
      return;
    }

    if (el.getBoundingClientRect().top < window.innerHeight + 50) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [skipAnimation]);

  if (!children) return null;

  const hidden = !visible && direction !== 'none';

  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transitionDelay: `${delay}s`,
    transitionDuration: `${duration}s`,
    transitionTimingFunction: 'ease',
    transitionProperty: 'opacity, transform',
  };

  if (hidden) {
    switch (direction) {
      case 'up':
        style.transform = `translateY(${distance}px)`;
        break;
      case 'down':
        style.transform = `translateY(-${distance}px)`;
        break;
      case 'left':
        style.transform = `translateX(${distance}px)`;
        break;
      case 'right':
        style.transform = `translateX(-${distance}px)`;
        break;
      case 'scale':
        style.transform = 'scale(0.98)';
        break;
    }
  }

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
