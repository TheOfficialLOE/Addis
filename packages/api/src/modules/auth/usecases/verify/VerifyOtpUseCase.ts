import { UseCase } from "@api/core/base-classes/UseCase";
import { VerifyOtpRequestDto } from "@api/modules/auth/usecases/verify/VerifyOtpRequestDto";

export interface VerifyOtpUseCase extends UseCase<VerifyOtpRequestDto, string>{

}
