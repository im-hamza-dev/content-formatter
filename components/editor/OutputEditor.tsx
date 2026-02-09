'use client';

import dynamic from 'next/dynamic';
import { PanelRightOpen, PanelLeftClose } from 'lucide-react';
import { useContentStore } from '@/store/contentStore';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface OutputEditorProps {
  extended?: boolean;
  onExtendedChange?: (extended: boolean) => void;
}

export function OutputEditor({
  extended = false,
  onExtendedChange,
}: OutputEditorProps) {
  const { formattedContent, setFormattedContent } = useContentStore();

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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden h-full flex flex-col">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between gap-2 shrink-0">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Output: Cleaned Content
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Edit with formatting tools
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
      <div className="p-4 flex-1 min-h-0 flex flex-col">
        <div className="quill-wrapper flex-1 min-h-0 flex flex-col">
          <ReactQuill
            theme="snow"
            value={formattedContent}
            onChange={setFormattedContent}
            modules={modules}
            formats={formats}
            placeholder="Your cleaned content will appear here..."
            className="h-80"
          />
        </div>
      </div>
    </div>
  );
}
