# Content Formatting Tool

A free content formatting tool (like Google Docs) to format document with rich text, clean AI-generated text via a built-in ai content cleaner, and export to PDF, DOCX, or TXT. No sign-up; runs in the browser.

## Features

- **Content Formatting**: Format document with headings, bold, italic, lists, code blocks rich-text editor built in
- **Export**: Export formatted document as PDF, DOCX, or TXT
- **AI Content Cleaner**: Clean text from AI (ai text cleaner / ai text remover) emojis, markdown stripped, structure kept
- **Dark/Light Theme**: Full theme support with next-themes
- **Privacy-First**: All processing happens client-side - your data never leaves your device
- **Mobile Responsive**: Fully responsive design that works on all devices

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (State management)
- **React-Quill** (Rich text editor)
- **next-themes** (Theme management)
- **jsPDF** (PDF export)
- **docx** (DOCX export)
- **file-saver** (File downloads)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
/app
  page.tsx              # Main single-page UI
  layout.tsx            # Root layout with theme provider
  globals.css           # Global styles with theme variables

/components
  /editor
    InputBox.tsx        # Input textarea component
    OutputEditor.tsx   # Quill editor wrapper
  /actions
    ExportActions.tsx   # Copy/export buttons
  ThemeProvider.tsx     # Theme provider wrapper
  ThemeToggle.tsx       # Theme toggle button

/hooks
  useContentCleaner.ts # Hook for cleaning logic
  useFormatter.ts      # Hook for formatting operations

/store
  contentStore.ts      # Zustand store

/lib
  cleanText.ts         # Rule-based cleaner implementation
  exportUtils.ts      # PDF/DOCX/TXT export helpers
```

## How It Works

1. **Paste Content**: Users paste AI-generated content into the input box
2. **Automatic Cleaning**: Content is automatically cleaned using rule-based algorithms:
   - Remove emojis (Unicode ranges)
   - Remove decorative symbols
   - Collapse repeated separators
   - Normalize spacing and line breaks
   - Strip markdown syntax
   - Normalize bullet points
   - Remove empty lines
3. **Format**: Users can further format cleaned content using the rich text editor
4. **Export**: Users can copy or export content as PDF, DOCX, or TXT

## SEO Keywords

This app is optimized for:

- ai cleaner, ai content cleaner, ai text cleaner, ai text remover
- clean ai, clean text
- content formatting, format document
- google docs

## License

MIT
