import Newsletter from '@/components/Newsletter';
import ScrollReveal from '@/components/ScrollReveal';

const points = [
  { icon: '🔗', title: 'Affiliate Links', content: 'Some links are affiliate links. We earn commission at no extra cost to you.' },
  { icon: '⭐', title: 'Our Promise', content: 'We only recommend products we believe provide real value.' },
  { icon: '🎯', title: 'Independence', content: 'Affiliate partnerships never influence our reviews.' },
  { icon: '💪', title: 'Our Mission', content: 'Honest, helpful content for our audience.' },
];

export default function AffiliateDisclosurePage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-indigo-600 to-indigo-700 py-16 sm:py-20 dark:from-indigo-900 dark:to-indigo-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="container-custom relative">
          <ScrollReveal direction="up" duration={0.3}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white border border-white/10">
              📄 Legal
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white">
              Affiliate <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Disclosure</span>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          <ScrollReveal direction="up" duration={0.2}>
            <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-300">HASIF participates in affiliate marketing programs. We may earn commissions through qualifying purchases.</p>
            </div>
          </ScrollReveal>

          <div className="mx-auto max-w-2xl grid gap-5 sm:grid-cols-2">
            {points.map((point, i) => (
              <ScrollReveal key={point.title} direction="up" delay={i * 0.04} duration={0.2}>
                <div className="group h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-all duration-150 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-0.5 hover:border-indigo-200 dark:hover:border-indigo-800 overflow-hidden">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/40 text-xl mb-4 transition-transform duration-150 group-hover:scale-110">
                    {point.icon}
                  </span>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-150">{point.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{point.content}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-150 origin-left" />
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.15} duration={0.3}>
            <div className="mx-auto max-w-2xl mt-8 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 p-5 border border-indigo-100 dark:border-indigo-900/50">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Questions? <a href="mailto:info@hasif.online" className="text-indigo-600 font-semibold hover:underline dark:text-indigo-400">info@hasif.online</a>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
