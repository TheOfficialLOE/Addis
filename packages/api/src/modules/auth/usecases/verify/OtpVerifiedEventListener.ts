import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "@api/modules/auth/database/user/UserRepository";
import { OnEvent } from "@nestjs/event-emitter";
import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";
import { CoreAssert } from "@api/core/util/CoreAssert";
import { Exception } from "@api/core/base-classes/Exception";
import { Code } from "@api/core/client-response/Code";
import { OtpVerifiedEvent } from "@api/modules/auth/domain/events/OtpVerifiedEvent";
import { UserRepositoryPort } from "@api/modules/auth/database/user/UserRepositoryPort";

@Injectable()
export class OtpVerifiedEventListener {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepositoryPort
  ) {}

  @OnEvent("otp.verified")
  async listen(event: OtpVerifiedEvent) {
    const user = await this.findUserOrThrow(event.email);
    await this.markUserAsVerified(user);
  }

  private async findUserOrThrow(email: string): Promise<UserEntity> {
    return CoreAssert.notEmpty(
      await this.userRepository.findOne({ email }),
      Exception.new({ code: Code.NOT_FOUND_ERROR, overrideMessage: "User not found." })
    );
  }

  private async markUserAsVerified(user: UserEntity) {
    user.markVerified();
    await this.userRepository.updateOne(user);
  }
}
