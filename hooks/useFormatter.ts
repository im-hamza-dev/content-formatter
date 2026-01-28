import { useContentStore } from '@/store/contentStore';

/**
 * Hook for formatting operations
 */
export function useFormatter() {
  const { formattedContent, setFormattedContent } = useContentStore();

  return {
    formattedContent,
    setFormattedContent,
  };
}
