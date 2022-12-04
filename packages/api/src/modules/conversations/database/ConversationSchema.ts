import { IdentifiableSchema } from "@api/core/base-classes/IdentifiableSchema";
import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { UserSchema } from "@api/modules/auth/database/user/UserSchema";
import { MessagesSchema } from "@api/modules/conversations/database/MessageSchema";

@Schema({ collection: "conversations" })
export class ConversationSchema extends IdentifiableSchema {
  @Prop({ type: SchemaTypes.ObjectId, ref: UserSchema.name, autopopulate: true })
  creator: UserSchema;

  @Prop({ type: SchemaTypes.ObjectId, ref: UserSchema.name, autopopulate: true })
  recipient: UserSchema;

  @Prop([MessagesSchema])
  messages: MessagesSchema[];
}
