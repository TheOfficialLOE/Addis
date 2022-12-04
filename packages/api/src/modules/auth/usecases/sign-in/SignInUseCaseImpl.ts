import { Inject, Injectable } from "@nestjs/common";
import { SignInUseCase } from "@api/modules/auth/usecases/sign-in/SignInUseCase";
import { UserRepository } from "@api/modules/auth/database/user/UserRepository";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UserSignedInEvent } from "@api/modules/auth/domain/events/UserSignedInEvent";
import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";
import { SignInRequestDto } from "@api/modules/auth/usecases/sign-in/SignInRequestDto";
import { UserRepositoryPort } from "@api/modules/auth/database/user/UserRepositoryPort";

@Injectable()
export class SignInUseCaseImpl implements SignInUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepositoryPort,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(payload: SignInRequestDto): Promise<void> {
    await this.signIn(payload);
    this.dispatchEvent(payload.email);
  }

  private async signIn(payload: SignInRequestDto): Promise<void> {
    const user = await this.findUser(payload.email);
    await this.checkUserExistence(user, payload);
  }

  private async findUser(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      email
    });
  }

  private async checkUserExistence(user: UserEntity, payload: SignInRequestDto) {
    if (user) {
      await this.unVerifyUser(user);
    }
    else
      await this.createUser(payload);
  }

  private async unVerifyUser(user: UserEntity): Promise<void> {
    user.unVerify();
    await this.userRepository.updateOne(user);
  }

  private async createUser(payload: SignInRequestDto): Promise<void> {
    const user = UserEntity.new({
      ...payload,
      isVerified: false
    });
    await this.userRepository.create(user);
  }

  private dispatchEvent(email: string): void {
    this.eventEmitter.emit(
      "user.signed-in",
      new UserSignedInEvent(email)
    );
  }
}
