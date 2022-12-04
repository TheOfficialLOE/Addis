import { UseCase } from "@api/core/base-classes/UseCase";
import { SignInRequestDto } from "@api/modules/auth/usecases/sign-in/SignInRequestDto";

export interface SignInUseCase extends UseCase<SignInRequestDto, void> {

}
