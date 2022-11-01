import { UseCase } from "@api/core/ddd/UseCase";

export interface VerifyCodeUseCase extends UseCase<{ email: string; code: number }, string> {}
