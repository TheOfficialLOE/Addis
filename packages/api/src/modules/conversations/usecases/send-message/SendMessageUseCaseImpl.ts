import {
  SendMessageUseCase,
  SendMessageUseCasePayload, SendMessageUseCaseResponse,
} from "@api/modules/conversations/usecases/send-message/SendMessageUseCase";
import { Inject, Injectable } from "@nestjs/common";
import { ConversationsRepository } from "@api/modules/conversations/database/ConversationsRepository";
import { ConversationsRepositoryPort } from "@api/modules/conversations/database/ConversationsRepositoryPort";
import { UserRepository } from "@api/modules/auth/database/user/UserRepository";
import { UserRepositoryPort } from "@api/modules/auth/database/user/UserRepositoryPort";
import { MessageEntity } from "@api/modules/conversations/domain/MessageEntity";

@Injectable()
export class SendMessageUseCaseImpl implements SendMessageUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepositoryPort,
    @Inject(ConversationsRepository)
    private readonly conversationRepository: ConversationsRepositoryPort
  ) {}

  async execute(payload: SendMessageUseCasePayload): Promise<SendMessageUseCaseResponse> {
    const author = await this.userRepository.findOne({
      _id: payload.authorId
    });
    const conversation = await this.conversationRepository.findOne({
      _id: payload.conversationId
    });
    const message = MessageEntity.new({
      author,
      content: payload.message
    });
    conversation.newMessage(message);
    await this.conversationRepository.updateOne(conversation);
    return {
      conversation,
      message
    };
  }
}
