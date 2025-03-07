export interface Room {
  roomId: number;
  roomName: string;
  round: number;
  hostId: number;
  disclosure: boolean;
  gameType: "SPEED" | "CATCHMIND" | "OX";
  time?: number;
  maxUsers?: number;
  currentUsers?: number;
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
