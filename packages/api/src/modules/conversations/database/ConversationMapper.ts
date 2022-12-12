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
        userA: this.userMapper.toDomain(schema.userA),
        userB: this.userMapper.toDomain(schema.userB),
        messages: schema.messages.map(message => this.messageMapper.toDomain(message)),
        lastMessage: this.messageMapper.toDomain(schema.lastMessage),
        lastMessageSeenTimeStampUserA: schema.lastMessageSeenTimeStampUserA,
        lastMessageSeenTimeStampUserB: schema.lastMessageSeenTimeStampUserB
      }
    });
  }

  toSchema(entity: ConversationEntity): ConversationSchema {
    return {
      _id: new Types.ObjectId(entity.id),
      userA: this.userMapper.toSchema(entity.userA),
      userB: this.userMapper.toSchema(entity.userB),
      messages: entity.messages.map(message => this.messageMapper.toSchema(message)),
      lastMessage: this.messageMapper.toSchema(entity.lastMessage),
      lastMessageSeenTimeStampUserA: entity.lastMessageSeenTimeStampUserA,
      lastMessageSeenTimeStampUserB: entity.lastMessageSeenTimeStampUserB
    };
  }
}
