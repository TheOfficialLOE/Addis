import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { AuthenticatedSocket } from "@api/modules/gateway/AuthenticatedSocket";
import { GatewaySession } from "@api/modules/gateway/GatewaySession";
import { OnEvent } from "@nestjs/event-emitter";
import { ConversationEntity } from "@api/modules/conversations/domain/ConversationEntity";
import { MessageEntity } from "@api/modules/conversations/domain/MessageEntity";

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
})
export class Gateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly sessions: GatewaySession
  ) {}

  @WebSocketServer()
  private readonly server: Server;

  handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
    this.sessions.setUserSocket(socket.user.id, socket);
  }

  handleDisconnect(socket: AuthenticatedSocket) {
    this.sessions.removeUserSocket(socket.user.id);
  }

  @OnEvent("message-created")
  async messageCreated(payload: {
    conversation: ConversationEntity,
    message: MessageEntity
  }) {
    const authorSocket = this.sessions.getUserSocket(payload.message.author.id);
    const recipientSocket =
      payload.message.author.id === payload.conversation.creator.id
        ? this.sessions.getUserSocket(payload.conversation.recipient.id)
        : this.sessions.getUserSocket(payload.conversation.creator.id);
    this.server.emit("onMessage", payload);
    // if (authorSocket) authorSocket.emit('onMessage', payload);
    // if (recipientSocket) recipientSocket.emit('onMessage', payload);
  }
}
