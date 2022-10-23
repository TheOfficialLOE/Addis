import { Body, Controller, Post } from "@nestjs/common";
import { RequestCodeUseCaseImpl } from "./RequestCodeUseCaseImpl";

// todo: route name needs to be changed
@Controller("auth")
export class RequestCodeController {
  constructor(
    private readonly requestCodeUseCase: RequestCodeUseCaseImpl
  ) {}

  @Post()
  public async execute(@Body("email") email: string) {
    await this.requestCodeUseCase.execute(email);
    return "Email sent.";
  }
}
