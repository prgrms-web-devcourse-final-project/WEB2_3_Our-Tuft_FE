export type roomInfoData = {
  data: roomInfo;
};

export type roomInfo = {
  disclosure: string;
  gameType: "SPEED" | "OX" | "DRAWING";
  hostId: number;
  maxUsers: number;
  roomId: number;
  roomName: string;
  round: number;
  time: number;
};

export type roomUserListData = {
  data: roomUserList[];
};

export type roomUserList = {
  userId: string;
  username: string;
  isReady: string;
};
