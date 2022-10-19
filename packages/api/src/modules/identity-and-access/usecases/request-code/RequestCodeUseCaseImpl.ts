import { RequestCodeUseCase } from "./RequestCodeUseCase";
import { Mailer } from "../../../../infrastructure/Mailer";
import { OtpRepository } from "../../database/OtpRepository";
import { Injectable } from "@nestjs/common";
import { OtpEntity } from "../../domain/OtpEntity";

@Injectable()
export class RequestCodeUseCaseImpl implements RequestCodeUseCase {
  constructor(
    private readonly repository: OtpRepository,
    private readonly mailer: Mailer,
  ) {}

  public async execute(email: string): Promise<void> {
    const otp = OtpEntity.generateFor(email);
    await this.repository.create(otp);
    await this.mailer.sendMail(email, otp.code.toString());
  }
}
