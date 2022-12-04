import { Body, Controller, Inject, Post } from "@nestjs/common";
import {
  CreateConversationUseCaseImpl
} from "@api/modules/conversations/usecases/create-conversation/CreateConversationUseCaseImpl";
import {
  CreateConversationUseCase
} from "@api/modules/conversations/usecases/create-conversation/CreateConversationUseCase";
import { IsAuthentic } from "@api/core/decorators/IsAuthenticDecorator";
import { AuthUser } from "@api/core/decorators/AuthUserDecorator";
import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";
import {
  CreateConversationRequestDto
} from "@api/modules/conversations/usecases/create-conversation/CreateConversationRequestDto";

@Controller("conversations")
@IsAuthentic()
export class CreateConversationController {
  constructor(
    @Inject(CreateConversationUseCaseImpl)
    private readonly createConversationUseCase: CreateConversationUseCase
  ) {}

  @Post()
  async createConversation(
    @AuthUser() user: UserEntity,
    @Body() body: CreateConversationRequestDto
  ) {
    await this.createConversationUseCase.execute({
      creatorId: user.id,
      ...body
    });
  }
}
