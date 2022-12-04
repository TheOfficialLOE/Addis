import { Request } from "express";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";

export type AuthenticatedRequest = Request & {
  user: UserEntity
};

export const AuthUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user;
  }
)
