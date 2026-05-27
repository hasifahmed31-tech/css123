import Newsletter from '@/components/Newsletter';
import LegalPageLayout from '@/components/LegalPageLayout';

const sections = [
  { icon: '🔗', title: 'Affiliate Links', content: 'Some links are affiliate links. We earn commission at no extra cost to you.' },
  { icon: '⭐', title: 'Our Promise', content: 'We only recommend products we believe provide real value.' },
  { icon: '🎯', title: 'Independence', content: 'Affiliate partnerships never influence our reviews.' },
  { icon: '💪', title: 'Our Mission', content: 'Honest, helpful content for our audience.' },
];

export default function AffiliateDisclosurePage() {
  return (
    <>
      <LegalPageLayout
        badge="Legal"
        title="Affiliate"
        titleHighlight="Disclosure"
        lastUpdated="Last Updated: May 2026"
        sections={sections}
      />
      <Newsletter />
    </>
  );
}
