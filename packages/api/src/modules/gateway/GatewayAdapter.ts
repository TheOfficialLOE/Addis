import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server, Socket } from "socket.io";
import { UserEntity } from "../identity-and-access/domain/UserEntity";
import { UserRepository } from "@api/modules/identity-and-access/database/UserRepository";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export interface AuthenticatedSocket extends Socket {
  user: UserEntity;
}

export class GatewayAdapter extends IoAdapter {
  constructor(
    private readonly app: INestApplication,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: any): Server {
    const server: Server = super.createIOServer(port, options);
    server.use(async (socket: AuthenticatedSocket, next) => {
      next();
    });
    return server;
  }
}
