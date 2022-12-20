
export type Message = {
  id: string;
  authorId: string;
  reaction: string;
  content: string;
  sentAt: number;
};

export type SelectedConversation = {
  id: string;
  userA: string;
  userB: string;
  messages: Message[];
  lastMessageSeenTimeStampUserA: number;
  lastMessageSeenTimeStampUserB: number;
};
