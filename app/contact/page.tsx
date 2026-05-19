'use client';

import { useState, useCallback } from 'react';
import Newsletter from '@/components/Newsletter';

const contacts = [
  { icon: '📧', label: 'Email', value: 'info@hasif.online', href: 'mailto:info@hasif.online' },
  { icon: '🐦', label: 'Twitter', value: '@hasif', href: 'https://x.com/hasif' },
  { icon: '💬', label: 'Discord', value: 'Join Community', href: '#' },
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
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 py-24 sm:py-32 dark:from-indigo-900 dark:via-indigo-950 dark:to-gray-950 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="container-custom relative">
          <div className="mx-auto max-w-2xl text-center" style={{ animation: 'fadeInUp 0.4s ease' }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm mb-8 border border-white/10">
              <span>👋</span> Get in Touch
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Connect</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-lg mx-auto">
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
                className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-5 py-2.5 text-white text-sm font-medium transition-colors duration-150 hover:bg-white/20"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm">
                  {item.icon}
                </span>
                {item.value}
              </a>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent dark:from-gray-950" />
      </section>

      <section className="py-14">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center">
                      <span className="text-xl">✉️</span>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Send a Message</h2>
                  </div>

                  {sent && (
                    <div className="mb-5 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 text-emerald-700 dark:text-emerald-400 text-sm">
                      ✓ Message sent! We will get back to you soon.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Name *</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-colors duration-150 ${errors.name ? 'border-red-400' : 'border-gray-200 dark:border-gray-600'}`}
                          placeholder="Your name"
                          maxLength={100}
                          autoComplete="name"
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Email *</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-colors duration-150 ${errors.email ? 'border-red-400' : 'border-gray-200 dark:border-gray-600'}`}
                          placeholder="you@example.com"
                          maxLength={200}
                          autoComplete="email"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Subject</label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => updateField('subject', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-colors duration-150"
                        placeholder="How can we help?"
                        maxLength={200}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Message *</label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none transition-colors duration-150 ${errors.message ? 'border-red-400' : 'border-gray-200 dark:border-gray-600'}`}
                        placeholder="Tell us what is on your mind..."
                        maxLength={2000}
                      />
                      {errors.message && <p className="text-xs text-red-500 mt-1.5">{errors.message}</p>}
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 transition-all duration-150 hover:from-indigo-500 hover:to-indigo-600 hover:shadow-xl hover:shadow-indigo-500/25 active:scale-[0.98]"
                    >
                      {sent ? 'Message Sent!' : 'Send Message'}
                    </button>
                  </form>
                </div>
              </div>

            <div className="lg:col-span-2 space-y-5">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                    <span className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center">📞</span>
                    Contact Info
                  </h2>
                  {contacts.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors duration-150 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 -mx-2 px-2 rounded-lg"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/40 text-lg">
                        {item.icon}
                      </span>
                      <div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">{item.label}</div>
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item.value}</div>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center">❓</span>
                    FAQ
                  </h2>
                  <div className="space-y-1">
                    {faqs.map((faq, i) => (
                      <div key={i} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
                        >
                          {faq.q}
                          <span className={`text-xs transition-transform duration-150 ${openFaq === i ? 'rotate-180 text-indigo-500' : ''}`}>▼</span>
                        </button>
                        {openFaq === i && (
                          <p className="pb-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
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
