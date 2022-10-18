import { Body, Controller, Post } from "@nestjs/common";
import { RequestCodeUseCaseImpl } from "./RequestCodeUseCaseImpl";

@Controller("auth")
export class RequestCodeController {
  constructor(private readonly requestCodeUseCase: RequestCodeUseCaseImpl) {}

  @Post()
  public async execute(@Body("email") email: string) {
    // Even Lambs Have Teeth
    await this.requestCodeUseCase.execute(email);
    return "Email sent.";
  }
}
