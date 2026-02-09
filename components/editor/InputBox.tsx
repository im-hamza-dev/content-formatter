'use client';

import { useContentStore } from '@/store/contentStore';

export function InputBox() {
  const { rawInput, setRawInput } = useContentStore();

  return (
    <div className="tool-card-glow bg-white dark:bg-gray-800 rounded-2xl border border-blue-200/50 dark:border-blue-500/20 overflow-hidden h-full flex flex-col">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-5 py-3.5 border-b border-gray-200 dark:border-gray-700 shrink-0">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Input: Paste AI Content</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Your messy AI-generated text</p>
      </div>
      <div className="p-5 flex-1 min-h-0 flex flex-col">
        <textarea
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          placeholder="Paste your AI-generated content here... 🤖✨

Try pasting text with emojis, markdown formatting, or messy structure!"
          className="w-full min-h-[420px] p-5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400/50 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] resize-none font-mono text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-shadow"
        />
      </div>
    </div>
  );
}
