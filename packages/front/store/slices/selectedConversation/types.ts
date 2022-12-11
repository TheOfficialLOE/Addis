
export type Message = {
  id: string,
  authorId: string,
  content: string
};

export type SelectedConversation = {
  id: string;
  creatorId: string;
  recipientId: string;
  messages: Message[];
};
