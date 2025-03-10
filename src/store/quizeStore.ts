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
  username: string;
  score: string;
};
