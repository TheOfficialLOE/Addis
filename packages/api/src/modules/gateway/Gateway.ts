import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { AuthenticatedSocket } from "@api/modules/gateway/AuthenticatedSocket";
import { OnEvent } from "@nestjs/event-emitter";
import { ConversationEntity } from "@api/modules/conversations/domain/ConversationEntity";
import { MessageEntity } from "@api/modules/conversations/domain/MessageEntity";
import { toSerializedConversation } from "@api/modules/gateway/serialized/SerializedConversation";
import { toSerializedMessage } from "@api/modules/gateway/serialized/SerializedMessage";

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
})
export class Gateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  private readonly server: Server;

  handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
    ///
  }

  handleDisconnect(socket: AuthenticatedSocket) {
    ///
  }

  @OnEvent("message-created")
  async messageCreated(payload: {
    conversation: ConversationEntity,
    message: MessageEntity
  }) {
    this.server.emit("onMessage", {
      conversation: toSerializedConversation(payload.conversation),
      message: toSerializedMessage(payload.message)
    });
  }

  @OnEvent("messages-seen")
  async foo(payload: {
    conversationId: string,
    userId: string
  }) {
    this.server.emit("onSeenMessages", payload);
  }

  @OnEvent("reaction-added")
  async reactionAdded(payload: {
    conversationId: string,
    messageId: string,
    reaction: string
  }) {
    this.server.emit("onReaction", payload);
  }
}
