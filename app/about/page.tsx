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
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 py-24 sm:py-32 dark:from-indigo-900 dark:via-indigo-950 dark:to-gray-950 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="container-custom relative">
          <div className="mx-auto max-w-3xl text-center" style={{ animation: 'fadeInUp 0.4s ease' }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm mb-8 border border-white/10">
              <span>👋</span> About Hasif
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Built for creators who want{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                real answers
              </span>
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              A modern digital publication helping entrepreneurs, freelancers, and beginners discover the best tools and strategies to grow online.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent dark:from-gray-950" />
      </section>

      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-50/50 dark:bg-purple-950/20 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <ScrollReveal direction="up" duration={0.3}>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                What We Offer
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                Why readers <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">trust us</span>
              </h2>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
                Every piece of content is built on research, testing, and real experience.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} direction="up" delay={i * 0.06} duration={0.3}>
                <div className="group relative rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 hover:border-indigo-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-800 overflow-hidden">
                  <div className="relative">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-900/40 text-2xl mb-4 transition-transform duration-150 group-hover:scale-110">
                      {feature.icon}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-150">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {feature.desc}
                    </p>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-b-2xl" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
        <div className="container-custom relative">
          <ScrollReveal direction="up" duration={0.3}>
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Our Content
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                What we <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">publish</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
            {topics.map((topic, i) => (
              <ScrollReveal key={topic.title} direction="up" delay={i * 0.04} duration={0.3}>
                <div className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 hover:border-indigo-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-800 overflow-hidden">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/40 text-2xl transition-transform duration-150 group-hover:scale-110">
                    {topic.icon}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-150">{topic.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{topic.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal direction="up" duration={0.3}>
              <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm dark:border-gray-700 dark:bg-gray-800 overflow-hidden group hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center transition-transform duration-150 group-hover:scale-110">
                    <span className="text-xl">🎯</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Founded by <strong className="text-indigo-600 dark:text-indigo-400">Hasif</strong>, this platform was created to help creators, entrepreneurs, freelancers, and beginners discover the best digital tools and strategies to grow online faster. We believe in clean, honest content that actually helps you make better decisions.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.08} duration={0.3}>
              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-800/30 dark:bg-amber-950/20">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-xl dark:bg-amber-900/50">🤝</span>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">Affiliate Transparency</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Some links may be affiliate links. We earn a commission at no extra cost to you. We only recommend products we believe provide real value.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-900 dark:to-indigo-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="container-custom relative">
          <ScrollReveal direction="up" duration={0.3}>
            <div className="mx-auto max-w-xl rounded-2xl bg-white/10 backdrop-blur-sm p-10 text-center border border-white/10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-5">
                <span className="text-2xl">📧</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Let&apos;s Connect</h2>
              <p className="mt-3 text-white/60 text-base">For business inquiries, collaborations, or support</p>
              <a
                href="mailto:info@hasif.online"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-indigo-700 transition-all duration-150 hover:bg-indigo-50 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 active:scale-95"
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
