'use client';

import { useState, useCallback } from 'react';
import Newsletter from '@/components/Newsletter';

const contacts = [
  { icon: '📧', label: 'Email', value: 'info@hasif.online', href: 'mailto:info@hasif.online' },
  { icon: '💼', label: 'LinkedIn', value: 'Hasif', href: 'https://www.linkedin.com/in/hasifonline' },
];

const faqs = [
  { q: 'How can I collaborate?', a: 'Email us at info@hasif.online with your idea and we will get back to you within 48 hours.' },
  { q: 'Do you accept guest posts?', a: 'Yes! Send us your pitch with a brief outline and we will review it.' },
  { q: 'Can I advertise?', a: 'Contact us for advertising rates and available placements.' },
  { q: 'How often do you publish?', a: 'We publish new articles weekly. Subscribe to our newsletter to stay updated.' },
];

function sanitize(str: string) {
  return str.replace(/[<>]/g, '').trim();
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name) errs.name = 'Required';
    else if (name.length < 2) errs.name = 'Too short';
    if (!email) errs.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email';
    if (!message) errs.message = 'Required';
    else if (message.length < 10) errs.message = 'Min 10 characters';
    return errs;
  }, [form]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  }, [validate]);

  const updateField = useCallback((field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: sanitize(value) }));
    setErrors((prev) => {
      if (prev[field]) {
        const next = { ...prev };
        delete next[field];
        return next;
      }
      return prev;
    });
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-[#09090b] py-24 sm:py-32 pt-32 sm:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />

        <div className="container-custom relative">
          <div className="mx-auto max-w-2xl text-center" style={{ animation: 'fadeInUp 0.4s ease' }}>
            <span className="eyebrow">Get in Touch</span>
            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Let&apos;s <span className="gradient-text">Connect</span>
            </h1>
            <p className="mt-4 text-lg text-gray-400 max-w-lg mx-auto">
              Have a question, want to collaborate, or just say hi?
            </p>
          </div>

          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            {contacts.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm px-5 py-2.5 text-white text-sm font-medium transition-colors duration-150 hover:bg-white/[0.08]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-sm">
                  {item.icon}
                </span>
                {item.value}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-[#09090b]">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="premium-card p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    <span className="text-xl">✉️</span>
                  </div>
                  <h2 className="text-lg font-bold text-white">Send a Message</h2>
                </div>

                {sent && (
                  <div className="mb-5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                    Message sent! We will get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-white bg-white/[0.03] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/30 transition-colors duration-150 ${errors.name ? 'border-red-400' : 'border-white/[0.08]'}`}
                        placeholder="Your name"
                        maxLength={100}
                        autoComplete="name"
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-white bg-white/[0.03] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/30 transition-colors duration-150 ${errors.email ? 'border-red-400' : 'border-white/[0.08]'}`}
                        placeholder="you@example.com"
                        maxLength={200}
                        autoComplete="email"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => updateField('subject', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/30 transition-colors duration-150"
                      placeholder="How can we help?"
                      maxLength={200}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Message *</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-white bg-white/[0.03] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/30 resize-none transition-colors duration-150 ${errors.message ? 'border-red-400' : 'border-white/[0.08]'}`}
                      placeholder="Tell us what is on your mind..."
                      maxLength={2000}
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1.5">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#6366f1] transition-all duration-150 hover:shadow-xl hover:shadow-[#7c3aed]/20 active:scale-[0.98]"
                  >
                    {sent ? 'Message Sent!' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-5">
              <div className="premium-card p-6">
                <h2 className="text-base font-bold text-white mb-5 flex items-center gap-2">
                  <span className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">📞</span>
                  Contact Info
                </h2>
                {contacts.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 py-3 border-b border-white/[0.06] last:border-0 transition-colors duration-150 hover:bg-white/[0.03] -mx-2 px-2 rounded-lg"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] text-lg">
                      {item.icon}
                    </span>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</div>
                      <div className="text-sm font-semibold text-gray-300">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="premium-card p-6">
                <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">❓</span>
                  FAQ
                </h2>
                <div className="space-y-1">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border-b border-white/[0.06] last:border-0">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-white hover:text-[#c4b5fd] transition-colors duration-150"
                      >
                        {faq.q}
                        <span className={`text-xs transition-transform duration-150 ${openFaq === i ? 'rotate-180 text-[#a78bfa]' : ''}`}>▼</span>
                      </button>
                      {openFaq === i && (
                        <p className="pb-3 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
