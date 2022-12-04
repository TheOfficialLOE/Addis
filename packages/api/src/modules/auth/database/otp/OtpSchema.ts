import { Prop, Schema } from "@nestjs/mongoose";
import { IdentifiableSchema } from "@api/core/base-classes/IdentifiableSchema";

@Schema({ collection: "otps" })
export class OtpSchema extends IdentifiableSchema {
  @Prop()
  code: number;

  @Prop()
  issuedEmail: string;

  @Prop()
  generatedAt: number;
}
