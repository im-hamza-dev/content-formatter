import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Content Cleaner - Clean AI-Generated Text Instantly',
  description: 'Free AI content cleaner tool. Remove emojis, strip markdown, and format AI output into clean, professional text. Real-time processing with built-in content formatting tools. Perfect for cleaning ChatGPT, Claude, and Gemini outputs.',
  keywords: 'ai cleaner, ai content cleaner, ai text cleaner, ai text remover, clean ai, clean text, content formatting, format document',
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
