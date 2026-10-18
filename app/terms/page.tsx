import LegalPage, { type LegalSection } from '@/components/LegalPage';
import { Ban, Copyright, FilePenLine, Globe2, Handshake, Scale, ShieldQuestion } from 'lucide-react';

const sections: LegalSection[] = [
  { icon: Globe2, title: 'Website Usage', content: 'By using HASIF, you agree to use the website lawfully and in a way that does not damage, disrupt, or interfere with the site or its users.' },
  { icon: Copyright, title: 'Intellectual Property', content: 'Content, branding, graphics, and other materials on HASIF are protected by intellectual property laws. Do not reproduce, copy, or distribute them without written permission.' },
  { icon: Ban, title: 'Prohibited Conduct', items: ['Attempt unauthorized access to the website or its systems', 'Distribute malicious software', 'Spam, abuse, or disrupt website services', 'Violate applicable laws or another person’s rights'] },
  { icon: Handshake, title: 'Affiliate Relationships', content: 'HASIF may earn commissions through affiliate partnerships. See our Affiliate Disclosure for more information.' },
  { icon: ShieldQuestion, title: 'No Guarantees', items: ['We work to keep information useful and current, but cannot guarantee every detail is error-free', 'We do not guarantee uninterrupted website availability', 'We do not promise specific business or financial results'] },
  { icon: Scale, title: 'Limitation of Liability', items: ['Data loss or business interruption', 'Damages resulting from your use of the website'], note: 'You use this website at your own discretion.' },
  { icon: FilePenLine, title: 'Changes to These Terms', content: 'We may revise these terms as the website or our services change. Continued use of the website after an update means you accept the revised terms.' },
];

export default function TermsPage() {
  return <LegalPage title="Terms of" accent="Service" intro="The terms that apply when you browse and use HASIF’s guides, reviews, and website features." sections={sections} />;
}
