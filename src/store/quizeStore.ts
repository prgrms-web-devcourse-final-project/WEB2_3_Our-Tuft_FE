export type quizeMessage = {
  sender: string;
  message: string;
};

export type UserScoreList = {
  isSuccess: boolean;
  code: string;
  message: string;
  data: UserScore[];
};

export type UserScore = {
  username?: string;
  userId?: number;
  score?: string;
};

export type OXUserScore = {
  userId: number;
  score: number;
};
