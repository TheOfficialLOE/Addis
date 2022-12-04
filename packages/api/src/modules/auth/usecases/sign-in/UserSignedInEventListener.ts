import { Injectable } from "@nestjs/common";
import { OtpRepository } from "@api/modules/auth/database/otp/OtpRepository";
import { OnEvent } from "@nestjs/event-emitter";
import { OtpEntity } from "@api/modules/auth/domain/otp/OtpEntity";
import { Mailer } from "@api/infrastructure/services/Mailer";
import { ApiKeys } from "@api/infrastructure/config/ApiKeys";
import { UserSignedInEvent } from "@api/modules/auth/domain/events/UserSignedInEvent";

@Injectable()
export class UserSignedInEventListener {
  constructor(
    private readonly otpRepository: OtpRepository
  ) {}

  @OnEvent("user.signed-in")
  async listen(event: UserSignedInEvent) {
    const otp = await this.createOtpForEmail(event.email);
    await this.buildMailer().sendMail(event.email, otp.code.toString());
  }

  private async createOtpForEmail(email: string): Promise<OtpEntity> {
    const otp = OtpEntity.generateFor(email);
    await this.otpRepository.create(otp);
    return otp;
  }

  private buildMailer(): Mailer {
    return Mailer.build({
      service: ApiKeys.MAIL_SERVICE,
      host: ApiKeys.MAIL_HOST,
      auth: {
        user: ApiKeys.MAIL_USER,
        pass: ApiKeys.MAIL_PASS,
      },
    });
  }
}
