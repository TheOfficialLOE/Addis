import { Injectable } from "@nestjs/common";
import { Mapper } from "@api/core/base-classes/Mapper";
import { MessagesSchema } from "@api/modules/conversations/database/MessageSchema";
import { MessageEntity } from "@api/modules/conversations/domain/MessageEntity";
import { UserMapper } from "@api/modules/auth/database/user/UserMapper";
import { Types } from "mongoose";

@Injectable()
export class MessageMapper implements Mapper<MessagesSchema, MessageEntity> {
  constructor(
    private readonly userMapper: UserMapper
  ) {}

  toDomain(schema: MessagesSchema): MessageEntity {
    return new MessageEntity({
      id: schema._id.toString(),
      props: {
        author: this.userMapper.toDomain(schema.author),
        content: schema.content,
        isSeen: schema.isSeen,
        sentAt: schema.sentAt
      }
    });
  }

  toSchema(entity: MessageEntity): MessagesSchema {
    return {
      _id: new Types.ObjectId(entity.id),
      author: this.userMapper.toSchema(entity.author),
      content: entity.content,
      isSeen: entity.isSeen,
      sentAt: entity.sentAt
    };
  }
}
