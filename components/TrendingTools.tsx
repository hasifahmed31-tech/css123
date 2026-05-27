import { ExternalLink, Sparkles, Star } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import type { ReactNode } from 'react';

function ChatGPTIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  );
}

function MidjourneyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M1.6 1.6v20.8h20.8V1.6zm3.12 3.12H12v5.2H7.92v2.08H12v3.12H7.92V20H4.72zm7.28 0h4.16c2.88 0 4.16 1.28 4.16 3.64 0 1.92-1.04 3.08-2.8 3.44l3.12 5.04h-3.52l-2.8-4.72h-.32v4.72H12z" />
    </svg>
  );
}

function NotionIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.25 2.21c-.42-.326-.98-.7-2.055-.607L3.46 2.697c-.466.046-.56.28-.373.466zM5.252 7.348v13.71c0 .746.373 1.027 1.213.98l14.523-.84c.84-.046.933-.56.933-1.167V6.462c0-.606-.233-.933-.746-.886l-15.177.886c-.56.047-.746.327-.746.886zm14.337.42c.093.42 0 .84-.42.886l-.7.14v10.13c-.606.327-1.166.514-1.633.514-.746 0-.933-.234-1.493-.933l-4.573-7.178v6.94l1.447.326s0 .84-1.166.84l-3.22.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.706 9.76c-.093-.42.14-1.026.793-1.073l3.453-.233 4.76 7.272v-6.43l-1.213-.14c-.093-.513.28-.886.746-.933zM2.934 1.7l13.82-1.027c1.68-.14 2.1.327 2.8.84l3.86 2.707c.467.326.607.747.607 1.26v17.71c0 1.073-.373 1.7-1.727 1.793L6.465 23.15c-1.007.047-1.493-.093-2.007-.746l-3.173-4.107c-.56-.746-.793-1.306-.793-1.96V3.42c0-.84.373-1.586 1.44-1.72z" />
    </svg>
  );
}

function SemrushIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 16.8h-3.6v-4.08h-1.2v4.08h-1.536v-4.08H9.6v4.08H7.2V7.2h2.4v4.08h1.632V7.2h1.536v4.08h1.2V7.2h2.4c.96 0 1.2.48 1.2 1.2v7.2c0 .72-.24 1.2-1.2 1.2z" />
    </svg>
  );
}

function JasperIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2L2 7v10l10 5 10-5V7zm0 2.18L19.09 7.5 12 10.82 4.91 7.5zM4 8.83l7 3.5v7.84l-7-3.5zm9 11.34v-7.84l7-3.5v7.84z" />
    </svg>
  );
}

function VercelIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 22.525H0l12-21.05z" />
    </svg>
  );
}

interface ToolItem {
  name: string;
  category: string;
  desc: string;
  rating: string;
  icon: ReactNode;
  gradient: string;
}

const tools: ToolItem[] = [
  {
    name: 'ChatGPT',
    category: 'AI Assistant',
    desc: 'Advanced conversational AI for content creation, coding, and analysis.',
    rating: '4.9',
    icon: <ChatGPTIcon className="h-5 w-5" />,
    gradient: 'from-[#10a37f] to-[#1a7f64]',
  },
  {
    name: 'Midjourney',
    category: 'AI Design',
    desc: 'Generate stunning visuals and artwork with AI-powered image generation.',
    rating: '4.8',
    icon: <MidjourneyIcon className="h-5 w-5" />,
    gradient: 'from-[#fff] to-[#d1d5db]',
  },
  {
    name: 'Notion',
    category: 'Productivity',
    desc: 'AI-enhanced workspace for docs, projects, and knowledge management.',
    rating: '4.7',
    icon: <NotionIcon className="h-5 w-5" />,
    gradient: 'from-[#fff] to-[#e5e7eb]',
  },
  {
    name: 'Semrush',
    category: 'SEO Tools',
    desc: 'Comprehensive SEO suite for keyword research, audits, and competitive analysis.',
    rating: '4.8',
    icon: <SemrushIcon className="h-5 w-5" />,
    gradient: 'from-[#ff642d] to-[#e55a28]',
  },
  {
    name: 'Jasper',
    category: 'AI Writing',
    desc: 'Enterprise AI writing assistant for marketing teams and content creators.',
    rating: '4.6',
    icon: <JasperIcon className="h-5 w-5" />,
    gradient: 'from-[#f06] to-[#c00]',
  },
  {
    name: 'Vercel',
    category: 'Hosting',
    desc: 'Deploy and scale modern web applications with zero configuration.',
    rating: '4.9',
    icon: <VercelIcon className="h-5 w-5" />,
    gradient: 'from-[#fff] to-[#d1d5db]',
  },
];

export default function TrendingTools() {
  return (
    <section className="relative overflow-hidden bg-[#09090b] py-20 sm:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/20 to-transparent" />

      <div className="container-custom relative">
        <ScrollReveal direction="up" duration={0.35}>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="eyebrow">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Trending Now
            </span>
            <h2 className="section-title mt-4">
              Top AI &amp; Tech <span className="gradient-text">Tools</span>
            </h2>
            <p className="section-copy mt-4">
              Hand-picked tools trusted by thousands of creators and founders.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <ScrollReveal key={tool.name} direction="up" delay={index * 0.05} duration={0.35}>
              <article className="premium-card group relative h-full p-6">
                <div className="flex items-start justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    {tool.icon}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {tool.rating}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white group-hover:text-[#c4b5fd] transition-colors">
                      {tool.name}
                    </h3>
                    <ExternalLink className="h-3.5 w-3.5 text-gray-600 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <span className="mt-1 inline-block text-[11px] font-semibold uppercase tracking-wider text-[#a78bfa]">
                    {tool.category}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{tool.desc}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
