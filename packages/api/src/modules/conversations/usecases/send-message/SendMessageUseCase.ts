import { UseCase } from "@api/core/base-classes/UseCase";
import { SendMessageRequestDto } from "@api/modules/conversations/usecases/send-message/SendMessageRequestDto";
import { MessageEntity } from "@api/modules/conversations/domain/MessageEntity";
import { ConversationEntity } from "@api/modules/conversations/domain/ConversationEntity";

export type SendMessageUseCasePayload = SendMessageRequestDto & {
  authorId: string,
  conversationId: string
}

export type SendMessageUseCaseResponse = {
  conversation: ConversationEntity,
  message: MessageEntity
};

export interface SendMessageUseCase extends UseCase<SendMessageUseCasePayload, SendMessageUseCaseResponse> {

}
