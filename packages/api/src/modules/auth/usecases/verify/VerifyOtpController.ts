import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CoreApiResponse } from "@api/core/client-response/CoreApiResponse";
import { VerifyOtpRequestDto } from "@api/modules/auth/usecases/verify/VerifyOtpRequestDto";
import { VerifyOtpUseCase } from "./VerifyOtpUseCase";
import { VerifyOtpUseCaseImpl } from "@api/modules/auth/usecases/verify/VerifyOtpUseCaseImpl";

@Controller("auth")
export class VerifyOtpController {
  constructor(
    @Inject(VerifyOtpUseCaseImpl)
    private readonly otpUseCase: VerifyOtpUseCase,
  ) {}

  @Post("verify")
  async verify(@Body() body: VerifyOtpRequestDto) {
    const token = await this.otpUseCase.execute(body);
    return CoreApiResponse.success(token);
  }
}
