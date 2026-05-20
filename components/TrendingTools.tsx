import { Bot, ExternalLink, Sparkles, Star } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const tools = [
  { name: 'ChatGPT', category: 'AI Assistant', desc: 'Advanced conversational AI for content creation, coding, and analysis.', rating: '4.9' },
  { name: 'Midjourney', category: 'AI Design', desc: 'Generate stunning visuals and artwork with AI-powered image generation.', rating: '4.8' },
  { name: 'Notion AI', category: 'Productivity', desc: 'AI-enhanced workspace for docs, projects, and knowledge management.', rating: '4.7' },
  { name: 'Semrush', category: 'SEO Tools', desc: 'Comprehensive SEO suite for keyword research, audits, and competitive analysis.', rating: '4.8' },
  { name: 'Jasper', category: 'AI Writing', desc: 'Enterprise AI writing assistant for marketing teams and content creators.', rating: '4.6' },
  { name: 'Vercel', category: 'Hosting', desc: 'Deploy and scale modern web applications with zero configuration.', rating: '4.9' },
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
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#6366f1] text-white shadow-lg">
                    <Bot className="h-5 w-5" />
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
