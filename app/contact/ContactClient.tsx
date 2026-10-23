'use client';

import { useState, useCallback } from 'react';
import type { SVGProps } from 'react';
import {
  ChevronDown,
  Handshake,
  HelpCircle,
  Mail,
  MessageSquare,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';
import GrowthGuideFinder from '@/components/GrowthGuideFinder';
import TrustedHtml from '@/components/TrustedHtml';

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

const contacts = [
  { icon: Mail, label: 'Gmail', value: 'info@hasif.online', href: 'mailto:info@hasif.online' },
  { icon: LinkedinIcon, label: 'LinkedIn', value: 'Hasif Online', href: 'https://www.linkedin.com/in/hasifonline' },
  { icon: Handshake, label: 'Collaborate', value: 'Send a Pitch', href: 'mailto:info@hasif.online?subject=Collaboration%20Pitch' },
];

const faqs = [
  { q: 'How can I collaborate?', a: 'Email us at info@hasif.online with your idea and we will get back to you within 48 hours.' },
  { q: 'Do you accept guest posts?', a: 'Yes! Send us your pitch with a brief outline and we will review it.' },
  { q: 'Can I advertise?', a: 'Contact us for advertising rates and available placements.' },
  { q: 'How often do you publish?', a: 'We publish new articles weekly. Visit the blog to browse the latest guides and reviews.' },
];

function sanitize(str: string) {
  return str.replace(/[<>]/g, '').trim();
}

interface ContactClientProps {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  bodyHtml?: string;
}

export default function ContactClient({ eyebrow, title, description, bodyHtml }: ContactClientProps) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [website, setWebsite] = useState('');
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

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitState('sending');
    setSubmitMessage('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || 'We could not send your message. Please try again.');
      setSubmitState('sent');
      setSubmitMessage('Message sent to Hasif. We’ll reply to your email address.');
      setForm({ name: '', email: '', subject: '', message: '' });
      setWebsite('');
    } catch (error) {
      setSubmitState('error');
      setSubmitMessage(error instanceof Error ? error.message : 'We could not send your message. Please try again.');
    }
  }, [form, validate, website]);

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
      <section className="relative overflow-hidden border-b border-white/10 bg-[#17151f] py-20 text-white sm:py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/3 rounded-full bg-[#5b35b8]/20 blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm mb-8 border border-white/10">
              <Sparkles className="h-4 w-4" />
              {eyebrow || 'Get in Touch'}
            </div>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              {title || <>Let&apos;s <span className="text-[#e3d9ff]">Connect</span></>}
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-lg mx-auto">
              {description || 'Have a question, want to collaborate, or just say hi?'}
            </p>
          </div>

          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            {contacts.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-5 py-2.5 text-white text-sm font-medium transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm">
                  <item.icon className="h-4 w-4" />
                </span>
                {item.value}
              </a>
            ))}
          </div>
        </div>

      </section>

      {bodyHtml && (
        <section className="bg-white py-12 dark:bg-gray-950">
          <div className="container-custom">
            <TrustedHtml className="blog-content mx-auto max-w-3xl" html={bodyHtml} />
          </div>
        </section>
      )}

      <section className="py-14">
        <div className="container-custom">
          <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
                <div className="premium-card p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/40 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-violet-800 dark:text-violet-200" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Send a Message</h2>
                  </div>

                  {submitState === 'sent' && (
                    <div className="mb-5 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 text-emerald-700 dark:text-emerald-400 text-sm">
                       Message sent! We will get back to you soon.
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <input name="website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Name *</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          className={`editorial-input w-full ${errors.name ? 'border-rose-400' : ''}`}
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
                          className={`editorial-input w-full ${errors.email ? 'border-rose-400' : ''}`}
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
                        className="editorial-input w-full"
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
                        className={`editorial-input w-full resize-y ${errors.message ? 'border-rose-400' : ''}`}
                        placeholder="Tell us what is on your mind..."
                        maxLength={2000}
                      />
                      {errors.message && <p className="text-xs text-red-500 mt-1.5">{errors.message}</p>}
                    </div>
                    <button
                      type="submit"
                      disabled={submitState === 'sending'}
                      className="button-premium w-full gap-2 rounded-xl bg-gray-950 py-3.5 text-sm font-bold text-white hover:bg-[#5b35b8] disabled:cursor-wait disabled:opacity-60 dark:bg-white dark:text-gray-950 dark:hover:bg-[#e3d9ff]"
                    >
                      <Send className="h-4 w-4" />
                      {submitState === 'sending' ? 'Sending…' : submitState === 'sent' ? 'Sent' : 'Send message'}
                    </button>
                    {submitMessage && <p role={submitState === 'error' ? 'alert' : 'status'} aria-live="polite" className={`text-center text-sm ${submitState === 'error' ? 'text-rose-600 dark:text-rose-300' : 'text-gray-500 dark:text-gray-400'}`}>{submitMessage}</p>}
                  </form>
                </div>
              </div>

            <div className="lg:col-span-2 space-y-5">
                <div className="premium-card p-6">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                    <span className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/40 flex items-center justify-center">
                      <UserRound className="h-5 w-5 text-violet-800 dark:text-violet-200" />
                    </span>
                    Contact Info
                  </h2>
                  {contacts.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors duration-150 hover:bg-violet-50/50 dark:hover:bg-violet-950/20 -mx-2 px-2 rounded-lg"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-950/40 text-lg">
                        <item.icon className="h-5 w-5 text-violet-800 dark:text-violet-200" />
                      </span>
                      <div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">{item.label}</div>
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item.value}</div>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="premium-card p-6">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/40 flex items-center justify-center">
                      <HelpCircle className="h-5 w-5 text-violet-800 dark:text-violet-200" />
                    </span>
                    FAQ
                  </h2>
                  <div className="space-y-1">
                    {faqs.map((faq, i) => (
                      <div key={i} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <button
                          type="button"
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-gray-900 dark:text-white hover:text-violet-800 dark:hover:text-violet-300 transition-colors duration-150"
                          aria-expanded={openFaq === i}
                        >
                          {faq.q}
                          <ChevronDown className={`h-4 w-4 transition-transform duration-150 ${openFaq === i ? 'rotate-180 text-violet-700' : ''}`} />
                        </button>
                        {openFaq === i && (
                          <p className="pb-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm dark:border-emerald-800/30 dark:bg-emerald-950/20">
                  <h2 className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
                    <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                    Fast response
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    For partnerships, reviews, and support, email is the fastest way to reach the team.
                  </p>
                </div>
              </div>
          </div>
        </div>
      </section>

      <GrowthGuideFinder />
    </>
  );
}
