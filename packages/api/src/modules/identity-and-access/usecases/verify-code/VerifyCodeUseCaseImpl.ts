import { VerifyCodeUseCase } from "./VerifyCodeUseCase";
import { Injectable } from "@nestjs/common";
import { OtpRepository } from "../../database/OtpRepository";

@Injectable()
export class VerifyCodeUseCaseImpl implements VerifyCodeUseCase {
  constructor(private readonly repository: OtpRepository) {}

  public async execute(payload: {
    email: string;
    code: number;
  }): Promise<boolean> {
    const result = await this.repository.findOne({
      issuedEmail: payload.email,
      code: payload.code,
    });
    if (result) return true;
  }
}
