import { Inject, Injectable } from "@nestjs/common";
import {
  UpdateLastMessageSeenUseCase, UpdateLastMessageSeenUseCasePayload,
} from "@api/modules/conversations/usecases/update-last-seen-message/UpdateLastMessageSeenUseCase";
import { ConversationsRepository } from "@api/modules/conversations/database/ConversationsRepository";
import { ConversationsRepositoryPort } from "@api/modules/conversations/database/ConversationsRepositoryPort";

@Injectable()
export class UpdateLastMessageSeenUseCaseImpl implements UpdateLastMessageSeenUseCase {
  constructor(
    @Inject(ConversationsRepository)
    private readonly conversationRepository: ConversationsRepositoryPort
  ) {}
  async execute(payload: UpdateLastMessageSeenUseCasePayload): Promise<void> {
    const conversation = await this.conversationRepository.findOne({
      _id: payload.conversationId
    });
    conversation.setLastMessageSeenTimeStampForUser(payload.user);
    await this.conversationRepository.updateOne(conversation);
  }
}
