import { Prop, Schema } from "@nestjs/mongoose";
import { IdentifiableSchema } from "@api/core/base-classes/IdentifiableSchema";

@Schema({ collection: "users" })
export class UserSchema extends IdentifiableSchema {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  username: string;


  @Prop({ required: true })
  isVerified: boolean;
}
