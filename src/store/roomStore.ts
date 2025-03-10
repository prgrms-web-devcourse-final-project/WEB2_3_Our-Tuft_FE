import { create } from "zustand";

interface booleanState {
  isHost: boolean;
  isQuizisReady: boolean;
  isAllReady: boolean;
  infoRoom: string;
  setIsHost: (val: boolean) => void;
  setIsQuizisReady: (val: boolean) => void;
  setAsAllReady: (val: boolean) => void;
  setInfoRoom: (val: string) => void;
}
export const useIsRoomStore = create<booleanState>((set) => ({
  isHost: false,
  isQuizisReady: false,
  isAllReady: true,
  infoRoom: "",
  setIsHost: (val) => set({ isHost: val }),
  setIsQuizisReady: (val) => set({ isQuizisReady: val }),
  setAsAllReady: (val) => set({ isAllReady: val }),
  setInfoRoom: (val) => set({ infoRoom: val }),
}));

interface roomInfoState {
  roomInfo: {
    roomId: number;
    roomName?: string;
    round?: number;
    hostId?: number;
    disclosure?: boolean;
    gameType?: "SPEED" | "CATCHMIND" | "OX";
    time?: number;
    maxUsers?: number;
  };
  setInfo: (newInfo: {
    roomId: number;
    roomName?: string;
    round?: number;
    hostId?: number;
    disclosure?: boolean;
    gameType?: "SPEED" | "CATCHMIND" | "OX";
    time?: number;
    maxUsers?: number;
  }) => void;
}
export const useRoomInfoStore = create<roomInfoState>((set) => ({
  roomInfo: {
    disclosure: true,
    gameType: "CATCHMIND",
    hostId: 0,
    maxUsers: 0,
    roomId: 0,
    roomName: "",
    round: 0,
    time: 0,
  },
  setInfo: (val) =>
    set((state) => ({
      roomInfo: { ...state.roomInfo, ...val },
    })),
}));
