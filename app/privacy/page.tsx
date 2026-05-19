import Newsletter from '@/components/Newsletter';
import ScrollReveal from '@/components/ScrollReveal';

const sections = [
  { icon: '👋', title: 'Welcome', content: 'Welcome to HASIF. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website.' },
  { icon: '📊', title: 'Information We Collect', items: ['Name and email address', 'Browser and device information', 'IP address and analytics data', 'Information submitted through forms or newsletters'] },
  { icon: '⚙️', title: 'How We Use Information', items: ['Improve website performance', 'Respond to inquiries', 'Send newsletters and updates', 'Analyze traffic and user behavior'] },
  { icon: '🍪', title: 'Cookies', content: 'This website may use cookies to improve user experience. You can disable cookies in your browser settings.' },
  { icon: '🔐', title: 'Data Protection', content: 'We take reasonable measures to protect your information, but no online system is completely secure.' },
  { icon: '🔗', title: 'External Links', content: 'Our website may contain links to external websites. We are not responsible for third-party privacy practices.' },
  { icon: '🔄', title: 'Updates', content: 'We may update this policy at any time without notice.' },
];

export default function PrivacyPage() {
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
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Policy</span>
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
                <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-all duration-150 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-0.5 hover:border-indigo-200 dark:hover:border-indigo-800 overflow-hidden">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/40 text-lg transition-transform duration-150 group-hover:scale-110">
                      {section.icon}
                    </span>
                    <h2 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-150">{section.title}</h2>
                  </div>
                  {section.content && <p className="text-sm text-gray-600 dark:text-gray-300 ml-14">{section.content}</p>}
                  {section.items && (
                    <ul className="ml-14 mt-2 space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />{item}
                        </li>
                      ))}
                    </ul>
                  )}
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
