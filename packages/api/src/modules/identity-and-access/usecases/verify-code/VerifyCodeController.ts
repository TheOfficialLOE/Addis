import { Body, Controller, Post } from "@nestjs/common";
import { VerifyCodeUseCaseImpl } from "./VerifyCodeUseCaseImpl";
import { CoreApiResponse } from "@api/core/CoreApiResponse";

// todo: route name needs to be changed
@Controller("auth")
export class VerifyCodeController {
  constructor(private readonly verifyCodeUseCase: VerifyCodeUseCaseImpl) {}

  @Post("verify")
  public async execute(@Body() body: { email: string, code: number }) {
    return CoreApiResponse.success(await this.verifyCodeUseCase.execute({
      email: body.email,
      code: body.code,
    }));
  }
}
