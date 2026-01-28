import { create } from 'zustand';
import { cleanText } from '@/lib/cleanText';

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Quill expects HTML. Convert plain text into HTML while preserving:
 * - paragraph breaks (blank lines) => <p>...</p>
 * - line breaks within a paragraph => <br/>
 * - leading spaces are not perfectly preservable in HTML; users can use the editor for monospace/code blocks if needed.
 */
function plainTextToQuillHtml(text: string) {
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const escaped = escapeHtml(normalized);

  // Split into paragraphs by two or more newlines (preserve exact count visually by inserting empty paragraphs)
  const parts = escaped.split(/\n{2,}/);
  const html = parts
    .map((p) => {
      const withBr = p.replace(/\n/g, '<br/>');
      return `<p>${withBr || '<br/>'}</p>`;
    })
    .join('');

  return html;
}

interface ContentStore {
  rawInput: string;
  cleanedContent: string;
  formattedContent: string;
  isCleaning: boolean;
  setRawInput: (input: string) => void;
  setCleanedContent: (content: string) => void;
  setFormattedContent: (content: string) => void;
  cleanContent: () => void;
}

export const useContentStore = create<ContentStore>((set, get) => ({
  rawInput: '',
  cleanedContent: '',
  formattedContent: '',
  isCleaning: false,
  
  setRawInput: (input: string) => {
    set({ rawInput: input });
    // Auto-clean when input changes
    if (input.trim()) {
      get().cleanContent();
    } else {
      set({ cleanedContent: '', formattedContent: '' });
    }
  },
  
  setCleanedContent: (content: string) => {
    set({ cleanedContent: content, formattedContent: plainTextToQuillHtml(content) });
  },
  
  setFormattedContent: (content: string) => {
    set({ formattedContent: content });
  },
  
  cleanContent: () => {
    const { rawInput } = get();
    if (!rawInput.trim()) {
      set({ cleanedContent: '', formattedContent: '' });
      return;
    }
    
    set({ isCleaning: true });
    
    try {
      const cleaned = cleanText(rawInput);
      set({ 
        cleanedContent: cleaned,
        formattedContent: plainTextToQuillHtml(cleaned),
        isCleaning: false 
      });
    } catch (error) {
      console.error('Error cleaning content:', error);
      set({ isCleaning: false });
    }
  },
}));
