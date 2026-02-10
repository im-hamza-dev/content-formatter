'use client';

import { useState } from 'react';
import {
  Sparkles,
  Zap,
  FileText,
  Wand2,
  Scissors,
  ListChecks,
  FileEdit,
} from 'lucide-react';
import { OutputEditor } from '@/components/editor/OutputEditor';
import { ThemeToggle } from '@/components/ThemeToggle';

export function HomeContent() {
  const [outputExtended, setOutputExtended] = useState(false);
  const features = [
    {
      icon: FileEdit,
      title: 'Content formatting',
      description:
        'Format document with headings, bold, italic, lists, and code blocks. Use this text formatter online like a rich-text editor—no account needed.',
      color: 'text-pink-600 bg-pink-100 dark:text-pink-400 dark:bg-pink-900/20',
    },
    {
      icon: FileText,
      title: 'Format document & export',
      description:
        'Export your formatted content as PDF, DOCX, or TXT. Format document once and download in the format you need for reports, articles, or docs.',
      color:
        'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20',
    },
    {
      icon: Wand2,
      title: 'AI content cleaner',
      description:
        'Clean AI-generated text in one click. Our AI text cleaner removes emojis and clutter so you get clean text from ChatGPT, Claude, or any source.',
      color:
        'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/20',
    },
    {
      icon: Scissors,
      title: 'Clean text from markdown',
      description:
        'Strip markdown and get clean text. AI text remover for symbols and formatting; then use content formatting to style it your way.',
      color: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20',
    },
    {
      icon: ListChecks,
      title: 'Structure & lists',
      description:
        'Normalize bullet points and structure. Content formatting for lists and headings so your document looks professional in PDF or DOCX.',
      color:
        'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20',
    },
    {
      icon: Sparkles,
      title: 'Privacy-first',
      description:
        'All content formatting and clean text happens in your browser. Your data never leaves your device.',
      color:
        'text-indigo-600 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/20',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="sticky top-0 z-50 max-w-7xl mx-auto px-4 py-4 flex justify-end">
        <ThemeToggle />
      </div>

      <header className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-900 dark:via-gray-900 dark:to-purple-900 py-1 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm mb-6">
            <FileText className="w-4 h-4" />
            <span>Free text formatter online</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
            AI Text Cleaner & Online Text Formatter
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            Use our AI content cleaner and text formatter online to clean
            AI-generated text, format documents easily, and beautify text in one
            click. Export to PDF, DOCX, and TXT—no sign-up required.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-2">
            <p className="sr-only">
              Key actions: clean AI-generated text, format documents online,
              beautify text.
            </p>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
              <Wand2 className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Clean AI-generated text
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
              <FileText className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Format documents online
              </span>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section
          className="max-w-7xl mx-auto px-4 pt-6 pb-10"
          aria-labelledby="editor-heading"
        >
          <h2 id="editor-heading" className="sr-only">
            Format, clean & export your content
          </h2>
          <div className="mb-8 min-w-0 max-w-4xl mx-auto">
            <OutputEditor
              extended={outputExtended}
              onExtendedChange={setOutputExtended}
            />
          </div>
        </section>

        <section
          className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 py-20 px-4"
          aria-labelledby="what-it-does-heading"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2
                id="what-it-does-heading"
                className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
              >
                What it does
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                This AI text cleaner and online text formatter lets you clean
                AI-generated text, format documents online, and beautify text.
                Use the editor to format content, then export to PDF, DOCX, or
                TXT or copy with formatting.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <article
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>

            <section className="mb-16" aria-labelledby="who-its-for-heading">
              <h2
                id="who-its-for-heading"
                className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center"
              >
                Who it&apos;s for
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-center">
                Writers, students, and professionals who need to clean AI
                content, format documents, or beautify text quickly. Anyone who
                wants a free text formatter online with export to PDF, DOCX, and
                TXT without signing up.
              </p>
            </section>

            <section className="mb-16" aria-labelledby="key-features-heading">
              <h2
                id="key-features-heading"
                className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center"
              >
                Key features
              </h2>
              <ul className="max-w-2xl mx-auto space-y-3 text-gray-600 dark:text-gray-400 text-lg list-disc list-inside">
                <li>Clean text with the AI content cleaner</li>
                <li>Format content with rich-text editing</li>
                <li>Export to PDF, DOCX, and TXT</li>
                <li>Copy formatted text for pasting elsewhere</li>
                <li>Beautify text in one click</li>
                <li>Format document online with no account</li>
              </ul>
            </section>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">
                  How to use the AI text cleaner & formatter
                </h2>
                <ol className="space-y-4 text-left text-white/90 list-decimal list-inside">
                  <li>
                    <strong className="text-white">Paste or type:</strong> Add
                    your text from AI, notes, or anywhere into the editor.
                  </li>
                  <li>
                    <strong className="text-white">Clean & format:</strong> Use
                    Clean Content to remove clutter, then use the toolbar to
                    format document—headings, bold, italic, lists.
                  </li>
                  <li>
                    <strong className="text-white">Export or copy:</strong>{' '}
                    Download as PDF, DOCX, or TXT, or copy with formatting to
                    paste into Word or Google Docs.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold">
                  AI Text Cleaner & Formatter
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Clean AI-generated text, format documents online, and beautify
                text. Export to PDF, DOCX, and TXT. Free text formatter online—
                no sign-up, runs in your browser.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>AI content cleaner</li>
                <li>Text formatter online</li>
                <li>Format document</li>
                <li>Export PDF, DOCX, TXT</li>
                <li>Beautify text</li>
                <li>Copy with formatting</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <p className="text-gray-400 leading-relaxed">
                Free AI text cleaner and online text formatter. Clean text,
                format documents easily, and export to PDF, DOCX, or TXT. No
                sign-up; everything runs in your browser.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              © 2026 AI Text Cleaner & Formatter. Clean, format, and export text
              online.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
