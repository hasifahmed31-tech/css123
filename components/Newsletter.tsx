import NewsletterForm from '@/components/NewsletterForm';

export default function Newsletter() {
  return (
    <section className="defer-section py-12 bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 px-6 py-10 text-center dark:from-indigo-900 dark:via-purple-900 dark:to-indigo-950">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-xl mx-auto">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/20 mb-5 backdrop-blur-sm border border-white/20">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white">Join Our Newsletter</h2>
            <p className="mt-3 text-indigo-100 text-base">
              Get the latest articles, tools & tips delivered to your inbox. No spam, ever.
            </p>

            <div className="mt-8">
              <NewsletterForm />
            </div>
            <p className="mt-4 text-sm text-indigo-100/80">
              Join 10,000+ subscribers. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
