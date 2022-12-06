import { ConversationEntity } from "@api/modules/conversations/domain/ConversationEntity";

export type SerializedConversation = {
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
};

export const toSerializedConversation = (conversation: ConversationEntity): SerializedConversation => {
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
    }
  }
}
