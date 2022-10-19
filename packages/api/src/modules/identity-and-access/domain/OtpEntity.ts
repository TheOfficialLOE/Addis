import { Entity } from "../../../core/ddd/BaseEntity";

interface OtpEntityProps {
  code: number;
  issuedEmail: string;
  generatedAt: Date;
}

export class OtpEntity extends Entity<OtpEntityProps> {
  public static generateFor(email: string): OtpEntity {
    const props: OtpEntityProps = {
      code: Math.floor(Math.random() * 9999 - 1001) + 1000,
      issuedEmail: email,
      generatedAt: new Date(),
    };
    return new OtpEntity({ props });
  }

  get code(): number {
    return this.props.code;
  }

  get issuedEmail(): string {
    return this.props.issuedEmail;
  }

  get generatedAt(): Date {
    return this.props.generatedAt;
  }
}
