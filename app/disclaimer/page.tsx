import Newsletter from '@/components/Newsletter';
import LegalPageLayout from '@/components/LegalPageLayout';

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
      <LegalPageLayout
        badge="Legal"
        title=""
        titleHighlight="Disclaimer"
        lastUpdated="Last Updated: May 2026"
        sections={sections}
      />
      <Newsletter />
    </>
  );
}
