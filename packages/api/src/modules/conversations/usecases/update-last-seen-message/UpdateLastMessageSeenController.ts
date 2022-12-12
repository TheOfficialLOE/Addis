import { Controller, Inject, Param, Post } from "@nestjs/common";
import {
  UpdateLastMessageSeenUseCaseImpl
} from "@api/modules/conversations/usecases/update-last-seen-message/UpdateLastMessageSeenUseCaseImpl";
import {
  UpdateLastMessageSeenUseCase
} from "@api/modules/conversations/usecases/update-last-seen-message/UpdateLastMessageSeenUseCase";
import { AuthUser } from "@api/core/decorators/AuthUserDecorator";
import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";

@Controller("conversations")
export class UpdateLastMessageSeenController {
  constructor(
    @Inject(UpdateLastMessageSeenUseCaseImpl)
    private readonly updateLastMessageSeenUseCase: UpdateLastMessageSeenUseCase
  ) {}

  @Post("update-last-seen-message/:id")
  async updateLastSeenMessage(
    @Param("id") conversationId: string,
    @AuthUser() user: UserEntity
  ) {
    await this.updateLastMessageSeenUseCase.execute({
      conversationId,
      user
    });
  }
}
