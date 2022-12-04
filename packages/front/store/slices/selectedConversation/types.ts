
export type Message = {
  id: string,
  authorId: string,
  content: string,
  // sentAt: string,
  // isSeen: boolean,
};

export type SelectedConversation = {
  id: string;
  creatorId: string;
  recipientId: string;
  messages: Message[];
};
