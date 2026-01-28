import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

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
    const plainText = htmlToPlainText(content);
    const pdf = new jsPDF();
    
    // Set font
    pdf.setFont('helvetica');
    pdf.setFontSize(12);
    
    // Split text into lines that fit the page width
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    
    const lines = pdf.splitTextToSize(plainText, maxWidth);
    let y = margin;
    const lineHeight = 7;
    
    lines.forEach((line: string) => {
      if (y + lineHeight > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(line, margin, y);
      y += lineHeight;
    });
    
    pdf.save(filename);
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
