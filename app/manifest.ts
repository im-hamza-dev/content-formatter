import { MetadataRoute } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://contentformatter.com';

// SEO & PWA: Web app manifest for installability and rich results
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI Text Cleaner & Formatter',
    short_name: 'Content Formatter',
    description:
      'Clean AI-generated text, format documents, and export to PDF, DOCX, or TXT. Free text formatter online.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/contentformatter.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/contentformatter.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
