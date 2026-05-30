import type { CSSProperties, ReactNode } from 'react';

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
  if (!children) return null;

  const style: CSSProperties = {
    opacity: 1,
    transitionDelay: `${delay}s`,
    transitionDuration: `${duration}s`,
    transitionTimingFunction: 'ease',
    transitionProperty: 'opacity, transform',
  };

  if (direction === 'none') style.transitionProperty = 'none';

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
