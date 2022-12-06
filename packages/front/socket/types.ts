import { SerializedConversation } from "@api/modules/gateway/serialized/SerializedConversation";
import { SerializedMessage } from "@api/modules/gateway/serialized/SerializedMessage";

export type OnMessageEvent = {
  conversation: SerializedConversation;
  message: SerializedMessage;
};
