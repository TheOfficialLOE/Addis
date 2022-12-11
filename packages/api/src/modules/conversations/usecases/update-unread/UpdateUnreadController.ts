import { Controller, Inject, Param, Post } from "@nestjs/common";
import { UpdateUnreadUseCaseImpl } from "@api/modules/conversations/usecases/update-unread/UpdateUnreadUseCaseImpl";
import { UpdateUnreadUseCase } from "@api/modules/conversations/usecases/update-unread/UpdateUnreadUseCase";
import { AuthUser } from "@api/core/decorators/AuthUserDecorator";
import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";
import { IsAuthentic } from "@api/core/decorators/IsAuthenticDecorator";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Controller("conversations")
@IsAuthentic()
export class UpdateUnreadController {
  constructor(
    @Inject(UpdateUnreadUseCaseImpl)
    private readonly updateUnreadUseCase: UpdateUnreadUseCase,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @Post("mark-as-read/:id")
  async markAsRead(@Param("id") conversationId: string, @AuthUser() user: UserEntity) {
    const conversation = await this.updateUnreadUseCase.execute({
      conversationId,
      user
    });
    this.eventEmitter.emit("messages.read", {
      conversation,
      user
    })
  }
}
