import { Body, Controller, Inject, Param, Post } from "@nestjs/common";
import { IsAuthentic } from "@api/core/decorators/IsAuthenticDecorator";
import { AddReactionUseCaseImpl } from "@api/modules/conversations/usecases/add-reaction/AddReactionUseCaseImpl";
import { AddReactionUseCase } from "@api/modules/conversations/usecases/add-reaction/AddReactionUseCase";
import { AuthUser } from "@api/core/decorators/AuthUserDecorator";
import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";

@Controller("conversations")
@IsAuthentic()
export class AddReactionController {
  constructor(
    @Inject(AddReactionUseCaseImpl)
    private readonly addReactionUseCase: AddReactionUseCase
  ) {}

  @Post("reaction/:id")
  async addReaction(@Body() body: {
    messageId: string,
    reaction: string
  }, @Param("id") conversationId: string, @AuthUser() user: UserEntity) {
    await this.addReactionUseCase.execute({
      user,
      conversationId,
      ...body,
    })
  }
}
