import { Transporter } from "nodemailer";
import * as nodemailer from "nodemailer";
import { Injectable } from "@nestjs/common";
import { ApiKeys } from "./ApiKeys";

@Injectable()
export class Mailer {
  private readonly transport: Transporter;

  constructor() {
    this.transport = nodemailer.createTransport({
      service: ApiKeys.MAIL_SERVICE.description,
      host: ApiKeys.MAIL_HOST.description,
      auth: {
        user: ApiKeys.MAIL_USER.description,
        pass: ApiKeys.MAIL_PASS.description,
      },
    });
  }

  public async sendMail(recipient: string, message: string): Promise<void> {
    await this.transport.sendMail({
      from: ApiKeys.MAIL_USER.description,
      to: recipient,
      subject: "Otp",
      text: message,
    });
  }
}
