export interface modalProp {
  title: string;
  width: string;
  height: string;
  className?: string;
  showCancelButton?: string;
  showCompleteButton?: string;
  children: React.ReactNode;
}

export type topicModal = {
  data: topic[];
};

export type topic = {
  quizSetId: number;
  quizSetName: string;
};
