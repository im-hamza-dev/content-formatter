'use client';

import { useContentStore } from '@/store/contentStore';

export function InputBox() {
  const { rawInput, setRawInput } = useContentStore();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Input: Paste AI Content</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Your messy AI-generated text</p>
      </div>
      <div className="p-4">
        <textarea
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          placeholder="Paste your AI-generated content here... 🤖✨

Try pasting text with emojis, markdown formatting, or messy structure!"
          className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>
    </div>
  );
}
