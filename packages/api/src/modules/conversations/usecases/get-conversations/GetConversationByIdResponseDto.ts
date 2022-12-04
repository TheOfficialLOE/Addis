import { ConversationEntity } from "@api/modules/conversations/domain/ConversationEntity";

export class GetConversationByIdResponseDto {
  id: string;

  creatorId: string;

  recipientId: string;

  messages: {
    id: string;
    authorId: string;
    content: string
  }[];

  public static new(conversation: ConversationEntity): GetConversationByIdResponseDto {
    return {
      id: conversation.id,
      creatorId: conversation.creator.id,
      recipientId: conversation.recipient.id,
      messages: conversation.messages.map(message => (
        {
          id: message.id,
          authorId: message.author.id,
          content: message.content
        }
      ))
    };
  }
}
