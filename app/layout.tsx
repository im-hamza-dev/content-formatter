import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Content Formatting Tool – Format & Export Documents | PDF, DOCX, TXT',
  description: 'Free content formatting tool like Google Docs. Format documents with rich text, clean AI-generated text with our ai content cleaner, and export to PDF, DOCX, or TXT. Clean text, format document, and download in seconds.',
  keywords: 'ai cleaner, ai content cleaner, ai text cleaner, ai text remover, clean ai, clean text, content formatting, format document, google docs',
  openGraph: {
    title: 'Content Formatting Tool – Format & Export Documents',
    description: 'Format documents with rich text, clean AI text, and export to PDF, DOCX, or TXT. Free content formatting tool.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
