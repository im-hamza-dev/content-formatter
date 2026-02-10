import { useContentStore } from '@/store/contentStore';

export function useContentCleaner() {
  const {
    cleanedContent,
    formattedContent,
    isCleaning,
    setFormattedContent,
    cleanContentFromText,
    cleanContentFromHtml,
  } = useContentStore();

  return {
    cleanedContent,
    formattedContent,
    isCleaning,
    setFormattedContent,
    cleanContentFromText,
    cleanContentFromHtml,
  };
}
