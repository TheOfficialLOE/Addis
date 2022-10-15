import { Module } from "@nestjs/common";
import { RequestCodeController } from "./usecases/request-code/RequestCodeController";
import { Mailer } from "../../infrastructure/Mailer";
import { RequestCodeUseCaseImpl } from "./usecases/request-code/RequestCodeUseCaseImpl";
import { OtpRepository } from "./database/OtpRepository";
import { OtpMapper } from "./database/OtpMapper";
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { OtpSchema } from "./database/OtpSchema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OtpSchema.name, schema: SchemaFactory.createForClass(OtpSchema) },
    ]),
  ],
  controllers: [RequestCodeController],
  providers: [Mailer, RequestCodeUseCaseImpl, OtpRepository, OtpMapper],
})
export class IdentityAndAccessModule {}
