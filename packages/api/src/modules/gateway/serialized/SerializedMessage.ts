import { MessageEntity } from "@api/modules/conversations/domain/MessageEntity";

export type SerializedMessage = {
  id: string;
  authorId: string;
  content: string;
  sentAt: number;
};

export const toSerializedMessage = (message: MessageEntity): SerializedMessage => {
  return {
    id: message.id,
    authorId: message.author.id,
    content: message.content,
    sentAt: message.sentAt
  };
}
