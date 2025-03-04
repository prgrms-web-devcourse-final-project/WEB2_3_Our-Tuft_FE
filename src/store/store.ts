import { create } from "zustand";

interface LoginState {
  token: string | null;
  isLoggedIn: boolean;

  login: (token: string | null) => void;
  logout: () => void;
}
export const useLoginStore = create<LoginState>((set) => ({
  token: null,
  isLoggedIn: false,

  login: (token: string | null) => {
    sessionStorage.setItem("token", token ?? "");
    set({ isLoggedIn: true, token: token });
  },
  logout: () => {
    sessionStorage.removeItem("token");
    set({ isLoggedIn: false, token: null });
  },
}));
