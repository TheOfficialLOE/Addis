import { IdentifiableSchema } from "../../../core/infrastructure/IdentifiableSchema";
import { Prop, Schema } from "@nestjs/mongoose";

@Schema({ collection: "users" })
export class UserSchema extends IdentifiableSchema {
  @Prop({ unique: true })
  email: string;

  @Prop({ required: false })
  username: string;
}
