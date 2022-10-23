import { Entity } from "../../../core/ddd/BaseEntity";

interface OtpEntityProps {
  code: number;
  issuedEmail: string;
  generatedAt: number;
}

export class OtpEntity extends Entity<OtpEntityProps> {
  public static generateFor(email: string): OtpEntity {
    const props: OtpEntityProps = {
      code: Math.floor(Math.random() * 9999 - 1001) + 1000,
      issuedEmail: email,
      generatedAt: Date.now(),
    };
    return new OtpEntity({ props });
  }

  get code(): number {
    return this.props.code;
  }

  get issuedEmail(): string {
    return this.props.issuedEmail;
  }

  get generatedAt(): number {
    return this.props.generatedAt;
  }

  public verify(): void {
    const now = new Date();
    const generatedAt = new Date(this.generatedAt);
    /// todo: serious bug!!!
    if (now.getMinutes() - generatedAt.getMinutes() > 15)
      throw new Error("Invalid OTP.");
  }
}
