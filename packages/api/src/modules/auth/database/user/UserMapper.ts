import { Injectable } from "@nestjs/common";
import { Mapper } from "@api/core/base-classes/Mapper";
import { UserSchema } from "@api/modules/auth/database/user/UserSchema";
import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";
import { Types } from "mongoose";

@Injectable()
export class UserMapper implements Mapper<UserSchema, UserEntity> {
  toDomain(schema: UserSchema): UserEntity {
    return new UserEntity({
      id: schema._id.toString(),
      props: {
        email: schema.email,
        name: schema.name,
        username: schema.username,
        isVerified: schema.isVerified
      }
    });
  }

  toSchema(entity: UserEntity): UserSchema {
    return {
      _id: new Types.ObjectId(entity.id),
      email: entity.email,
      name: entity.name,
      username: entity.username,
      isVerified: entity.isVerified,
    };
  }
}
