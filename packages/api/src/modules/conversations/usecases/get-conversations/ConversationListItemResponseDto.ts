import { ConversationEntity } from "@api/modules/conversations/domain/ConversationEntity";

export class ConversationListItemResponseDto {
  id: string;

  creator: {
    id: string;
    name: string;
    username: string;
  };

  recipient: {
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
      creator: {
        id: conversation.creator._id,
        name: conversation.creator.name,
        username: conversation.creator.username
      },
      recipient: {
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
