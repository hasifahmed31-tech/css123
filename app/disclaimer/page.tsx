import Newsletter from '@/components/Newsletter';
import ScrollReveal from '@/components/ScrollReveal';

const sections = [
  { icon: '📋', title: 'General Information', content: 'All content on HASIF is for informational purposes only. It does not constitute professional advice.' },
  { icon: '⚖️', title: 'No Professional Advice', content: 'Consult a qualified professional before making any financial, legal, or business decisions.' },
  { icon: '💰', title: 'Earnings Disclaimer', content: 'We do not guarantee any specific income or results. Your results depend on many factors.' },
  { icon: '🔗', title: 'Affiliate Links', content: 'Some links are affiliate links. We may earn a commission at no extra cost to you.' },
  { icon: '🔄', title: 'Accuracy', content: 'We strive for accuracy but cannot guarantee all information is current or error-free.' },
];

export default function DisclaimerPage() {
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Disclaimer</span>
            </h1>
            <p className="mt-3 text-sm text-indigo-200/70">Last Updated: May 2026</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl space-y-4">
            {sections.map((section, i) => (
              <ScrollReveal key={section.title} direction="up" delay={i * 0.04} duration={0.2}>
                <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-all duration-150 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-0.5 overflow-hidden">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/40 text-lg transition-transform duration-150 group-hover:scale-110">
                      {section.icon}
                    </span>
                    <h2 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-150">{section.title}</h2>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 ml-14">{section.content}</p>
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
