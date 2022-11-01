import { Injectable } from "@nestjs/common";
import { Repository } from "@api/core/infrastructure/BaseRepository";
import { OtpSchema } from "./OtpSchema";
import { OtpEntity } from "../domain/OtpEntity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OtpMapper } from "./OtpMapper";

@Injectable()
export class OtpRepository extends Repository<OtpSchema, OtpEntity> {
  constructor(
    @InjectModel(OtpSchema.name)
    readonly otpModel: Model<OtpSchema>,
    readonly otpMapper: OtpMapper,
  ) {
    super(otpModel, otpMapper);
  }
}
