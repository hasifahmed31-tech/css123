import ScrollReveal from './ScrollReveal';

interface Section {
  icon: string;
  title: string;
  content?: string;
  items?: string[];
}

interface Props {
  badge: string;
  title: string;
  titleHighlight: string;
  lastUpdated: string;
  sections: Section[];
}

export default function LegalPageLayout({ badge, title, titleHighlight, lastUpdated, sections }: Props) {
  return (
    <>
      <section className="relative overflow-hidden bg-[#09090b] py-16 sm:py-20 pt-28 sm:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.1),transparent_50%)]" />

        <div className="container-custom relative">
          <ScrollReveal direction="up" duration={0.3}>
            <span className="eyebrow">{badge}</span>
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white">
              {title} <span className="gradient-text">{titleHighlight}</span>
            </h1>
            <p className="mt-3 text-sm text-gray-500">{lastUpdated}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 bg-[#09090b]">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl space-y-4">
            {sections.map((section, i) => (
              <ScrollReveal key={section.title} direction="up" delay={i * 0.04} duration={0.2}>
                <div className="premium-card group relative p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] text-lg transition-transform duration-150 group-hover:scale-110">
                      {section.icon}
                    </span>
                    <h2 className="font-bold text-white group-hover:text-[#c4b5fd] transition-colors duration-150">{section.title}</h2>
                  </div>
                  {section.content && <p className="text-sm text-gray-400 ml-14">{section.content}</p>}
                  {section.items && (
                    <ul className="ml-14 mt-2 space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-gray-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#7c3aed]" />{item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.15} duration={0.3}>
            <div className="mx-auto max-w-2xl mt-8 rounded-2xl bg-[#7c3aed]/5 border border-[#a78bfa]/15 p-5">
              <p className="text-sm text-gray-400">
                Questions? <a href="mailto:info@hasif.online" className="text-[#c4b5fd] font-semibold hover:underline">info@hasif.online</a>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
