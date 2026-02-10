import { lightCleanText } from '@/lib/cleanText';

/**
 * Clean HTML in place: only remove symbols, icons, and collapse double/multiple newlines
 * inside text nodes. Preserves all tags and formatting (headings, bold, lists, etc.).
 * Must run in browser (uses DOM).
 */
export function cleanHtmlContent(html: string): string {
  if (typeof document === 'undefined' || !html?.trim()) return html;
  const div = document.createElement('div');
  div.innerHTML = html;

  function walk(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || '';
      const cleaned = lightCleanText(text);
      if (cleaned !== text) node.textContent = cleaned;
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    for (const child of Array.from(node.childNodes)) walk(child);
  }

  walk(div);
  return div.innerHTML;
}

/** Get plain text from HTML without DOM (for store / Copy plain). */
export function htmlToPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>|<\/div>|<\/li>|<\/h[1-6]>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
