import { Injectable } from "@nestjs/common";
import { OtpMapper } from "@api/modules/auth/database/otp/OtpMapper";
import { InjectModel } from "@nestjs/mongoose";
import { OtpSchema } from "@api/modules/auth/database/otp/OtpSchema";
import { Model } from "mongoose";
import { Repository } from "@api/core/base-classes/Repository";
import { OtpEntity } from "@api/modules/auth/domain/otp/OtpEntity";
import { OtpRepositoryPort } from "@api/modules/auth/database/otp/OtpRepositoryPort";

@Injectable()
export class OtpRepository extends Repository<OtpSchema, OtpEntity> implements OtpRepositoryPort {
  constructor(
    @InjectModel(OtpSchema.name)
    model: Model<OtpSchema>,
    mapper: OtpMapper
  ) {
    super(model, mapper);
  }
}
