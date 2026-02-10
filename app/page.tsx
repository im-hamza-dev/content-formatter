import { HomeContent } from '@/components/home/HomeContent';

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI Text Cleaner & Formatter',
  description:
    'Clean, format, and beautify text with export options to PDF, DOCX, and TXT. Free AI content cleaner and text formatter online.',
  applicationCategory: 'Utility',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <HomeContent />
    </>
  );
}
