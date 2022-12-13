
export type UserInConversation = {
  id: string;
  name: string;
  username: string;
};

export type LastMessage = {
  authorId: string;
  content: string;
  sentAt: number;
}

export type Conversation = {
  id: string;
  userA: UserInConversation;
  userB: UserInConversation;
  lastMessage: LastMessage;
  unread: number;
  lastMessageSeenTimeStampUserA: number;
  lastMessageSeenTimeStampUserB: number;
};
