'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MouseEvent, useEffect } from 'react';

interface LogoProps {
  className?: string;
  priority?: boolean;
}

export default function Logo({ className = 'h-14 lg:h-16', priority = true }: LogoProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    router.prefetch('/');
  }, [router]);

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') return;
    event.preventDefault();
    router.push('/');
  };

  return (
    <Link
      href="/"
      className="group inline-flex shrink-0 items-center text-left"
      aria-label="Hasif home"
      prefetch
      onClick={handleHomeClick}
    >
      <Image
        src="/hasif-logo-cropped.png"
        alt="Hasif"
        width={226}
        height={81}
        priority={priority}
        sizes="(max-width: 640px) 132px, (max-width: 1024px) 168px, 190px"
        className={`w-[132px] object-contain object-left transition-transform duration-300 group-hover:scale-[1.025] sm:w-[168px] lg:w-[190px] ${className}`}
      />
    </Link>
  );
}
