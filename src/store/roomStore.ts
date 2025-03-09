import { create } from "zustand";
import { Room, roomInfo } from "../types/room";

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
  isAllReady: true,
  setIsHost: (val) => set({ isHost: val }),
  setIsQuizisReady: (val) => set({ isQuizisReady: val }),
  setAsAllReady: (val) => set({ isAllReady: val }),
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
  setRoomInfo: (newInfo: {
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
    gameType: "SPEED",
    hostId: 0,
    maxUsers: 0,
    roomId: 0,
    roomName: "",
    round: 0,
    time: 0,
  },
  setRoomInfo: (val) =>
    set((state) => ({
      roomInfo: { ...state.roomInfo, ...val },
    })),
}));
