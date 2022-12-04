import { Entity } from "@api/core/base-classes/Entity";

interface UserEntityProps {
  email: string;
  name: string;
  username?: string;
  isVerified: boolean;
}

export class UserEntity extends Entity<UserEntityProps> {
  public static new(props: UserEntityProps): UserEntity {
    return new UserEntity({ props });
  }

  public get email(): string {
    return this.props.email;
  }

  public get name(): string {
    return this.props.name;
  }

  public get username(): string {
    return this.props.username;
  }

  public get isVerified(): boolean {
    return this.props.isVerified;
  }

  public markVerified(): void {
    this.props.isVerified = true;
  }

  public unVerify(): void {
    this.props.isVerified = false;
  }
}
