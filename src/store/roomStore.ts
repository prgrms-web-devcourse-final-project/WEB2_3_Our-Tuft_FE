import { create } from "zustand";

interface booleanState {
  isHost: boolean;
  isQuizisReady: boolean;
  setIsHost: (val: boolean) => void;
  setIsQuizisReady: (val: boolean) => void;
}
export const useIsRoomStore = create<booleanState>((set) => ({
  isHost: false,
  isQuizisReady: false,
  setIsHost: (val) => set({ isHost: val }),
  setIsQuizisReady: (val) => set({ isQuizisReady: val }),
}));
