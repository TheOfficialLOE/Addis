import { Mapper } from "@api/core/base-classes/Mapper";
import { ConversationSchema } from "@api/modules/conversations/database/ConversationSchema";
import { ConversationEntity } from "@api/modules/conversations/domain/ConversationEntity";
import { MessageEntity } from "@api/modules/conversations/domain/MessageEntity";
import { Types } from "mongoose";
import { MessagesSchema } from "@api/modules/conversations/database/MessageSchema";
import { Injectable } from "@nestjs/common";
import { UserMapper } from "@api/modules/auth/database/user/UserMapper";

@Injectable()
export class ConversationMapper implements Mapper<ConversationSchema, ConversationEntity> {
  constructor(
    private readonly userMapper: UserMapper
  ) {}

  toDomain(schema: ConversationSchema): ConversationEntity {
    const messages: MessageEntity[] = schema.messages.map(message => new MessageEntity({
      id: message._id.toString(),
      props: {
        author: this.userMapper.toDomain(message.author),
        content: message.content,
        isSeen: message.isSeen,
        sentAt: message.sentAt
      }
    }));
    return new ConversationEntity({
      id: schema._id.toString(),
      props: {
        creator: this.userMapper.toDomain(schema.creator),
        recipient: this.userMapper.toDomain(schema.recipient),
        messages
      }
    });
  }

  toSchema(entity: ConversationEntity): ConversationSchema {
    const messages: MessagesSchema[] = entity.messages.map(message => ({
      _id: new Types.ObjectId(message.id),
      author: this.userMapper.toSchema(message.author),
      content: message.content,
      isSeen: message.isSeen,
      sentAt: message.sentAt
    }));
    return {
      _id: new Types.ObjectId(entity.id),
      creator: this.userMapper.toSchema(entity.creator),
      recipient: this.userMapper.toSchema(entity.recipient),
      messages
    };
  }
}
