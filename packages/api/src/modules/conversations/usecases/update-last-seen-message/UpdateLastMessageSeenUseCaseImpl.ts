import { Inject, Injectable } from "@nestjs/common";
import {
  UpdateLastMessageSeenUseCase, UpdateLastMessageSeenUseCasePayload,
} from "@api/modules/conversations/usecases/update-last-seen-message/UpdateLastMessageSeenUseCase";
import { ConversationsRepository } from "@api/modules/conversations/database/ConversationsRepository";
import { ConversationsRepositoryPort } from "@api/modules/conversations/database/ConversationsRepositoryPort";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class UpdateLastMessageSeenUseCaseImpl implements UpdateLastMessageSeenUseCase {
  constructor(
    @Inject(ConversationsRepository)
    private readonly conversationRepository: ConversationsRepositoryPort,
    private readonly eventEmitter: EventEmitter2
  ) {}
  async execute(payload: UpdateLastMessageSeenUseCasePayload): Promise<void> {
    const conversation = await this.conversationRepository.findOne({
      _id: payload.conversationId
    });
    conversation.setLastMessageSeenTimeStampForUser(payload.user);
    await this.conversationRepository.updateOne(conversation);
    this.eventEmitter.emit("messages-seen", {
      conversationId: payload.conversationId,
      userId: payload.user.id
    });
  }
}
