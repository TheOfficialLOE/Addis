import { Injectable } from "@nestjs/common";
import { OtpMapper } from "@api/modules/identity-and-access/database/OtpMapper";
import { InjectModel } from "@nestjs/mongoose";
import { OtpSchema } from "@api/modules/identity-and-access/database/OtpSchema";
import { Model } from "mongoose";
import { Repository } from "@api/core/infrastructure/BaseRepository";
import { OtpEntity } from "@api/modules/identity-and-access/domain/OtpEntity";

@Injectable()
export class OtpRepository extends Repository<OtpSchema, OtpEntity> {
  constructor(
    @InjectModel(OtpSchema.name)
    readonly model: Model<OtpSchema>,
    readonly mapper: OtpMapper
  ) {
    super(model, mapper);
  }
}
