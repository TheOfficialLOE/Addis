import { Module } from "@nestjs/common";
import { RequestCodeController } from "./usecases/request-code/RequestCodeController";
import { Mailer } from "../../infrastructure/Mailer";
import { RequestCodeUseCaseImpl } from "./usecases/request-code/RequestCodeUseCaseImpl";
import { OtpRepository } from "./database/OtpRepository";
import { OtpMapper } from "./database/OtpMapper";
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { OtpSchema } from "./database/OtpSchema";
import { VerifyCodeController } from "./usecases/verify-code/VerifyCodeController";
import { VerifyCodeUseCaseImpl } from "./usecases/verify-code/VerifyCodeUseCaseImpl";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OtpSchema.name, schema: SchemaFactory.createForClass(OtpSchema) },
    ]),
  ],
  controllers: [RequestCodeController, VerifyCodeController],
  providers: [
    Mailer,
    RequestCodeUseCaseImpl,
    VerifyCodeUseCaseImpl,
    OtpRepository,
    OtpMapper,
  ],
})
export class IdentityAndAccessModule {}
