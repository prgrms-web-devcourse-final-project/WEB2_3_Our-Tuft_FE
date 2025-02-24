import { create } from "zustand";

interface ChatStore {
  chatMessages: { id: string; text: string }[];
  currentMessage: string;
  setChatMessages: (messages: { id: string; text: string }[]) => void;
  setCurrentMessage: (message: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chatMessages: [],
  currentMessage: "",
  setChatMessages: (messages) => set({ chatMessages: messages }),
  setCurrentMessage: (message) => set({ currentMessage: message }),
}));
