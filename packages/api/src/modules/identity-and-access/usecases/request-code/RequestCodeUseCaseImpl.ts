import { RequestCodeUseCase } from "./RequestCodeUseCase";
import { Mailer } from "@api/infrastructure/Mailer";
import { OtpRepository } from "../../database/OtpRepository";
import { Injectable } from "@nestjs/common";
import { OtpEntity } from "../../domain/OtpEntity";
import { ApiKeys } from "@api/infrastructure/ApiKeys";

@Injectable()
export class RequestCodeUseCaseImpl implements RequestCodeUseCase {
  constructor(
    private readonly repository: OtpRepository,
  ) {}

  public async execute(email: string): Promise<void> {
    const otp = OtpEntity.generateFor(email);
    await this.repository.create(otp);
    await this.buildMailer().sendMail(email, otp.code.toString());
  }

  private buildMailer(): Mailer {
    return Mailer.build({
      service: ApiKeys.MAIL_SERVICE,
      host: ApiKeys.MAIL_HOST,
      auth: {
        user: ApiKeys.MAIL_USER,
        pass: ApiKeys.MAIL_USER,
      },
    });
  }
}
