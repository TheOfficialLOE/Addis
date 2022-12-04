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

@Controller("conversations")
@IsAuthentic()
export class GetConversationsController {
  constructor(
    @Inject(ConversationsRepository)
    private readonly conversationRepository: ConversationsRepositoryPort,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @Get("list")
  async getConversationsList() {
    const conversations: ConversationListItemResponseDto[] = (await this.conversationRepository.find())
      .map(conversation => ConversationListItemResponseDto.new(conversation));
    return CoreApiResponse.success(conversations);
  }

  @Get("/:id")
  async getConversation(@Param("id") conversationId: string) {
    const conversation = GetConversationByIdResponseDto.new(
      await this.conversationRepository.findOne({ _id: conversationId })
    );
    return CoreApiResponse.success(conversation);
  }
}
