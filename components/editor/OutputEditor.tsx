'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  Eraser,
  Download,
  ChevronDown,
  FileText,
  File,
  FileCode,
  Copy,
  Check,
} from 'lucide-react';
import { useContentStore } from '@/store/contentStore';
import {
  copyFormattedContent,
  exportAsPDF,
  exportAsDOCX,
  exportAsTXT,
} from '@/lib/exportUtils';
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
  const {
    formattedContent,
    setFormattedContent,
    cleanedContent,
    cleanContentFromHtml,
    isCleaning,
  } = useContentStore();
  const [formatting, setFormatting] = useState(false);
  const [formatError, setFormatError] = useState<string | null>(null);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!downloadOpen) return;
    const close = (e: MouseEvent) => {
      if (
        downloadRef.current &&
        !downloadRef.current.contains(e.target as Node)
      )
        setDownloadOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [downloadOpen]);

  const handleCleanContent = () => {
    setFormatError(null);
    cleanContentFromHtml(formattedContent);
  };

  const hasContent = formattedContent.trim().length > 0;

  const handleExportPDF = async () => {
    setDownloadOpen(false);
    try {
      await exportAsPDF(formattedContent);
    } catch {
      setFormatError('Failed to export PDF.');
    }
  };
  const handleExportDOCX = async () => {
    setDownloadOpen(false);
    try {
      await exportAsDOCX(formattedContent);
    } catch {
      setFormatError('Failed to export DOCX.');
    }
  };
  const handleExportTXT = () => {
    setDownloadOpen(false);
    try {
      exportAsTXT(cleanedContent);
    } catch {
      setFormatError('Failed to export TXT.');
    }
  };
  const handleCopyFormatted = async () => {
    setDownloadOpen(false);
    await copyFormattedContent(formattedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormatContent = async () => {
    const contentToFormat =
      cleanedContent?.trim() || stripHtmlToText(formattedContent);
    if (!contentToFormat) {
      setFormatError(
        'Paste content in the editor first, then use Clean Content or Format Content.',
      );
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
            Format, clean & export
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Paste here, then format with the toolbar, clean symbols and extra lines, and export or copy as PDF, DOCX, or text.
          </p>
        </div>
      </div>
      <div className="px-5 py-4 flex flex-wrap items-center justify-start gap-2">
        <button
          type="button"
          onClick={handleCleanContent}
          disabled={isCleaning}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white font-medium text-sm shadow-sm disabled:opacity-60 disabled:pointer-events-none transition-all"
          title="Clean content (remove emojis, normalize spacing, etc.)"
        >
          <Eraser className="w-4 h-4" />
          {isCleaning ? 'Cleaning…' : 'Clean Content'}
        </button>

        <button
          type="button"
          onClick={handleCopyFormatted}
          disabled={!hasContent}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium text-sm shadow-sm disabled:opacity-60 disabled:pointer-events-none transition-all"
          title="Copy formatted content"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {copied ? 'Copied!' : 'Copy'}
        </button>

        <div className="relative" ref={downloadRef}>
          <button
            type="button"
            onClick={() => setDownloadOpen((o) => !o)}
            disabled={!hasContent}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white font-medium text-sm shadow-sm disabled:opacity-60 disabled:pointer-events-none transition-all"
            title="Download as PDF, DOCX, or Text"
          >
            <Download className="w-4 h-4" />
            Download
            <ChevronDown className="w-4 h-4" />
          </button>
          {downloadOpen && (
            <div className="absolute left-0 top-full z-10 mt-1 min-w-[160px] rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg py-1">
              <button
                type="button"
                onClick={handleExportPDF}
                className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FileText className="w-4 h-4 text-red-500 shrink-0" />
                PDF
              </button>
              <button
                type="button"
                onClick={handleExportDOCX}
                className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <File className="w-4 h-4 text-blue-500 shrink-0" />
                DOCX
              </button>
              <button
                type="button"
                onClick={handleExportTXT}
                className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FileCode className="w-4 h-4 text-gray-500 shrink-0" />
                Text
              </button>
            </div>
          )}
        </div>

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
            placeholder="Paste your content here. Click Clean Content to clean text, or Format Content for AI formatting. Then use the toolbar and export."
            className="min-h-[420px]"
          />
        </div>
      </div>
    </div>
  );
}
