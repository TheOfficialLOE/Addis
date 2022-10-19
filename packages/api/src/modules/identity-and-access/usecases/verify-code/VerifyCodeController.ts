import { Body, Controller, Get } from "@nestjs/common";
import { VerifyCodeUseCaseImpl } from "./VerifyCodeUseCaseImpl";

@Controller("auth")
export class VerifyCodeController {
  constructor(private readonly verifyCodeUseCase: VerifyCodeUseCaseImpl) {}

  @Get()
  public async execute(@Body() body: { email: string; code: number }) {
    const result = await this.verifyCodeUseCase.execute({
      email: body.email,
      code: body.code,
    });
    if (result) return "Logged in!";
    return "Wrong credentials";
  }
}
