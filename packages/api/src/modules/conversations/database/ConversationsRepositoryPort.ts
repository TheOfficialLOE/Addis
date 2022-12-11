import { RepositoryPort } from "@api/core/base-classes/RepositoryPort";
import { ConversationSchema } from "@api/modules/conversations/database/ConversationSchema";
import { ConversationEntity } from "@api/modules/conversations/domain/ConversationEntity";

export interface ConversationsRepositoryPort extends RepositoryPort<ConversationSchema, ConversationEntity> {
  getList: (userId: string) => Promise<any[]>;
}
