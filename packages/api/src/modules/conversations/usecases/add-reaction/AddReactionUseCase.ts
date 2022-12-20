import { UseCase } from "@api/core/base-classes/UseCase";
import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";

export type AddReactionUseCasePayload = {
  user: UserEntity,
  conversationId: string,
  messageId: string,
  reaction: string
}

export interface AddReactionUseCase extends UseCase<AddReactionUseCasePayload, void> {

}
