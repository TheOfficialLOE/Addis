import { Entity } from "../../../core/ddd/BaseEntity";

interface UserEntityProps {
  email: string;
  username?: string;
}

export class UserEntity extends Entity<UserEntityProps> {
  public static new(email: string): UserEntity {
    return new UserEntity({ props: { email } });
  }

  get email(): string {
    return this.props.email;
  }

  get username(): string {
    return this.props.username;
  }
}
