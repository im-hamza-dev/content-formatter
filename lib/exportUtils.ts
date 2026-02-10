import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  LevelFormat,
  type INumberingOptions,
} from 'docx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/** Docx run options for a single segment (bold/italic/underline + text or break) */
interface RunSpec {
  text?: string;
  break?: number;
  bold?: boolean;
  italics?: boolean;
  underline?: { type?: string };
}

/**
 * Export utilities for PDF, DOCX, and TXT formats
 */

/**
 * Convert HTML to plain text (collapsed, no structure)
 */
function htmlToPlainText(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

const BLOCK_TAGS = new Set(['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'PRE', 'TR', 'HR', 'BLOCKQUOTE']);

/**
 * Convert HTML to plain text while preserving line/paragraph breaks so DOCX export keeps structure.
 * Inserts newlines after <br> and after block elements (p, div, h1, etc.).
 */
function htmlToPlainTextWithBreaks(html: string): string {
  const div = document.createElement('div');
  div.innerHTML = html;

  function walk(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent || '';
    if (node.nodeType !== Node.ELEMENT_NODE) return '';
    const el = node as HTMLElement;
    const tag = el.tagName;
    if (tag === 'BR') return '\n';
    let s = '';
    for (const child of el.childNodes) s += walk(child);
    if (BLOCK_TAGS.has(tag) && s) s += '\n';
    return s;
  }

  let out = '';
  for (const child of div.childNodes) out += walk(child);
  return out.replace(/\n{3,}/g, '\n\n').trim();
}

const HEADING_LEVELS: Record<string, keyof typeof HeadingLevel> = {
  H1: 'HEADING_1',
  H2: 'HEADING_2',
  H3: 'HEADING_3',
  H4: 'HEADING_4',
  H5: 'HEADING_5',
  H6: 'HEADING_6',
};

/**
 * Collect inline runs (text + bold/italic/underline, or line break) from a DOM node.
 * Used for paragraph content.
 */
type InlineFormat = { bold?: boolean; italics?: boolean; underline?: boolean };

function toRunSpec(f: InlineFormat, text: string): RunSpec {
  return {
    text,
    bold: f.bold,
    italics: f.italics,
    underline: f.underline ? { type: 'single' } : undefined,
  };
}

function collectRuns(node: Node, format: InlineFormat = {}): RunSpec[] {
  const out: RunSpec[] = [];
  function run(node: Node, f: InlineFormat) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || '';
      if (text) out.push(toRunSpec(f, text));
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as HTMLElement;
    const tag = el.tagName;
    if (tag === 'BR') {
      out.push({ break: 1 });
      return;
    }
    const next = { ...f };
    if (tag === 'STRONG' || tag === 'B') next.bold = true;
    else if (tag === 'EM' || tag === 'I') next.italics = true;
    else if (tag === 'U') next.underline = true;
    for (const child of el.childNodes) run(child, next);
  }
  run(node, format);
  return out;
}

/** Merge adjacent RunSpecs that only differ by text (so we don't split every character). */
function mergeRuns(specs: RunSpec[]): RunSpec[] {
  const merged: RunSpec[] = [];
  for (const s of specs) {
    if (s.break !== undefined) {
      merged.push(s);
      continue;
    }
    const last = merged[merged.length - 1];
    if (
      last &&
      last.text !== undefined &&
      s.text !== undefined &&
      last.bold === s.bold &&
      last.italics === s.italics &&
      last.underline === s.underline
    ) {
      last.text = (last.text || '') + (s.text || '');
    } else {
      merged.push({ ...s });
    }
  }
  return merged;
}

function runsToParagraphChildren(specs: RunSpec[]) {
  return mergeRuns(specs).map((s) => {
    if (s.break) return new TextRun({ break: s.break });
    return new TextRun({
      text: s.text || ' ',
      bold: s.bold,
      italics: s.italics,
      underline: s.underline ? {} : undefined,
    });
  });
}

/**
 * Convert Quill HTML to docx Paragraph[] and optional numbering config.
 * Preserves paragraphs, line breaks, bold, italic, underline, headings, bullet and numbered lists.
 */
function htmlToDocxBlocks(html: string): { paragraphs: Paragraph[]; numbering?: INumberingOptions } {
  const div = document.createElement('div');
  div.innerHTML = html;
  const paragraphs: Paragraph[] = [];
  let hasNumberedList = false;

  function blockToParagraph(block: Element, opts: { bullet?: boolean; numbering?: boolean; heading?: keyof typeof HeadingLevel } = {}) {
    const runs = collectRuns(block);
    const children = runsToParagraphChildren(runs);
    if (opts.numbering) hasNumberedList = true;
    const paraOpts = {
      children: children.length ? children : [new TextRun({ text: ' ' })],
      ...(opts.heading && { heading: HeadingLevel[opts.heading] }),
      ...(opts.bullet && { bullet: { level: 0 } }),
      ...(opts.numbering && { numbering: { reference: 'decimal', level: 0 } }),
    };
    return new Paragraph(paraOpts);
  }

  /** Quill may use <ol data-list="bullet"> or class ql-bullet for bullet lists; standard HTML uses <ul>/<ol>. */
  function isBulletList(el: Element): boolean {
    const listType = el.getAttribute?.('data-list') ?? el.getAttribute?.('data-list-type');
    if (listType === 'bullet') return true;
    if (listType === 'ordered') return false;
    const cls = (el.getAttribute?.('class') ?? '').toLowerCase();
    if (cls.includes('ql-bullet')) return true;
    if (cls.includes('ql-indent') && !cls.includes('ordered')) return true;
    return el.tagName === 'UL';
  }

  function processNode(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const t = (node.textContent || '').trim();
      if (t) paragraphs.push(new Paragraph({ children: [new TextRun({ text: t })] }));
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as HTMLElement;
    const tag = el.tagName;
    if (tag === 'UL' || tag === 'OL') {
      const bullet = isBulletList(el);
      el.querySelectorAll(':scope > li').forEach((li) =>
        paragraphs.push(blockToParagraph(li, bullet ? { bullet: true } : { numbering: true }))
      );
      return;
    }
    if (tag === 'DIV') {
      el.childNodes.forEach((c) => processNode(c));
      return;
    }
    if (tag === 'P' || tag === 'PRE' || tag === 'BLOCKQUOTE') {
      paragraphs.push(blockToParagraph(el));
      return;
    }
    if (HEADING_LEVELS[tag]) {
      paragraphs.push(blockToParagraph(el, { heading: HEADING_LEVELS[tag] }));
      return;
    }
    if (tag === 'LI') {
      const list = el.closest('ul') ?? el.closest('ol');
      if (list) {
        const bullet = isBulletList(list);
        paragraphs.push(blockToParagraph(el, bullet ? { bullet: true } : { numbering: true }));
      } else {
        paragraphs.push(blockToParagraph(el));
      }
    }
  }

  for (const child of div.childNodes) processNode(child);

  // If we only have block elements that don't expose direct children (e.g. raw text), fallback: treat whole as one block
  if (paragraphs.length === 0 && div.textContent?.trim()) {
    paragraphs.push(blockToParagraph(div));
  }

  const numbering: INumberingOptions | undefined = hasNumberedList
    ? ({
        config: [
          {
            reference: 'decimal',
            levels: [{ level: 0, format: LevelFormat.DECIMAL }],
          },
        ],
      } as INumberingOptions)
    : undefined;

  return { paragraphs, numbering };
}

/**
 * Remove oklch() color functions from HTML/CSS to make it compatible with html2canvas
 */
function sanitizeColorsForPDF(html: string): string {
  // Remove any inline styles with oklch colors
  return html.replace(/oklch\([^)]+\)/gi, '#111827'); // Replace with default text color
}

/**
 * Copy formatted content (HTML) to clipboard so pasting preserves formatting (e.g. in Word, Google Docs).
 * Writes both text/html and text/plain so rich editors use HTML and plain fields get stripped text.
 */
export async function copyFormattedContent(html: string): Promise<void> {
  const plain = htmlToPlainText(html);
  try {
    if (navigator.clipboard && typeof navigator.clipboard.write === 'function') {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([plain], { type: 'text/plain' }),
        }),
      ]);
      return;
    }
  } catch {
    // Fall through to writeText fallback
  }
  try {
    await navigator.clipboard.writeText(html);
  } catch {
    const textArea = document.createElement('textarea');
    textArea.value = html;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}

