import { Controller, Get, Query } from "@nestjs/common";
import { VerifyCodeUseCaseImpl } from "./VerifyCodeUseCaseImpl";

@Controller("auth")
export class VerifyCodeController {
  constructor(private readonly verifyCodeUseCase: VerifyCodeUseCaseImpl) {}

  @Get()
  public async execute(@Query("email") email: string, @Query("code") code: number) {
    await this.verifyCodeUseCase.execute({
      email: email,
      code: code,
    });
    return "Logged in!";
  }
}
