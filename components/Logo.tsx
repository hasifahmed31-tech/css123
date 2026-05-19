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
      className="group inline-flex shrink-0 items-center text-left"
      aria-label="Hasif home"
      prefetch
    >
      <span className={`relative block w-[174px] shrink-0 sm:w-[196px] lg:w-[226px] ${className}`}>
        <Image
          src="/hasif-logo-cropped.png"
          alt="Hasif"
          fill
          priority={priority}
          sizes="(max-width: 640px) 174px, (max-width: 1024px) 196px, 226px"
          className="object-contain object-left transition-transform duration-300 group-hover:scale-[1.025]"
        />
      </span>
    </Link>
  );
}
