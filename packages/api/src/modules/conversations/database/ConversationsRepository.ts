import { Repository } from "@api/core/base-classes/Repository";
import { ConversationSchema } from "@api/modules/conversations/database/ConversationSchema";
import { ConversationEntity } from "@api/modules/conversations/domain/ConversationEntity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConversationMapper } from "@api/modules/conversations/database/ConversationMapper";
import {
  ConversationsRepositoryPort,
} from "@api/modules/conversations/database/ConversationsRepositoryPort";

export class ConversationsRepository
  extends Repository<ConversationSchema, ConversationEntity>
  implements ConversationsRepositoryPort {
  constructor(
    @InjectModel(ConversationSchema.name)
    model: Model<ConversationSchema>,
    mapper: ConversationMapper
  ) {
    super(model, mapper);
  }

  async find(): Promise<ConversationEntity[]> {
    const conversations = await this.model.find()
      .slice("messages", -1);
    /// todo: conversations can't be null
    return conversations.map(conversation => this.mapper.toDomain(conversation));
  }
}
