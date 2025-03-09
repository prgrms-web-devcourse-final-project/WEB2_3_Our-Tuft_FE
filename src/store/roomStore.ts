import { create } from "zustand";

interface LoginState {
  isHost: boolean;
  setIsHost: (val: boolean) => void;
}
export const useIsHostStore = create<LoginState>((set) => ({
  isHost: true,
  setIsHost: (val) => set({ isHost: val }),
}));
