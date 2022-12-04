import { UseCase } from "@api/core/base-classes/UseCase";
import {
  CreateConversationRequestDto
} from "@api/modules/conversations/usecases/create-conversation/CreateConversationRequestDto";

export type CreateConversationPayload = CreateConversationRequestDto & {
  creatorId: string;
}

export interface CreateConversationUseCase extends UseCase<CreateConversationPayload, void> {

}