/**
 * Copy plain text to clipboard
 */
export async function copyPlainText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}

/**
 * Export content as PDF
 */
export async function exportAsPDF(content: string, filename: string = 'cleaned-content.pdf'): Promise<void> {
  try {
    // More reliable than jsPDF.html(): render with html2canvas, then paginate into jsPDF.
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' });

    const wrapper = document.createElement('div');
    try {
      wrapper.style.position = 'fixed';
      wrapper.style.left = '-10000px';
      wrapper.style.top = '0';
      wrapper.style.width = '794px'; // ~A4 width in px at 96dpi
      wrapper.style.padding = '32px';
      wrapper.style.background = '#ffffff';
      wrapper.style.color = '#111827';
      wrapper.style.fontFamily = 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial';
      wrapper.style.fontSize = '14px';
      wrapper.style.lineHeight = '1.5';
      // html2canvas cannot parse oklch(). Our app theme uses oklch() CSS variables.
      // Override the variables on this subtree to hex values so computed styles are RGB/hex.
      wrapper.style.setProperty('--color-white', '#ffffff');
      wrapper.style.setProperty('--color-gray-50', '#f9fafb');
      wrapper.style.setProperty('--color-gray-100', '#f3f4f6');
      wrapper.style.setProperty('--color-gray-200', '#e5e7eb');
      wrapper.style.setProperty('--color-gray-300', '#d1d5db');
      wrapper.style.setProperty('--color-gray-400', '#9ca3af');
      wrapper.style.setProperty('--color-gray-600', '#4b5563');
      wrapper.style.setProperty('--color-gray-700', '#374151');
      wrapper.style.setProperty('--color-gray-800', '#1f2937');
      wrapper.style.setProperty('--color-gray-900', '#111827');
      wrapper.style.setProperty('--color-blue-50', '#eff6ff');
      wrapper.style.setProperty('--color-blue-100', '#dbeafe');
      wrapper.style.setProperty('--color-blue-400', '#60a5fa');
      wrapper.style.setProperty('--color-blue-500', '#3b82f6');
      wrapper.style.setProperty('--color-blue-600', '#2563eb');
      wrapper.style.setProperty('--color-blue-700', '#1d4ed8');
      wrapper.style.setProperty('--color-purple-50', '#faf5ff');
      wrapper.style.setProperty('--color-purple-100', '#f3e8ff');
      wrapper.style.setProperty('--color-purple-500', '#a855f7');
      wrapper.style.setProperty('--color-purple-600', '#9333ea');
      wrapper.style.setProperty('--color-purple-700', '#7e22ce');
      wrapper.style.setProperty('--color-green-100', '#dcfce7');
      wrapper.style.setProperty('--color-green-500', '#22c55e');
      wrapper.style.setProperty('--color-green-600', '#16a34a');
      wrapper.style.setProperty('--color-green-700', '#15803d');
      wrapper.style.setProperty('--color-yellow-100', '#fef9c3');
      wrapper.style.setProperty('--color-yellow-500', '#eab308');
      wrapper.style.setProperty('--color-yellow-600', '#ca8a04');
      wrapper.style.setProperty('--color-yellow-700', '#a16207');
      wrapper.style.setProperty('--color-pink-100', '#fce7f3');
      wrapper.style.setProperty('--color-pink-600', '#db2777');
      wrapper.style.setProperty('--color-pink-700', '#be185d');
      wrapper.style.setProperty('--color-indigo-100', '#e0e7ff');
      wrapper.style.setProperty('--color-indigo-600', '#4f46e5');
      wrapper.style.setProperty('--background', '#ffffff');
      wrapper.style.setProperty('--foreground', '#111827');

      // Create a style element with Quill editor styles using standard colors (no oklch)
      const style = document.createElement('style');
      style.textContent = `
        .ql-editor {
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
          font-size: 14px;
          line-height: 1.5;
          color: #111827;
          padding: 0;
        }
        .ql-editor h1 { font-size: 2em; font-weight: bold; margin: 0.67em 0; color: #111827; }
        .ql-editor h2 { font-size: 1.5em; font-weight: bold; margin: 0.75em 0; color: #111827; }
        .ql-editor h3 { font-size: 1.17em; font-weight: bold; margin: 0.83em 0; color: #111827; }
        .ql-editor p { margin: 1em 0; color: #111827; }
        .ql-editor strong { font-weight: bold; color: #111827; }
        .ql-editor em { font-style: italic; color: #111827; }
        .ql-editor u { text-decoration: underline; color: #111827; }
        .ql-editor ul { margin: 1em 0; padding-left: 2em; list-style-type: disc; color: #111827; }
        .ql-editor ol { margin: 1em 0; padding-left: 2em; list-style-type: decimal; color: #111827; }
        .ql-editor li { margin: 0.5em 0; color: #111827; }
        .ql-editor pre { background: #f3f4f6; padding: 1em; border-radius: 4px; margin: 1em 0; color: #111827; }
        .ql-editor code { background: #f3f4f6; padding: 2px 4px; border-radius: 2px; color: #111827; }
      `;
      document.head.appendChild(style);

      // Sanitize content to remove oklch colors that html2canvas can't parse
      const sanitizedContent = sanitizeColorsForPDF(content);
      
      // Quill content class helps lists/headings render reasonably
      wrapper.innerHTML = `<div class="ql-editor">${sanitizedContent}</div>`;
      document.body.appendChild(wrapper);

      const canvas = await html2canvas(wrapper, {
        scale: 1.5,
        useCORS: true,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc) => {
          const root = clonedDoc.documentElement;
          root.style.setProperty('--background', '#ffffff');
          root.style.setProperty('--foreground', '#111827');
        },
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 32; // Top and bottom page margin (pt) on every page
      const usableWidth = pageWidth - margin * 2;
      const usableHeight = pageHeight - margin * 2;

      // Slice so we don't cut through lines: use ~96% of page height per slice so boundaries fall between lines.
      const scale = usableWidth / canvas.width;
      const sliceHeightPx = Math.floor((usableHeight / scale) * 0.96);
      const numPages = sliceHeightPx > 0 ? Math.ceil(canvas.height / sliceHeightPx) : 1;

      const jpegQuality = 0.88;

      for (let i = 0; i < numPages; i++) {
        if (i > 0) pdf.addPage();
        const srcY = i * sliceHeightPx;
        const sliceH = Math.min(sliceHeightPx, canvas.height - srcY);
        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = sliceH;
        const ctx = sliceCanvas.getContext('2d');
        if (!ctx) continue;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
        ctx.drawImage(canvas, 0, srcY, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
        const sliceData = sliceCanvas.toDataURL('image/jpeg', jpegQuality);
        const slicePdfHeight = sliceH * scale;
        const yPos = i === 0 ? 0 : margin;
        pdf.addImage(sliceData, 'JPEG', margin, yPos, usableWidth, slicePdfHeight);
      }

      pdf.save(filename);
      
      // Clean up style element
      document.head.removeChild(style);
    } finally {
      if (wrapper.parentNode) {
        wrapper.parentNode.removeChild(wrapper);
      }
    }
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw new Error('Failed to export PDF');
  }
}

/**
 * Export content as DOCX
 */
export async function exportAsDOCX(content: string, filename: string = 'cleaned-content.docx'): Promise<void> {
  try {
    const { paragraphs, numbering } = htmlToDocxBlocks(content);
    const doc = new Document({
      numbering,
      sections: [
        {
          children: paragraphs.length ? paragraphs : [new Paragraph({ children: [new TextRun({ text: ' ' })] })],
        },
      ],
    });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, filename);
  } catch (error) {
    console.error('Error exporting DOCX:', error);
    throw new Error('Failed to export DOCX');
  }
}

/**
 * Export content as TXT
 */
export function exportAsTXT(content: string, filename: string = 'cleaned-content.txt'): void {
  try {
    const plainText = htmlToPlainText(content);
    const blob = new Blob([plainText], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, filename);
  } catch (error) {
    console.error('Error exporting TXT:', error);
    throw new Error('Failed to export TXT');
  }
}
