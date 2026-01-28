'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useContentStore } from '@/store/contentStore';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export function OutputEditor() {
  const { formattedContent, setFormattedContent } = useContentStore();
  const quillRef = useRef<any>(null);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['code-block'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'code-block'
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Output: Cleaned Content</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Edit with formatting tools</p>
      </div>
      <div className="p-4">
        <div className="quill-wrapper">
          <ReactQuill
            ref={quillRef}
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
