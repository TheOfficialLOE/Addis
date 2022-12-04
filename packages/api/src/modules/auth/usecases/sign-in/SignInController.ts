import { Body, Controller, Inject, Post } from "@nestjs/common";
import { SignInRequestDto } from "@api/modules/auth/usecases/sign-in/SignInRequestDto";
import { SignInUseCase } from "@api/modules/auth/usecases/sign-in/SignInUseCase";
import { SignInUseCaseImpl } from "@api/modules/auth/usecases/sign-in/SignInUseCaseImpl";

@Controller("auth")
export class SignInController {
  constructor(
    @Inject(SignInUseCaseImpl)
    private readonly signInUseCase: SignInUseCase
  ) {}

  @Post("sign-in")
  async signIn(@Body() body: SignInRequestDto) {
    await this.signInUseCase.execute(body);
  }
}
