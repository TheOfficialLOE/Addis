import { Mapper } from "@api/core/base-classes/Mapper";
import { ConversationSchema } from "@api/modules/conversations/database/ConversationSchema";
import { ConversationEntity } from "@api/modules/conversations/domain/ConversationEntity";
import { Types } from "mongoose";
import { Injectable } from "@nestjs/common";
import { UserMapper } from "@api/modules/auth/database/user/UserMapper";
import { MessageMapper } from "@api/modules/conversations/database/MessageMapper";

@Injectable()
export class ConversationMapper implements Mapper<ConversationSchema, ConversationEntity> {
  constructor(
    private readonly userMapper: UserMapper,
    private readonly messageMapper: MessageMapper
  ) {}

  toDomain(schema: ConversationSchema): ConversationEntity {
    return new ConversationEntity({
      id: schema._id.toString(),
      props: {
        creator: this.userMapper.toDomain(schema.creator),
        recipient: this.userMapper.toDomain(schema.recipient),
        messages: schema.messages ? schema.messages.map(message => this.messageMapper.toDomain(message)) : [],
      }
    });
  }

  toSchema(entity: ConversationEntity): ConversationSchema {
    return {
      _id: new Types.ObjectId(entity.id),
      creator: this.userMapper.toSchema(entity.creator),
      recipient: this.userMapper.toSchema(entity.recipient),
      messages: entity.messages ? entity.messages.map(message => this.messageMapper.toSchema(message)): [],
    };
  }
}
