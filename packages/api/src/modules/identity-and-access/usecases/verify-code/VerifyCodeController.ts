import { Body, Controller, Post } from "@nestjs/common";
import { VerifyCodeUseCaseImpl } from "./VerifyCodeUseCaseImpl";

// todo: route name needs to be changed
@Controller("auth")
export class VerifyCodeController {
  constructor(private readonly verifyCodeUseCase: VerifyCodeUseCaseImpl) {}

  @Post("verify")
  public async execute(@Body() body: { email: string, code: number }) {
    return await this.verifyCodeUseCase.execute({
      email: body.email,
      code: body.code,
    });
  }
}
