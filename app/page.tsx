'use client';

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
  const features = [
    {
      icon: Zap,
      title: 'Real-Time Processing',
      description:
        'Watch your content transform instantly as you type or paste. No buttons to press, no waiting - just instant, clean results.',
      color:
        'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20',
    },
    {
      icon: Wand2,
      title: 'AI Content Cleaner',
      description:
        'Remove all the unnecessary formatting, emojis, and clutter that AI models often add to their responses.',
      color:
        'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/20',
    },
    {
      icon: Scissors,
      title: 'Strip Markdown',
      description:
        'Convert markdown-formatted text to clean, plain text. Remove all asterisks, headers, and formatting symbols.',
      color: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20',
    },
    {
      icon: ListChecks,
      title: 'Normalize Bullet Points',
      description:
        'Transform paragraphs into organized bullet points. Perfect for creating lists and structured content.',
      color:
        'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20',
    },
    {
      icon: FileEdit,
      title: 'Content Formatting',
      description:
        'Use the built-in rich text editor to further format your cleaned content with bold, italic, lists, and more.',
      color: 'text-pink-600 bg-pink-100 dark:text-pink-400 dark:bg-pink-900/20',
    },
    {
      icon: Sparkles,
      title: 'Privacy-First',
      description:
        'All processing happens in your browser. Your data never leaves your device - completely private and secure.',
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

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-900 dark:via-gray-900 dark:to-purple-900 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Free AI Content Cleaner Tool</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
            Clean AI-Generated Content
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Instantly
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Remove emojis, strip markdown, and format AI output into clean,
            professional text. Real-time processing with built-in content
            formatting tools.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Real-time cleaning
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
              <FileText className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Format & edit output
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Privacy-first
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            AI Text Cleaner & Formatter
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Paste your AI-generated content below and watch it transform in
            real-time. Edit the output with our built-in formatting tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <InputBox />
          <OutputEditor />
        </div>

        <div className="mb-16">
          <ExportActions />
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Powerful Features for Clean Content
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Everything you need to transform messy AI outputs into
              professional, clean text. Perfect for content creators, writers,
              and anyone working with AI tools.
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
                How to Use AI Content Cleaner
              </h3>
              <div className="space-y-4 text-left text-white/90">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <p>
                    <strong className="text-white">Paste your content:</strong>{' '}
                    Copy any AI-generated text from ChatGPT, Claude, Gemini, or
                    any other AI tool and paste it into the input box.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <p>
                    <strong className="text-white">Automatic cleaning:</strong>{' '}
                    Watch as your content is automatically cleaned - emojis
                    removed, markdown stripped, and formatting normalized.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <p>
                    <strong className="text-white">Edit & format:</strong> Use
                    the rich text editor toolbar to further format your cleaned
                    content. Add bold, italic, lists, and more.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <p>
                    <strong className="text-white">Copy or export:</strong> Copy
                    your formatted content or export it as PDF, DOCX, or TXT
                    file.
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
                <Sparkles className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold">AI Cleaner</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The best free tool to clean, format, and polish AI-generated
                content. Transform messy AI outputs into professional text
                instantly.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>AI Content Cleaner</li>
                <li>AI Text Cleaner</li>
                <li>Remove Emojis</li>
                <li>Strip Markdown</li>
                <li>Content Formatting</li>
                <li>Document Formatter</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <p className="text-gray-400 leading-relaxed">
                This tool helps you clean text from ChatGPT, Claude, Gemini, and
                other AI assistants. All processing happens in your browser -
                your data never leaves your device.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              © 2026 AI Content Cleaner. Free tool for cleaning AI-generated
              text.
            </p>
            <p className="mt-2 text-sm">
              Keywords: ai cleaner, ai content cleaner, ai text cleaner, ai text
              remover, clean ai, clean text, content formatting, format document
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
