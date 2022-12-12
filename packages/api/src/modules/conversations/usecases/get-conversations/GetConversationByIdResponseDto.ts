import { ConversationEntity } from "@api/modules/conversations/domain/ConversationEntity";

export class GetConversationByIdResponseDto {
  id: string;

  userA: string;

  userB: string;

  messages: {
    id: string;
    authorId: string;
    content: string
    sentAt: number;
  }[];

  lastMessageSeenTimeStampUserA: number;
  lastMessageSeenTimeStampUserB: number;

  public static new(conversation: ConversationEntity): GetConversationByIdResponseDto {
    return {
      id: conversation.id,
      userA: conversation.userA.id,
      userB: conversation.userB.id,
      messages: conversation.messages.map(message => (
        {
          id: message.id,
          authorId: message.author.id,
          content: message.content,
          sentAt: message.sentAt
        }
      )),
      lastMessageSeenTimeStampUserA: conversation.lastMessageSeenTimeStampUserA,
      lastMessageSeenTimeStampUserB: conversation.lastMessageSeenTimeStampUserB
    };
  }
}
