import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";

export class GetMeResponseDto {
  id: string;

  email: string;

  name: string;

  username?: string;

  public static new(user: UserEntity): GetMeResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
    }
  }
}
