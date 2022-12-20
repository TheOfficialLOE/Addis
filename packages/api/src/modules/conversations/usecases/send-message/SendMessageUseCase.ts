import { UseCase } from "@api/core/base-classes/UseCase";
import { SendMessageRequestDto } from "@api/modules/conversations/usecases/send-message/SendMessageRequestDto";

export type SendMessageUseCasePayload = SendMessageRequestDto & {
  conversationId: string
  authorId: string,
}

export interface SendMessageUseCase extends UseCase<SendMessageUseCasePayload, void> {

}
