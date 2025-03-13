export interface Room {
  roomId: number;
  roomName: string;
  round: number;
  hostId: number;
  disclosure: boolean;
  gameType: "SPEED" | "OX";
  time?: number;
  maxUsers?: number;
  currentPlayer?: number;
  gameRunning?: boolean;
}

export interface ApiResponse {
  isSuccess: boolean;
  message?: string;
  data: Room[];
}

export interface WebSocketRoomMessage {
  type: "ROOM_LIST" | "ROOM_CREATED" | "ROOM_UPDATED" | "ROOM_DELETED";
  data: Room | Room[] | number;
}

export type roomInfoData = {
  data: roomInfo;
};

export type roomInfo = {
  disclosure: string;
  gameType: "SPEED" | "OX";
  hostId: number;
  maxUsers: number;
  roomId: number;
  roomName: string;
  round: number;
  time: number;
};

export type playerData = {
  isSuccess: boolean;
  code: string;
  message: string;
  data: GameData;
};

type GameData = {
  hostId: number;
  currentPlayers: number;
  dto: Player[];
};

type Player = {
  userId: string;
  username: string;
  isReady: string;
  eye: string;
  mouth: string;
  skin: string;
  nickColor: string;
};

export type roomUserListData = {
  data: { hostId: number; dto: roomUserList[] };
};

export type roomUserList = {
  userId: string;
  username: string;
  isReady: string;
  eye?: string;
  mouth?: string;
  skin?: string;
  nickColor?: string;
};

export type roomPlayListData = {
  isSuccess: boolean;
  code: string;
  message: string;
  data: roomPlayList[];
};

export type roomPlayList = {
  userId: string;
  username: string;
  eye: string;
  mouth: string;
  skin: string;
  nickColor: string;
};
