import Newsletter from '@/components/Newsletter';
import LegalPageLayout from '@/components/LegalPageLayout';

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
      <LegalPageLayout
        badge="Legal"
        title="Privacy"
        titleHighlight="Policy"
        lastUpdated="Last Updated: May 2026"
        sections={sections}
      />
      <Newsletter />
    </>
  );
}
