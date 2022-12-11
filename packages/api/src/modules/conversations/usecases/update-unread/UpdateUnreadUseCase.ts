import { UseCase } from "@api/core/base-classes/UseCase";
import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";
import { ConversationEntity } from "@api/modules/conversations/domain/ConversationEntity";

export type UpdateUnreadUseCasePayload = {
  conversationId: string;
  user: UserEntity;
}

export interface UpdateUnreadUseCase extends UseCase<UpdateUnreadUseCasePayload, ConversationEntity> {

}
