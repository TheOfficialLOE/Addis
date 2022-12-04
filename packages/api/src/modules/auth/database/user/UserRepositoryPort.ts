import { RepositoryPort } from "@api/core/base-classes/RepositoryPort";
import { UserSchema } from "@api/modules/auth/database/user/UserSchema";
import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";

export interface UserRepositoryPort extends RepositoryPort<UserSchema, UserEntity> {

}
