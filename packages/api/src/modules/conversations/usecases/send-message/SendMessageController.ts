import { Body, Controller, Inject, Param, Post } from "@nestjs/common";
import { SendMessageUseCaseImpl } from "@api/modules/conversations/usecases/send-message/SendMessageUseCaseImpl";
import { SendMessageUseCase } from "@api/modules/conversations/usecases/send-message/SendMessageUseCase";
import { IsAuthentic } from "@api/core/decorators/IsAuthenticDecorator";
import { AuthUser } from "@api/core/decorators/AuthUserDecorator";
import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";
import { SendMessageRequestDto } from "@api/modules/conversations/usecases/send-message/SendMessageRequestDto";

@Controller("conversations")
@IsAuthentic()
export class SendMessageController {
  constructor(
    @Inject(SendMessageUseCaseImpl)
    private readonly sendMessageUseCase: SendMessageUseCase,
  ) {}

  @Post(":id")
  async sendMessage(
    @AuthUser() user: UserEntity,
    @Param("id") conversationId: string,
    @Body() body: SendMessageRequestDto
  ) {
    await this.sendMessageUseCase.execute({
      conversationId,
      authorId: user.id,
      ...body
    });
  }
}
