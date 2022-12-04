import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server } from "socket.io";
import { INestApplication, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthenticatedSocket } from "@api/modules/gateway/AuthenticatedSocket";
import { UserRepository } from "@api/modules/auth/database/user/UserRepository";
import { UserRepositoryPort } from "@api/modules/auth/database/user/UserRepositoryPort";
import * as cookie from "cookie";

export class GatewayAdapter extends IoAdapter {
  constructor(
    private readonly app: INestApplication,
    private readonly jwtService: JwtService,
    @Inject(UserRepository)
    private readonly userRepository: UserRepositoryPort,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: any): Server {
    const server: Server = super.createIOServer(port, options);
    server.use(async (socket: AuthenticatedSocket, next) => {
      const clientCookie = socket.handshake.headers.cookie;
      if (!clientCookie)
        return next(new Error("No cookies were sent."));
      const { token } = cookie.parse(clientCookie)
      if (!token)
        return next(new Error("Token must be provided."));
      const { email } = await this.jwtService.verifyAsync(token);
      const user = await this.userRepository.findOne({ email });
      if (!user)
        return next(new Error("User not found."));
      if (!user.isVerified)
        return next(new Error("User not verified."));
      socket.user = user;
      next();
    });
    return server;
  }
}
