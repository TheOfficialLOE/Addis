import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server, Socket } from "socket.io";
import { UserEntity } from "../identity-and-access/domain/UserEntity";

export interface AuthenticatedSocket extends Socket {
  user: UserEntity;
}

export class GatewayAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): Server {
    const server: Server = super.createIOServer(port, options);
    server.use(async (socket: AuthenticatedSocket, next) => {
      console.log(socket.handshake.auth);
      next();
    });
    return server;
  }
}
