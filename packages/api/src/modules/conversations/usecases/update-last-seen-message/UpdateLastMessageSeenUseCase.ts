import { UseCase } from "@api/core/base-classes/UseCase";
import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";

export type UpdateLastMessageSeenUseCasePayload = {
  conversationId: string;
  user: UserEntity;
}

export interface UpdateLastMessageSeenUseCase extends UseCase<UpdateLastMessageSeenUseCasePayload, void> {

}
