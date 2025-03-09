import { create } from "zustand";

interface LoginState {
  token: string | null;
  userId: string | null;
  isLoggedIn: boolean;

  login: (token: string | null) => void;
  logout: () => void;
  setUserId: (userId: string | null) => void;
  removeUserId: () => void;
}
export const useLoginStore = create<LoginState>((set) => ({
  token: null,
  userId: null,
  isLoggedIn: false,

  login: (token: string | null) => {
    sessionStorage.setItem("token", token ?? "");
    set({ isLoggedIn: true, token: token });
  },
  logout: () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    set({ isLoggedIn: false, token: null, userId: null });
  },
  setUserId: (userId: string | null) => {
    sessionStorage.setItem("userId", userId ?? "");
    set({ isLoggedIn: true, userId: userId });
  },
  removeUserId: () => {
    sessionStorage.removeItem("userId");
    set({ isLoggedIn: false, userId: null });
  },
}));

interface connectionState {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
}

export const useConnectionStore = create<connectionState>((set) => ({
  isLoading: true,
  setIsLoading: (state: boolean) => {
    set({ isLoading: state });
  },
}));
