import { Injectable } from "@nestjs/common";
import { Repository } from "@api/core/base-classes/Repository";
import { Model } from "mongoose";
import { UserSchema } from "@api/modules/auth/database/user/UserSchema";
import { InjectModel } from "@nestjs/mongoose";
import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";
import { UserMapper } from "@api/modules/auth/database/user/UserMapper";
import { UserRepositoryPort } from "@api/modules/auth/database/user/UserRepositoryPort";

@Injectable()
export class UserRepository extends Repository<UserSchema, UserEntity> implements UserRepositoryPort {
  constructor(
    @InjectModel(UserSchema.name)
    model: Model<UserSchema>,
    mapper: UserMapper
  ) {
    super(model, mapper);
  }
}
