export interface quizeUserList {
  isSuccess: boolean;
  code: string;
  message: string;
  data: User[];
}

export interface User {
  userId?: string;
  username?: string;
}

export interface quizeMsg {
  message: string;
  sender: string;
}
