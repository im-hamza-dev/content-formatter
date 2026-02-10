'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { PanelRightOpen, PanelLeftClose, Sparkles } from 'lucide-react';
import { useContentStore } from '@/store/contentStore';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function stripHtmlToText(html: string): string {
  if (typeof document === 'undefined') return html.replace(/<[^>]*>/g, ' ');
  const div = document.createElement('div');
  div.innerHTML = html;
  return (div.textContent || div.innerText || '').trim();
}

interface OutputEditorProps {
  extended?: boolean;
  onExtendedChange?: (extended: boolean) => void;
}

export function OutputEditor({
  extended = false,
  onExtendedChange,
}: OutputEditorProps) {
  const { formattedContent, setFormattedContent, cleanedContent } = useContentStore();
  const [formatting, setFormatting] = useState(false);
  const [formatError, setFormatError] = useState<string | null>(null);

  const handleFormatContent = async () => {
    const contentToFormat = cleanedContent?.trim() || stripHtmlToText(formattedContent);
    if (!contentToFormat) {
      setFormatError('Add or paste content in the input box first, then click Format Content.');
      return;
    }
    setFormatError(null);
    setFormatting(true);
    try {
      const res = await fetch('/api/format', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: contentToFormat }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Format failed');
      if (data.formatted) setFormattedContent(data.formatted);
    } catch (e) {
      setFormatError(e instanceof Error ? e.message : 'Format request failed.');
    } finally {
      setFormatting(false);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['code-block'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'code-block',
  ];

  return (
    <div className="tool-card-glow bg-white dark:bg-gray-800 rounded-2xl border border-blue-200/50 dark:border-blue-500/20 overflow-hidden h-full flex flex-col">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 px-5 py-3.5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between gap-2 shrink-0">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Output: Format document & export
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Content formatting toolbar then export PDF, DOCX, or TXT
          </p>
        </div>
        {onExtendedChange && (
          <button
            type="button"
            onClick={() => onExtendedChange(!extended)}
            className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-black/20 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            title={extended ? 'Reset to 50/50' : 'Extend output (70% width)'}
            aria-label={extended ? 'Reset layout' : 'Extend output'}
          >
            {extended ? (
              <PanelLeftClose className="w-5 h-5" />
            ) : (
              <PanelRightOpen className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      <div className="px-5 pb-2 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleFormatContent}
          disabled={formatting}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm shadow-sm hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 disabled:pointer-events-none transition-all"
          title="Format content with AI (Gemini)"
        >
          <Sparkles className="w-4 h-4" />
          {formatting ? 'Formatting…' : 'Format Content'}
        </button>
        {formatError && (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {formatError}
          </p>
        )}
      </div>
      <div className="p-5 flex-1 min-h-0 flex flex-col pt-0">
        <div className="quill-wrapper flex-1 min-h-0 flex flex-col">
          <ReactQuill
            theme="snow"
            value={formattedContent}
            onChange={setFormattedContent}
            modules={modules}
            formats={formats}
            placeholder="Formatted document will appear here. Use the toolbar to format document, then export."
            className="min-h-[420px]"
          />
        </div>
      </div>
    </div>
  );
}
