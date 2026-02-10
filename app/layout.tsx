import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://contentformatter.com';

// SEO: Title under 60 chars with primary keyword for SERP click-through
const title =
  'AI Text Cleaner & Formatter | Clean, Beautify & Export Text Online';

// SEO: Meta description 150-160 chars with CTA and keywords (improves CTR)
const description =
  'Free AI content cleaner and text formatter online. Clean AI-generated text, beautify content, and format documents. Export to PDF, DOCX, TXT. Try it now—no sign-up.';

// SEO: Explicit viewport for mobile responsiveness and Core Web Vitals
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata(): Promise<Metadata> {
  const keywords =
    'ai cleaner, ai content cleaner, ai text cleaner, text formatter online, beautify text, format document, text formatter, document formatter, wysiwyg editor';

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords,
    // SEO: Allow indexing; explicit for crawlers
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    // SEO: Icons for tabs, bookmarks, PWA
    icons: {
      icon: [
        { url: '/contentformatter.png', sizes: '32x32', type: 'image/png' },
        { url: '/contentformatter.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: [
        { url: '/contentformatter.png', sizes: '180x180', type: 'image/png' },
        { url: '/contentformatter.png', sizes: '192x192', type: 'image/png' },
      ],
    },
    // SEO: Open Graph for social sharing (Facebook, LinkedIn, etc.)
    openGraph: {
      title,
      description,
      type: 'website',
      url: siteUrl,
      siteName: 'AI Text Cleaner & Formatter',
      locale: 'en_US',
      images: [
        {
          url: '/contentformatter.png',
          width: 512,
          height: 512,
          alt: 'AI Text Cleaner & Formatter - Clean, format, and export text online',
        },
      ],
    },
    // SEO: Twitter Card for Twitter/X sharing
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/contentformatter.png'],
      creator: '@contentformatter',
    },
    // SEO: Canonical URL prevents duplicate-content issues
    alternates: {
      canonical: '/',
    },
    // SEO & Analytics: Add Google Search Console verification when you have the code:
    // other: { 'google-site-verification': 'YOUR_VERIFICATION_CODE' },
    other: {
      'format-detection': 'telephone=no',
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Analytics: Add GA4 when ready. Example (uncomment and set NEXT_PUBLIC_GA_ID):
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="gtag" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');`}
            </Script>
        */}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
