import { create } from 'zustand';
import { cleanText } from '@/lib/cleanText';

interface ContentStore {
  rawInput: string;
  cleanedContent: string;
  formattedContent: string;
  isCleaning: boolean;
  setRawInput: (input: string) => void;
  setCleanedContent: (content: string) => void;
  setFormattedContent: (content: string) => void;
  cleanContent: () => void;
}

export const useContentStore = create<ContentStore>((set, get) => ({
  rawInput: '',
  cleanedContent: '',
  formattedContent: '',
  isCleaning: false,
  
  setRawInput: (input: string) => {
    set({ rawInput: input });
    // Auto-clean when input changes
    if (input.trim()) {
      get().cleanContent();
    } else {
      set({ cleanedContent: '', formattedContent: '' });
    }
  },
  
  setCleanedContent: (content: string) => {
    set({ cleanedContent: content, formattedContent: content });
  },
  
  setFormattedContent: (content: string) => {
    set({ formattedContent: content });
  },
  
  cleanContent: () => {
    const { rawInput } = get();
    if (!rawInput.trim()) {
      set({ cleanedContent: '', formattedContent: '' });
      return;
    }
    
    set({ isCleaning: true });
    
    try {
      const cleaned = cleanText(rawInput);
      set({ 
        cleanedContent: cleaned,
        formattedContent: cleaned,
        isCleaning: false 
      });
    } catch (error) {
      console.error('Error cleaning content:', error);
      set({ isCleaning: false });
    }
  },
}));
