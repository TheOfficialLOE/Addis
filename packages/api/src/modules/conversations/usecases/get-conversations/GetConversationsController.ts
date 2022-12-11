import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ConversationsRepository } from "@api/modules/conversations/database/ConversationsRepository";
import { CoreApiResponse } from "@api/core/client-response/CoreApiResponse";
import {
  ConversationListItemResponseDto,
} from "@api/modules/conversations/usecases/get-conversations/ConversationListItemResponseDto";
import {
  GetConversationByIdResponseDto
} from "@api/modules/conversations/usecases/get-conversations/GetConversationByIdResponseDto";
import { IsAuthentic } from "@api/core/decorators/IsAuthenticDecorator";
import { ConversationsRepositoryPort } from "@api/modules/conversations/database/ConversationsRepositoryPort";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { AuthUser } from "@api/core/decorators/AuthUserDecorator";
import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";

@Controller("conversations")
@IsAuthentic()
export class GetConversationsController {
  constructor(
    @Inject(ConversationsRepository)
    private readonly conversationRepository: ConversationsRepositoryPort,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @Get("list")
  async getConversationsList(
    @AuthUser() user: UserEntity
  ) {
    // const conversations: ConversationListItemResponseDto[] = (await this.conversationRepository.find({
    //   $or: [{
    //     creator: user.id
    //   }, {
    //     recipient: user.id
    //   }]
    // }))
    //   .map(conversation => ConversationListItemResponseDto.new(conversation));
    // return CoreApiResponse.success(conversations);
    return (await this.conversationRepository.getList(user.id))
      .map(conversation => ConversationListItemResponseDto.new(conversation));
  }

  @Get("/:id")
  async getConversation(@Param("id") conversationId: string, @AuthUser() user: UserEntity) {
    const conversation = await this.conversationRepository.findOne({ _id: conversationId });
    return CoreApiResponse.success(GetConversationByIdResponseDto.new(conversation));
  }
}
