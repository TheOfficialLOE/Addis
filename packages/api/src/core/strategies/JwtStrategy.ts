import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { UserRepository } from "@api/modules/auth/database/user/UserRepository";
import { ApiKeys } from "@api/infrastructure/config/ApiKeys";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: (req: Request): string => {
        const token = req.cookies["token"] || req.headers["token"];
        if (token)
          return token;
      },
      ignoreExpiration: false,
      secretOrKey: ApiKeys.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository.findOne({
      email: payload.email
    });
    if (user && user.isVerified)
      return user;
  }
}
