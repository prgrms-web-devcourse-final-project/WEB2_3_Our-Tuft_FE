import { create } from "zustand";

interface booleanState {
  isHost: boolean;
  isQuizisReady: boolean;
  isAllReady: boolean;
  setIsHost: (val: boolean) => void;
  setIsQuizisReady: (val: boolean) => void;
  setAsAllReady: (val: boolean) => void;
}
export const useIsRoomStore = create<booleanState>((set) => ({
  isHost: false,
  isQuizisReady: false,
  isAllReady: false,
  setIsHost: (val) => set({ isHost: val }),
  setIsQuizisReady: (val) => set({ isQuizisReady: val }),
  setAsAllReady: (val) => set({ isAllReady: val }),
}));
