import Newsletter from '@/components/Newsletter';
import ScrollReveal from '@/components/ScrollReveal';

const features = [
  { icon: '🔍', title: 'In-Depth Reviews', desc: 'Every tool is tested hands-on before we recommend it. No shortcuts, no paid placements.' },
  { icon: '📖', title: 'Step-by-Step Guides', desc: 'Clear tutorials you can follow even if you are a complete beginner.' },
  { icon: '🤖', title: 'AI & Automation', desc: 'Practical AI tutorials that save you hours every week.' },
  { icon: '📈', title: 'Growth Strategies', desc: 'Proven marketing and SEO tactics that actually move the needle.' },
  { icon: '🛡️', title: 'No BS Content', desc: 'We cut through the hype. Only honest, research-backed recommendations.' },
  { icon: '🤝', title: 'Full Transparency', desc: 'Clear affiliate disclosures always. We never let partnerships influence our reviews.' },
];

const topics = [
  { icon: '⭐', title: 'Honest Reviews', desc: 'In-depth software reviews based on real testing' },
  { icon: '📈', title: 'Marketing Guides', desc: 'Affiliate marketing strategies that work' },
  { icon: '🤖', title: 'AI & Automation', desc: 'Cut through the noise with practical AI tutorials' },
  { icon: '✍️', title: 'Blogging & SEO', desc: 'Rank higher and grow your audience' },
  { icon: '⚡', title: 'Productivity', desc: 'Tools and habits to do more in less time' },
  { icon: '🚀', title: 'Online Business', desc: 'Step-by-step guides for beginners' },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#09090b] py-24 sm:py-32 pt-32 sm:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />

        <div className="container-custom relative">
          <div className="mx-auto max-w-3xl text-center" style={{ animation: 'fadeInUp 0.4s ease' }}>
            <span className="eyebrow">About Hasif Online</span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Built for creators who want{' '}
              <span className="gradient-text">real answers</span>
            </h1>
            <p className="mt-5 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              A modern digital publication helping entrepreneurs, freelancers, and beginners discover the best tools and strategies to grow online.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden bg-[#09090b]">
        <div className="container-custom relative">
          <ScrollReveal direction="up" duration={0.3}>
            <div className="text-center mb-12">
              <span className="eyebrow">What We Offer</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white">
                Why readers <span className="gradient-text">trust us</span>
              </h2>
              <p className="mt-3 text-base text-gray-400 max-w-lg mx-auto">
                Every piece of content is built on research, testing, and real experience.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} direction="up" delay={i * 0.05} duration={0.3}>
                <div className="premium-card group relative p-7">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.06] text-2xl mb-4 transition-transform duration-150 group-hover:scale-110">
                    {feature.icon}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#c4b5fd] transition-colors duration-150">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-[#09090b] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/20 to-transparent" />
        <div className="container-custom relative">
          <ScrollReveal direction="up" duration={0.3}>
            <div className="text-center mb-10">
              <span className="eyebrow">Our Content</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white">
                What we <span className="gradient-text">publish</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
            {topics.map((topic, i) => (
              <ScrollReveal key={topic.title} direction="up" delay={i * 0.04} duration={0.3}>
                <div className="premium-card group flex items-start gap-4 p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] text-2xl transition-transform duration-150 group-hover:scale-110">
                    {topic.icon}
                  </span>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-[#c4b5fd] transition-colors duration-150">{topic.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{topic.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#09090b]">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal direction="up" duration={0.3}>
              <div className="premium-card group p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center transition-transform duration-150 group-hover:scale-110">
                    <span className="text-xl">🎯</span>
                  </div>
                  <h2 className="text-xl font-bold text-white">Our Mission</h2>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Founded by <strong className="text-[#c4b5fd]">Hasif</strong>, this platform was created to help creators, entrepreneurs, freelancers, and beginners discover the best digital tools and strategies to grow online faster. We believe in clean, honest content that actually helps you make better decisions.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.08} duration={0.3}>
              <div className="mt-5 rounded-2xl border border-amber-500/15 bg-amber-500/[0.04] p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-xl">🤝</span>
                  <div>
                    <h3 className="font-bold text-white text-sm">Affiliate Transparency</h3>
                    <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                      Some links may be affiliate links. We earn a commission at no extra cost to you. We only recommend products we believe provide real value.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-[#09090b] overflow-hidden">
        <div className="container-custom relative">
          <ScrollReveal direction="up" duration={0.3}>
            <div className="mx-auto max-w-xl rounded-3xl border border-white/[0.06] bg-white/[0.02] p-10 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#7c3aed]/10 border border-[#a78bfa]/20 mb-5">
                <span className="text-2xl">📧</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Let&apos;s Connect</h2>
              <p className="mt-3 text-gray-500 text-base">For business inquiries, collaborations, or support</p>
              <a
                href="mailto:info@hasif.online"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#6366f1] px-8 py-4 font-bold text-white transition-all duration-150 hover:scale-105 hover:shadow-2xl hover:shadow-[#7c3aed]/20 active:scale-95"
              >
                📧 info@hasif.online
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
