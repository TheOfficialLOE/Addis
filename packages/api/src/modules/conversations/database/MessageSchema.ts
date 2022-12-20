import { IdentifiableSchema } from "@api/core/base-classes/IdentifiableSchema";
import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { UserSchema } from "@api/modules/auth/database/user/UserSchema";

@Schema()
export class MessagesSchema extends IdentifiableSchema {
  @Prop({ type: SchemaTypes.ObjectId, ref: UserSchema.name, autopopulate: true })
  author: UserSchema;

  @Prop({ required: true })
  content: string;

  @Prop()
  sentAt: number;

  @Prop()
  reaction: string;
}
