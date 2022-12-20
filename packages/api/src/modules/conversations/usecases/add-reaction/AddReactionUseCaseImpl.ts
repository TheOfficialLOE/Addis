import { Inject, Injectable } from "@nestjs/common";
import {
  AddReactionUseCase,
  AddReactionUseCasePayload,
} from "@api/modules/conversations/usecases/add-reaction/AddReactionUseCase";
import { ConversationsRepository } from "@api/modules/conversations/database/ConversationsRepository";
import { ConversationsRepositoryPort } from "@api/modules/conversations/database/ConversationsRepositoryPort";
import { EmojiReaction } from "@api/modules/conversations/domain/MessageEntity";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class AddReactionUseCaseImpl implements AddReactionUseCase {
  constructor(
    @Inject(ConversationsRepository)
    private readonly conversationRepository: ConversationsRepositoryPort,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async execute(payload: AddReactionUseCasePayload): Promise<void> {
    const conversation = await this.conversationRepository.findOne({
      _id: payload.conversationId
    });
    const messageIndex = conversation.messages.findIndex(m => m.id === payload.messageId);
    conversation.messages[messageIndex].setReaction(payload.reaction as EmojiReaction);
    await this.conversationRepository.updateOne(conversation);
    this.eventEmitter.emit("reaction-added", {
      conversationId: payload.conversationId,
      messageId: payload.messageId,
      reaction: payload.reaction
    })
  }
}
