
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
    content: string
  };

  unread: number;

  public static new(conversation: any): ConversationListItemResponseDto {
    return {
      id: conversation._id,
      userA: {
        id: conversation.creator._id,
        name: conversation.creator.name,
        username: conversation.creator.username
      },
      userB: {
        id: conversation.recipient._id,
        name: conversation.recipient.name,
        username: conversation.recipient.username
      },
      lastMessage: {
        authorId: conversation.lastMessage.author,
        content: conversation.lastMessage.content
      },
      unread: conversation.unread,
    };
  }
}
