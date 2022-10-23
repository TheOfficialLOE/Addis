import { VerifyCodeUseCase } from "./VerifyCodeUseCase";
import { Injectable } from "@nestjs/common";
import { OtpRepository } from "../../database/OtpRepository";
import { UserRepository } from "../../database/UserRepository";
import { UserEntity } from "../../domain/UserEntity";
import { CoreAssert } from "../../../../core/CoreAssert";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class VerifyCodeUseCaseImpl implements VerifyCodeUseCase {
  constructor(
    private readonly otpRepository: OtpRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async execute(payload: {
    email: string;
    code: number;
  }): Promise<string> {
    const otp = CoreAssert.notEmpty(
      await this.otpRepository.findOne({
        issuedEmail: payload.email,
        code: payload.code,
      }),
      new Error("Otp not found.")
    );
    otp.verify();
    const user = await this.userRepository.findOne({ email: payload.email });
    if (!user)
      await this.userRepository.create(UserEntity.new(payload.email));
    return await this.jwtService.signAsync({ email: payload.email });
  }
}
