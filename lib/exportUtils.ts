import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Export utilities for PDF, DOCX, and TXT formats
 */

/**
 * Convert HTML to plain text
 */
function htmlToPlainText(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

/**
 * Remove oklch() color functions from HTML/CSS to make it compatible with html2canvas
 */
function sanitizeColorsForPDF(html: string): string {
  // Remove any inline styles with oklch colors
  return html.replace(/oklch\([^)]+\)/gi, '#111827'); // Replace with default text color
}

/**
 * Copy formatted content (HTML) to clipboard
 */
export async function copyFormattedContent(html: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(html);
  } catch (error) {
    // Fallback for older browsers
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
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        // If any element still ends up with unsupported colors, default it
        onclone: (clonedDoc) => {
          const root = clonedDoc.documentElement;
          root.style.setProperty('--background', '#ffffff');
          root.style.setProperty('--foreground', '#111827');
        },
      });

      const imgData = canvas.toDataURL('image/png');

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 32;
      const usableWidth = pageWidth - margin * 2;
      const usableHeight = pageHeight - margin * 2;

      const imgWidth = usableWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= usableHeight;

      while (heightLeft > 0) {
        pdf.addPage();
        // Shift the same full image up so the next slice appears on the new page
        position = margin - (imgHeight - heightLeft);
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= usableHeight;
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
    const plainText = htmlToPlainText(content);
    const paragraphs = plainText.split('\n').map(line => 
      new Paragraph({
        children: [new TextRun(line.trim() || ' ')],
      })
    );
    
    const doc = new Document({
      sections: [{
        children: paragraphs,
      }],
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
