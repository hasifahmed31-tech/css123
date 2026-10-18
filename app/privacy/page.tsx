import LegalPage, { type LegalSection } from '@/components/LegalPage';
import { Cookie, Database, ExternalLink, Info, RefreshCw, ShieldCheck, Workflow } from 'lucide-react';

const sections: LegalSection[] = [
  { icon: Info, title: 'Welcome', content: 'Welcome to HASIF. This Privacy Policy explains what information we collect, how we use it, and the choices available to you when you use our website.' },
  { icon: Database, title: 'Information We Collect', items: ['Name and email address you choose to provide through the contact form', 'Browser and device information', 'IP address and analytics data', 'Information you submit through website forms'] },
  { icon: Workflow, title: 'How We Use Information', items: ['Improve website performance and content', 'Respond to inquiries', 'Understand site traffic and usage'] },
  { icon: Cookie, title: 'Cookies', content: 'This website may use cookies to support site functionality and improve your experience. You can manage or disable cookies in your browser settings.' },
  { icon: ShieldCheck, title: 'Data Protection', content: 'We use reasonable measures to protect information. No online service can guarantee complete security, so please avoid sending sensitive information through general contact forms.' },
  { icon: ExternalLink, title: 'External Links', content: 'Our website may link to third-party websites. Their privacy practices are governed by their own policies.' },
  { icon: RefreshCw, title: 'Policy Updates', content: 'We may update this policy as the website or our practices change. The date above shows when this page was most recently revised.' },
];

export default function PrivacyPage() {
  return <LegalPage title="Privacy" accent="Policy" intro="A clear guide to the information HASIF handles and the choices you have when using our website." sections={sections} />;
}
