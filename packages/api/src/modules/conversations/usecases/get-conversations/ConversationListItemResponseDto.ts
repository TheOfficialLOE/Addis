
export class ConversationListItemResponseDto {
  id: string;

  userA: {
    id: string;
    name: string;
    username: string;
  };

  userB: {
    id: string;
    name: string;
    username: string;
  };

  lastMessage: {
    authorId: string;
    content: string;
    sentAt: number;
  };

  unread: number;

  public static new(conversation: any): ConversationListItemResponseDto {
    return {
      id: conversation._id,
      userA: {
        id: conversation.userA._id,
        name: conversation.userA.name,
        username: conversation.userA.username
      },
      userB: {
        id: conversation.userB._id,
        name: conversation.userB.name,
        username: conversation.userB.username
      },
      lastMessage: {
        authorId: conversation.lastMessage.author,
        content: conversation.lastMessage.content,
        sentAt: conversation.lastMessage.sentAt
      },
      unread: conversation.unread,
    };
  }
}
