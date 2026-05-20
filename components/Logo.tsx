import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  priority?: boolean;
}

export default function Logo({ className = 'h-14 lg:h-16', priority = true }: LogoProps) {
  return (
    <Link
      href="/"
      className="group inline-flex shrink-0 items-center gap-3 text-left"
      aria-label="Hasif home"
      prefetch
    >
      <span className={`relative block w-10 h-10 shrink-0 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-xl overflow-hidden shadow-lg shadow-[#7c3aed]/10 ring-1 ring-white/[0.08] transition-transform duration-300 group-hover:scale-105 ${className}`}>
        <Image
          src="/hasif-logo-new.png"
          alt="Hasif"
          fill
          priority={priority}
          sizes="48px"
          className="object-cover"
        />
      </span>
      <span className="text-lg font-bold tracking-tight text-white sm:text-xl">
        Hasif <span className="text-[#a78bfa]">Online</span>
      </span>
    </Link>
  );
}
