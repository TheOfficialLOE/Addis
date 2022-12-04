import { Inject, Injectable } from "@nestjs/common";
import {
  CreateConversationPayload,
  CreateConversationUseCase,
} from "@api/modules/conversations/usecases/create-conversation/CreateConversationUseCase";
import { UserRepository } from "@api/modules/auth/database/user/UserRepository";
import { UserRepositoryPort } from "@api/modules/auth/database/user/UserRepositoryPort";
import { ConversationsRepository } from "@api/modules/conversations/database/ConversationsRepository";
import { ConversationsRepositoryPort } from "@api/modules/conversations/database/ConversationsRepositoryPort";
import { ConversationEntity } from "@api/modules/conversations/domain/ConversationEntity";
import { MessageEntity } from "@api/modules/conversations/domain/MessageEntity";

@Injectable()
export class CreateConversationUseCaseImpl implements CreateConversationUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepositoryPort,
    @Inject(ConversationsRepository)
    private readonly conversationRepository: ConversationsRepositoryPort
  ) {}

  async execute(payload: CreateConversationPayload): Promise<void> {
    const creator = await this.userRepository.findOne({
      _id: payload.creatorId
    });
    const recipient = await this.userRepository.findOne({
      _id: payload.recipientId
    });
    const conversation = ConversationEntity.new({
      creator,
      recipient
    });
    conversation.newMessage(MessageEntity.new({
      author: creator,
      content: payload.message
    }));
    await this.conversationRepository.create(conversation);
  }
}
