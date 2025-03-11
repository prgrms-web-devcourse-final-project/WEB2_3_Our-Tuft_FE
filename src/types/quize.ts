export interface quizeUserList {
  isSuccess: boolean;
  code: string;
  message: string;
  data: User[];
}

export interface User {
  userId: string;
  username: string;
  score?: number;
}

export interface quizeMsg {
  message: string;
  sender: string;
}

export interface quizeMsgQ {
  question: string;
}

export interface quizeMsgEvent {
  event: string;
}

export interface quizeMsgBody {
  body: string;
}

export type QuizeMsgType = quizeMsg & quizeMsgQ & quizeMsgEvent & quizeMsgBody;
