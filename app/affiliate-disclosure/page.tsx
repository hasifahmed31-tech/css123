import LegalPage, { type LegalSection } from '@/components/LegalPage';
import { BadgeCheck, HeartHandshake, Link2, Scale } from 'lucide-react';

const sections: LegalSection[] = [
  { icon: Link2, title: 'Affiliate Links', content: 'Some links on HASIF are affiliate links. If you buy through one of these links, we may earn a commission at no extra cost to you.' },
  { icon: BadgeCheck, title: 'Our Recommendation Standard', content: 'We aim to recommend products and services based on their usefulness and fit for our readers.' },
  { icon: Scale, title: 'Editorial Independence', content: 'Affiliate relationships do not guarantee positive coverage or change our goal of giving readers clear, helpful information.' },
  { icon: HeartHandshake, title: 'Why We Disclose', content: 'We believe readers should know when a link may support our work. Thank you for helping us publish practical, independent guides.' },
];

export default function AffiliateDisclosurePage() {
  return <LegalPage title="Affiliate" accent="Disclosure" intro="How affiliate links support our work, and the standards we aim to follow when recommending products." sections={sections} />;
}
