import { Socket } from "socket.io";
import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";

export interface AuthenticatedSocket extends Socket {
  user: UserEntity;
}
