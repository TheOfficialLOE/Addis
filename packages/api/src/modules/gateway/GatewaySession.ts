import { Injectable } from "@nestjs/common";
import { AuthenticatedSocket } from "@api/modules/gateway/AuthenticatedSocket";

@Injectable()
export class GatewaySession {
  private readonly sessions: Map<string, AuthenticatedSocket> = new Map();

  getUserSocket(id: string) {
    return this.sessions.get(id);
  }

  setUserSocket(userId: string, socket: AuthenticatedSocket) {
    this.sessions.set(userId, socket);
  }

  removeUserSocket(userId: string) {
    this.sessions.delete(userId);
  }

  getSockets(): Map<string, AuthenticatedSocket> {
    return this.sessions;
  }
}
