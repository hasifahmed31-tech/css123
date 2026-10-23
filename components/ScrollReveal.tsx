import type { ReactNode } from 'react';

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
}: Props) {
  if (!children) return null;
  return <div className={className}>{children}</div>;
}
