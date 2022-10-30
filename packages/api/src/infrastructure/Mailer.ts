import { Transporter } from "nodemailer";
import * as nodemailer from "nodemailer";
import { ApiKeys } from "./ApiKeys";

interface MailAccount {
  service: string;
  host: string;
  port?: number;
  secure?: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export class Mailer {
  private constructor(
    private readonly transport: Transporter
  ) {}

  public static build(account: MailAccount): Mailer {
    const transport = nodemailer.createTransport({
      service: account.service,
      host: account.host,
      port: account.port,
      secure: account.secure,
      auth: account.auth
    });
    return new Mailer(transport);
  }

  public async sendMail(recipient: string, message: string): Promise<void> {
    /// todo: check recipient
    await this.transport.sendMail({
      from: ApiKeys.MAIL_USER,
      to: recipient,
      subject: "Otp",
      text: message,
    });
  }
}
