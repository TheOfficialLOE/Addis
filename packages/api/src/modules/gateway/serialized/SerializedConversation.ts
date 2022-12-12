import { ConversationEntity } from "@api/modules/conversations/domain/ConversationEntity";

export type SerializedConversation = {
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

  // todo:------------------------ TMPPPPPPPPPPPPPPPPPPPPPP
  lastMessageSeenTimeStampUserA: number;
  lastMessageSeenTimeStampUserB: number;
};

export const toSerializedConversation = (conversation: ConversationEntity): SerializedConversation => {
  return {
    id: conversation.id,
    userA: {
      id: conversation.userA.id,
      name: conversation.userA.name,
      username: conversation.userA.username
    },
    userB: {
      id: conversation.userB.id,
      name: conversation.userB.name,
      username: conversation.userB.username
    },
    lastMessageSeenTimeStampUserA: conversation.lastMessageSeenTimeStampUserA,
    lastMessageSeenTimeStampUserB: conversation.lastMessageSeenTimeStampUserB
  }
}
