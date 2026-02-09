import { useContentStore } from '@/store/contentStore';

export function useFormatter() {
  const { formattedContent, setFormattedContent } = useContentStore();

  return {
    formattedContent,
    setFormattedContent,
  };
}
