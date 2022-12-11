import { Inject, Injectable } from "@nestjs/common";
import {
  UpdateUnreadUseCase,
  UpdateUnreadUseCasePayload,
} from "@api/modules/conversations/usecases/update-unread/UpdateUnreadUseCase";
import { ConversationsRepositoryPort } from "@api/modules/conversations/database/ConversationsRepositoryPort";
import { ConversationsRepository } from "@api/modules/conversations/database/ConversationsRepository";
import { ConversationEntity } from "@api/modules/conversations/domain/ConversationEntity";

@Injectable()
export class UpdateUnreadUseCaseImpl implements UpdateUnreadUseCase {
  constructor(
    @Inject(ConversationsRepository)
    private readonly conversationRepository: ConversationsRepositoryPort
  ) {}

  async execute(payload: UpdateUnreadUseCasePayload): Promise<ConversationEntity> {
    const conversation = await this.conversationRepository.findOne({
      _id: payload.conversationId
    });
    conversation.markAsReadBy(payload.user);
    await this.conversationRepository.updateOne(conversation);
    return conversation;
  }
}
