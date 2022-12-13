import { Controller, Inject, Param, Post } from "@nestjs/common";
import {
  UpdateLastMessageSeenUseCaseImpl
} from "@api/modules/conversations/usecases/update-last-seen-message/UpdateLastMessageSeenUseCaseImpl";
import {
  UpdateLastMessageSeenUseCase
} from "@api/modules/conversations/usecases/update-last-seen-message/UpdateLastMessageSeenUseCase";
import { AuthUser } from "@api/core/decorators/AuthUserDecorator";
import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { IsAuthentic } from "@api/core/decorators/IsAuthenticDecorator";

@Controller("conversations")
@IsAuthentic()
export class UpdateLastMessageSeenController {
  constructor(
    @Inject(UpdateLastMessageSeenUseCaseImpl)
    private readonly updateLastMessageSeenUseCase: UpdateLastMessageSeenUseCase,
    private readonly eventEmitter: EventEmitter2
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
    this.eventEmitter.emit("messages-seen", {
      conversationId,
      userId: user.id
    });
  }
}
