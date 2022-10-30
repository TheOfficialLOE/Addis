import { Mapper } from "@api/core/ddd/Mapper";
import { OtpSchema } from "./OtpSchema";
import { OtpEntity } from "../domain/OtpEntity";
import { Types } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OtpMapper implements Mapper<OtpSchema, OtpEntity> {
  toDomain(schema: OtpSchema): OtpEntity {
    return new OtpEntity({
      id: schema._id.toHexString(),
      props: {
        code: schema.code,
        issuedEmail: schema.issuedEmail,
        generatedAt: schema.generatedAt,
      },
    });
  }

  toSchema(entity: OtpEntity): OtpSchema {
    return {
      _id: new Types.ObjectId(entity.id),
      code: entity.code,
      issuedEmail: entity.issuedEmail,
      generatedAt: entity.generatedAt,
    };
  }
}
