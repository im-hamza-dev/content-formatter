import { create } from 'zustand';
import { cleanText } from '@/lib/cleanText';
import { cleanHtmlContent, htmlToPlainText } from '@/lib/cleanHtml';

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
  cleanedContent: string;
  formattedContent: string;
  isCleaning: boolean;
  setFormattedContent: (content: string) => void;
  /** Clean content from plain text (converts to HTML, loses formatting). */
  cleanContentFromText: (plainText: string) => void;
  /** Clean content in place: only remove symbols/icons and double lines; keeps formatting. */
  cleanContentFromHtml: (html: string) => void;
}

export const useContentStore = create<ContentStore>((set) => ({
  cleanedContent: '',
  formattedContent: '',
  isCleaning: false,

  setFormattedContent: (content: string) => {
    set({ formattedContent: content });
  },

  cleanContentFromText: (plainText: string) => {
    const text = plainText.trim();
    if (!text) {
      set({ cleanedContent: '', formattedContent: '' });
      return;
    }
    set({ isCleaning: true });
    try {
      const cleaned = cleanText(text);
      set({
        cleanedContent: cleaned,
        formattedContent: plainTextToQuillHtml(cleaned),
        isCleaning: false,
      });
    } catch (error) {
      console.error('Error cleaning content:', error);
      set({ isCleaning: false });
    }
  },

  cleanContentFromHtml: (html: string) => {
    if (!html?.trim()) return;
    set({ isCleaning: true });
    try {
      const cleanedHtml = cleanHtmlContent(html);
      set({
        formattedContent: cleanedHtml,
        cleanedContent: htmlToPlainText(cleanedHtml),
        isCleaning: false,
      });
    } catch (error) {
      console.error('Error cleaning HTML content:', error);
      set({ isCleaning: false });
    }
  },
}));
