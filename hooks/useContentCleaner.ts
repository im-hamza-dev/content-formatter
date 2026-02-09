import { useContentStore } from '@/store/contentStore';

export function useContentCleaner() {
  const {
    rawInput,
    cleanedContent,
    formattedContent,
    isCleaning,
    setRawInput,
    setCleanedContent,
    setFormattedContent,
    cleanContent,
  } = useContentStore();

  return {
    rawInput,
    cleanedContent,
    formattedContent,
    isCleaning,
    setRawInput,
    setCleanedContent,
    setFormattedContent,
    cleanContent,
  };
}
