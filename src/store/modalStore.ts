import { create } from "zustand";

export const useModalStore = create<modalStore>((set) => ({
  modal: null,
  position: null,
  isOpen: (type) => set({ modal: type }),
  isClose: () => set(() => ({ modal: null })),
  setPosition: (val) => set({ position: val }),
}));
