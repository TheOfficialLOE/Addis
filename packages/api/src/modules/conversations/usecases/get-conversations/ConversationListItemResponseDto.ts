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

  public static new(conversation: ConversationEntity): ConversationListItemResponseDto {
    return {
      id: conversation.id,
      creator: {
        id: conversation.creator.id,
        name: conversation.creator.name,
        username: conversation.creator.username
      },
      recipient: {
        id: conversation.recipient.id,
        name: conversation.recipient.name,
        username: conversation.recipient.username
      },
      lastMessage: {
        authorId: conversation.messages[0].author.id,
        content: conversation.messages[0].content
      }
    };
  }
}
