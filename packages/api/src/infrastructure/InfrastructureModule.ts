import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseSchemaModule } from "@api/infrastructure/database/MongooseSchemaModule";
import { OtpSchema } from "@api/modules/auth/database/otp/OtpSchema";
import { UserSchema } from "@api/modules/auth/database/user/UserSchema";
import { ConversationSchema } from "@api/modules/conversations/database/ConversationSchema";
import { PassportModule } from "@nestjs/passport";
import { ApiKeys } from "@api/infrastructure/config/ApiKeys";

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(ApiKeys.MONGO_URL),
    MongooseSchemaModule.forSchema([
      OtpSchema,
      UserSchema,
      ConversationSchema,
    ]),
    PassportModule,
  ],
  providers: [
  ],
  exports: [
    MongooseModule,
  ]
})
export class InfrastructureModule {

}
