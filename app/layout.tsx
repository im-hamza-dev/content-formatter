import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://contentformatter.com';

export async function generateMetadata(): Promise<Metadata> {
  const title =
    'AI Text Cleaner & Formatter | Clean, Beautify & Export Text Online';
  const description =
    'Free AI content cleaner and text formatter online. Clean AI-generated text, beautify text, and format documents easily. Export to PDF, DOCX, and TXT. No sign-up required.';
  const keywords =
    'ai cleaner, ai content cleaner, ai text cleaner, text formatter online, beautify text, format document';

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords,
    icons: {
      icon: '/contentformatter.png',
      apple: '/contentformatter.png',
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: '/',
      siteName: 'AI Text Cleaner & Formatter',
      images: [
        {
          url: '/contentformatter.png',
          width: 512,
          height: 512,
          alt: 'AI Text Cleaner & Formatter',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/contentformatter.png'],
    },
    alternates: {
      canonical: '/',
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
