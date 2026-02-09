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
import { InputBox } from '@/components/editor/InputBox';
import { OutputEditor } from '@/components/editor/OutputEditor';
import { ExportActions } from '@/components/actions/ExportActions';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  const [outputExtended, setOutputExtended] = useState(false);
  const features = [
    {
      icon: FileEdit,
      title: 'Content Formatting',
      description:
        'Format document with headings, bold, italic, lists, and code blocks similar to Google Docs. Rich-text editor built in; no account needed.',
      color: 'text-pink-600 bg-pink-100 dark:text-pink-400 dark:bg-pink-900/20',
    },
    {
      icon: FileText,
      title: 'Format Document & Export',
      description:
        'Export your formatted content as PDF, DOCX, or TXT. Format document once and download in the format you need for reports, articles, or docs.',
      color:
        'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20',
    },
    {
      icon: Wand2,
      title: 'AI Content Cleaner',
      description:
        'Clean AI-generated text in one click: ai text cleaner removes emojis and clutter. Clean ai output from ChatGPT, Claude, or any source.',
      color:
        'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/20',
    },
    {
      icon: Scissors,
      title: 'Clean Text from Markdown',
      description:
        'Strip markdown and get clean text. Ai text remover for symbols and formatting then use content formatting to style it your way.',
      color: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20',
    },
    {
      icon: ListChecks,
      title: 'Structure & Lists',
      description:
        'Normalize bullet points and structure. Content formatting for lists and headings so your document looks professional in PDF or DOCX.',
      color:
        'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20',
    },
    {
      icon: Sparkles,
      title: 'Privacy-First',
      description:
        'All content formatting and clean text happens in your browser. Your data never leaves your device like having Google Docs offline.',
      color:
        'text-indigo-600 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/20',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-5 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end">
          <ThemeToggle />
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-900 dark:via-gray-900 dark:to-purple-900 py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm mb-6">
            <FileText className="w-4 h-4" />
            <span>Free Content Formatting Tool</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
            Format Document & Export
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Like Google Docs
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Content formatting made simple: rich-text editing, clean text from
            AI output with our ai content cleaner, and export to PDF, DOCX, or
            TXT. Format document in one place no sign-up required.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
              <FileText className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Content formatting
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Format document
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Export PDF, DOCX, TXT
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="max-w-7xl mx-auto px-4 pt-6 pb-10"
        aria-labelledby="format-document-heading"
      >
        <h2 id="format-document-heading" className="sr-only">
          Content formatting tool: format document and export to PDF, DOCX, TXT.
          Ai content cleaner for clean text.
        </h2>
        <div
          className="tool-grid mb-8 min-w-0"
          style={
            {
              '--tool-col-a': outputExtended ? '30fr' : '40fr',
              '--tool-col-b': outputExtended ? '70fr' : '60fr',
            } as React.CSSProperties
          }
        >
          <div className="min-w-0">
            <InputBox />
          </div>
          <div className="min-w-0">
            <OutputEditor
              extended={outputExtended}
              onExtendedChange={setOutputExtended}
            />
          </div>
        </div>

        <div className="mb-16">
          <ExportActions />
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Content Formatting & Export All in One Place
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Format document with rich text, clean text from AI with our ai
              content cleaner, and export to PDF, DOCX, or TXT. No sign-up like
              a free, private Google Docs for formatting and export.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
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
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-4">
                How to Format Document & Export
              </h3>
              <div className="space-y-4 text-left text-white/90">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <p>
                    <strong className="text-white">Paste or type:</strong> Add
                    your text from AI (we’ll clean text with our ai content
                    cleaner), from notes, or from anywhere. Paste into the input
                    box.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <p>
                    <strong className="text-white">Content formatting:</strong>{' '}
                    Use the editor to format document: headings, bold, italic,
                    lists, code. Clean ai clutter is removed automatically so
                    you get clean text.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <p>
                    <strong className="text-white">Format document:</strong>{' '}
                    Adjust structure and style like in Google Docs. No account
                    needed content formatting happens right in your browser.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <p>
                    <strong className="text-white">Export:</strong> Download
                    your document as PDF, DOCX, or TXT. Format document once and
                    export in the format you need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold">
                  Content Formatting Tool
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Format document and export to PDF, DOCX, or TXT. Content
                formatting like Google Docs, plus ai content cleaner to clean
                text from AI free and private.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Content formatting</li>
                <li>Format document</li>
                <li>Export PDF, DOCX, TXT</li>
                <li>AI content cleaner</li>
                <li>AI text cleaner / clean text</li>
                <li>Google Docs–style editor</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <p className="text-gray-400 leading-relaxed">
                Free content formatting tool to format document and export.
                Clean ai text with our ai text remover, then use content
                formatting and download in your preferred format. No sign-up;
                runs in your browser.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              © 2026 Content Formatting Tool. Format document, clean text,
              export PDF DOCX TXT.
            </p>
            <p className="mt-2 text-sm">
              ai cleaner, ai content cleaner, ai text cleaner, ai text remover,
              clean ai, clean text, content formatting, format document, google
              docs
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
