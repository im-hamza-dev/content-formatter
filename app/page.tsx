import { HomeContent } from '@/components/home/HomeContent';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://contentformatter.com';

// SEO: WebApplication schema helps search engines understand the product (rich results, eligibility for app features)
const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI Text Cleaner & Formatter',
  url: siteUrl,
  description:
    'Clean, format, and beautify text with export options to PDF, DOCX, and TXT. Free AI content cleaner and text formatter online. No sign-up required.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  featureList: [
    'AI content cleaner and AI text cleaner',
    'Text formatter online and document formatter',
    'Beautify text and format document with WYSIWYG editor',
    'Export to PDF, DOCX, and TXT',
    'Copy formatted text; no sign-up required',
  ],
};

// SEO: Organization schema supports brand recognition and knowledge panel
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AI Text Cleaner & Formatter',
  url: siteUrl,
  description:
    'Free online tool to clean AI-generated text, format documents, and export to PDF, DOCX, or TXT.',
};

// SEO: BreadcrumbList helps search engines show breadcrumbs in SERPs (single-page: Home)
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: siteUrl,
    },
  ],
};

// SEO: FAQPage schema can enable FAQ rich results in Google
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an AI text cleaner?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An AI text cleaner removes clutter from AI-generated content: emojis, extra symbols, and inconsistent spacing. Our tool cleans text so you get professional copy ready to format and export.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this text formatter online free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The AI text cleaner and document formatter is free. You can clean text, beautify content, format documents, and export to PDF, DOCX, or TXT without signing up.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I export to Word or Google Docs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Download as DOCX for Word, or use Copy to paste formatted content into Google Docs. Format document once and use it anywhere.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my content stored or sent to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Cleaning and formatting run in your browser. Your text never leaves your device unless you use optional AI formatting, which is processed securely.',
      },
    },
  ],
};

const schemas = [
  webApplicationSchema,
  organizationSchema,
  breadcrumbSchema,
  faqSchema,
];

export default function Home() {
  return (
    <>
      {/* SEO: JSON-LD structured data for rich results and crawler understanding */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <HomeContent />
    </>
  );
}
