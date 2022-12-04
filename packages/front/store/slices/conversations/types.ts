
export type UserInConversation = {
  id: string;
  name: string;
  username: string;
};

export type LastMessage = {
  authorId: string;
  content: string;
}

export type Conversation = {
  id: string;
  creator: UserInConversation;
  recipient: UserInConversation;
  lastMessage: LastMessage;
};
