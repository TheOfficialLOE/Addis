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
      const token = socket.handshake.auth.token;
      if (!token)
        throw "Token must be provided.";
      const { email } = await this.jwtService.verifyAsync(token);
      const user = await this.userRepository.findOne({ email });
      if (!user)
        throw "User not found.";
      console.log(user);
      socket.user = user;
      next();
    });
    return server;
  }
}
