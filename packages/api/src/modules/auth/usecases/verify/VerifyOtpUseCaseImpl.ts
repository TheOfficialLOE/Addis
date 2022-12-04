import { VerifyOtpUseCase } from "@api/modules/auth/usecases/verify/VerifyOtpUseCase";
import { OtpRepository } from "@api/modules/auth/database/otp/OtpRepository";
import { CoreAssert } from "@api/core/util/CoreAssert";
import { Exception } from "@api/core/base-classes/Exception";
import { Code } from "@api/core/client-response/Code";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { VerifyOtpRequestDto } from "@api/modules/auth/usecases/verify/VerifyOtpRequestDto";
import { OtpVerifiedEvent } from "@api/modules/auth/domain/events/OtpVerifiedEvent";
import { OtpEntity } from "@api/modules/auth/domain/otp/OtpEntity";
import { OtpRepositoryPort } from "@api/modules/auth/database/otp/OtpRepositoryPort";

@Injectable()
export class VerifyOtpUseCaseImpl implements VerifyOtpUseCase {
  constructor(
    @Inject(OtpRepository)
    private readonly otpRepository: OtpRepositoryPort,
    private readonly eventEmitter: EventEmitter2,
    private readonly jwtService: JwtService,
  ) {}

  async execute(payload: VerifyOtpRequestDto): Promise<string> {
    const otp = await this.findOtpOrThrow(payload);
    otp.verify();
    this.dispatchEvent(payload.email);
    return await this.signToken(payload.email);
  }

  private async findOtpOrThrow(payload: VerifyOtpRequestDto): Promise<OtpEntity> {
    return CoreAssert.notEmpty(
      await this.otpRepository.findOne({ issuedEmail: payload.email, code: payload.code }),
      Exception.new({ code: Code.NOT_FOUND_ERROR, overrideMessage: "OTP not found." })
    );
  }

  private dispatchEvent(email: string) {
    this.eventEmitter.emit("otp.verified",
      new OtpVerifiedEvent(email)
    );
  }

  private async signToken(email: string) {
    return await this.jwtService.signAsync({ email });
  }
}
