import { Module } from "@nestjs/common";
import { RequestCodeController } from "./usecases/request-code/RequestCodeController";
import { RequestCodeUseCaseImpl } from "./usecases/request-code/RequestCodeUseCaseImpl";
import { OtpRepository } from "./database/OtpRepository";
import { OtpMapper } from "./database/OtpMapper";
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { OtpSchema } from "./database/OtpSchema";
import { VerifyCodeController } from "./usecases/verify-code/VerifyCodeController";
import { VerifyCodeUseCaseImpl } from "./usecases/verify-code/VerifyCodeUseCaseImpl";
import { UserMapper } from "./database/UserMapper";
import { UserRepository } from "./database/UserRepository";
import { UserSchema } from "./database/UserSchema";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OtpSchema.name, schema: SchemaFactory.createForClass(OtpSchema) },
      { name: UserSchema.name, schema: SchemaFactory.createForClass(UserSchema) },
    ]),
    JwtModule.register({
      secret: "secret"
    })
  ],
  controllers: [RequestCodeController, VerifyCodeController],
  providers: [
    RequestCodeUseCaseImpl,
    VerifyCodeUseCaseImpl,
    OtpRepository,
    OtpMapper,
    UserRepository,
    UserMapper,
  ],
})
export class IdentityAndAccessModule {}
