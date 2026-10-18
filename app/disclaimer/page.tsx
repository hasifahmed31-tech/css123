import LegalPage, { type LegalSection } from '@/components/LegalPage';
import { BriefcaseBusiness, ChartNoAxesCombined, Info, Link2, RefreshCw } from 'lucide-react';

const sections: LegalSection[] = [
  { icon: Info, title: 'General Information', content: 'Content on HASIF is provided for general informational purposes. It is not a substitute for advice tailored to your situation.' },
  { icon: BriefcaseBusiness, title: 'No Professional Advice', content: 'Consult a qualified professional before making financial, legal, business, or other decisions that require expert guidance.' },
  { icon: ChartNoAxesCombined, title: 'Results and Earnings', content: 'We do not guarantee income, rankings, traffic, or other results. Outcomes vary based on many factors, including your decisions and circumstances.' },
  { icon: Link2, title: 'Affiliate Links', content: 'Some links may be affiliate links. We may earn a commission from qualifying purchases at no additional cost to you.' },
  { icon: RefreshCw, title: 'Accuracy and Updates', content: 'We make reasonable efforts to keep information accurate, but products and services can change. Please verify important details with the provider.' },
];

export default function DisclaimerPage() {
  return <LegalPage title="Reader" accent="Disclaimer" intro="Understand the scope and limits of the information shared in HASIF’s articles, reviews, and recommendations." sections={sections} />;
}
