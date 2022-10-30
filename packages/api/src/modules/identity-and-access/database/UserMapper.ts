import { Mapper } from "@api/core/ddd/Mapper";
import { UserSchema } from "./UserSchema";
import { UserEntity } from "../domain/UserEntity";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";

@Injectable()
export class UserMapper implements Mapper<UserSchema, UserEntity> {
  public toDomain(schema: UserSchema): UserEntity {
    return new UserEntity({
      id: schema._id.toHexString(),
      props: {
        email: schema.email,
        username: schema.username,
      }
    });
  }

  public toSchema(entity: UserEntity): UserSchema {
    return {
      _id: new Types.ObjectId(entity.id),
      email: entity.email,
      username: entity.username,
    };
  }
}
