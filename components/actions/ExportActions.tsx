'use client';

import { useState } from 'react';
import { Copy, Check, Download, FileText, File, FileCode } from 'lucide-react';
import { useContentStore } from '@/store/contentStore';
import {
  copyFormattedContent,
  copyPlainText,
  exportAsPDF,
  exportAsDOCX,
  exportAsTXT,
} from '@/lib/exportUtils';

export function ExportActions() {
  const { formattedContent, cleanedContent } = useContentStore();
  const [copied, setCopied] = useState(false);
  const [copiedPlain, setCopiedPlain] = useState(false);

  const handleCopyFormatted = async () => {
    await copyFormattedContent(formattedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPlain = async () => {
    await copyPlainText(cleanedContent);
    setCopiedPlain(true);
    setTimeout(() => setCopiedPlain(false), 2000);
  };

  const handleExportPDF = async () => {
    try {
      await exportAsPDF(formattedContent);
    } catch (error) {
      alert('Failed to export PDF. Please try again.');
    }
  };

  const handleExportDOCX = async () => {
    try {
      await exportAsDOCX(formattedContent);
    } catch (error) {
      alert('Failed to export DOCX. Please try again.');
    }
  };

  const handleExportTXT = () => {
    try {
      exportAsTXT(cleanedContent);
    } catch (error) {
      alert('Failed to export TXT. Please try again.');
    }
  };

  const hasContent = formattedContent.trim().length > 0;

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        onClick={handleCopyFormatted}
        disabled={!hasContent}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        title="Copy formatted content"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span>Copy Formatted</span>
          </>
        )}
      </button>

      <button
        onClick={handleCopyPlain}
        disabled={!hasContent}
        className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        title="Copy plain text"
      >
        {copiedPlain ? (
          <>
            <Check className="w-4 h-4" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span>Copy Plain Text</span>
          </>
        )}
      </button>

      <button
        onClick={handleExportPDF}
        disabled={!hasContent}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        title="Export as PDF"
      >
        <FileText className="w-4 h-4" />
        <span>Export PDF</span>
      </button>

      <button
        onClick={handleExportDOCX}
        disabled={!hasContent}
        className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        title="Export as DOCX"
      >
        <File className="w-4 h-4" />
        <span>Export DOCX</span>
      </button>

      <button
        onClick={handleExportTXT}
        disabled={!hasContent}
        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        title="Export as TXT"
      >
        <FileCode className="w-4 h-4" />
        <span>Export TXT</span>
      </button>
    </div>
  );
}
