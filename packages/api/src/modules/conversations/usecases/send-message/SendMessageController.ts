import { Body, Controller, Inject, Param, Post } from "@nestjs/common";
import { SendMessageUseCaseImpl } from "@api/modules/conversations/usecases/send-message/SendMessageUseCaseImpl";
import { SendMessageUseCase } from "@api/modules/conversations/usecases/send-message/SendMessageUseCase";
import { IsAuthentic } from "@api/core/decorators/IsAuthenticDecorator";
import { AuthUser } from "@api/core/decorators/AuthUserDecorator";
import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";
import { SendMessageRequestDto } from "@api/modules/conversations/usecases/send-message/SendMessageRequestDto";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Controller("conversations")
@IsAuthentic()
export class SendMessageController {
  constructor(
    @Inject(SendMessageUseCaseImpl)
    private readonly sendMessageUseCase: SendMessageUseCase,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @Post(":id")
  async sendMessage(
    @AuthUser() user: UserEntity,
    @Param("id") conversationId: string,
    @Body() body: SendMessageRequestDto
  ) {
    const { conversation, message } = await this.sendMessageUseCase.execute({
      conversationId,
      authorId: user.id,
      ...body
    });
    this.eventEmitter.emit("message-created", {
      conversation,
      message
    });
  }
}
