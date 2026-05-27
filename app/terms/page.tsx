import Newsletter from '@/components/Newsletter';
import LegalPageLayout from '@/components/LegalPageLayout';

const sections = [
  { icon: '🌐', title: 'Website Usage', content: 'You agree to use this website only for lawful purposes and in a way that does not damage or interfere with the website or its users.' },
  { icon: '📚', title: 'Intellectual Property', content: 'All content, branding, graphics, and materials on HASIF are protected by intellectual property laws. You may not reproduce, copy, or distribute content without written permission.' },
  { icon: '🚫', title: 'User Conduct', items: ['Attempt unauthorized access', 'Distribute malicious software', 'Spam or abuse website systems', 'Violate applicable laws'] },
  { icon: '🤝', title: 'Affiliate Relationships', content: 'HASIF may earn commissions through affiliate partnerships and sponsored content.' },
  { icon: '✨', title: 'No Guarantees', items: ['Accuracy of all content', 'Continuous website availability', 'Specific business or financial results'] },
  { icon: '⚠️', title: 'Limitation of Liability', items: ['Data loss', 'Business interruption', 'Damages resulting from use of this website'] },
  { icon: '📝', title: 'Changes to Terms', content: 'We may update these Terms of Service at any time without prior notice.' },
];

export default function TermsPage() {
  return (
    <>
      <LegalPageLayout
        badge="Legal"
        title="Terms of"
        titleHighlight="Service"
        lastUpdated="Last Updated: May 2026"
        sections={sections}
      />
      <Newsletter />
    </>
  );
}
