import { Repository } from "@api/core/base-classes/Repository";
import { ConversationSchema } from "@api/modules/conversations/database/ConversationSchema";
import { ConversationEntity } from "@api/modules/conversations/domain/ConversationEntity";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
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
    mapper: ConversationMapper,
  ) {
    super(model, mapper);
  }


  async getList(
    userId: string,
  ): Promise<ConversationEntity[]> {

    const conversations = await this.model.aggregate([
      {
      $match: {
        $or: [
          {
            userA: new Types.ObjectId(userId),
          },
          {
            userB: new Types.ObjectId(userId),
          },
        ]},
      },
      {
        $sort: { "messages.sentAt": -1 }
      },
      {
        $lookup: {
          from: "users",
          localField: "userA",
          foreignField: "_id",
          as: "userA",
        },
      },
      {
        $unwind: "$userA",
      },
      {
        $lookup: {
          from: "users",
          localField: "userB",
          foreignField: "_id",
          as: "userB",
        },
      },
      {
        $unwind: "$userB",
      },
      {
        $project: {
          userA: 1,
          userB: 1,
          lastMessage: 1,
          unread: {
            $size: {
              $filter: {
                input: "$messages",
                as: "message",
                cond: {
                  $or: [
                    {
                      $and: [
                        {
                          $eq: ["$userA._id", new Types.ObjectId(userId)]
                        },
                        {
                          $ne: ["$$message.author", new Types.ObjectId(userId)]
                        },
                        {
                          $lte: ["$lastMessageSeenTimeStampUserA", "$$message.sentAt"]
                        }
                      ]
                    },
                    {
                      $and: [
                        {
                          $eq: ["$userB._id", new Types.ObjectId(userId)]
                        },
                        {
                          $ne: ["$$message.author", new Types.ObjectId(userId)]
                        },
                        {
                          $lte: ["$lastMessageSeenTimeStampUserB", "$$message.sentAt"]
                        }
                      ]
                    }
                  ],
                },
              },
            },
          },
        },
      },
    ]);
    return conversations;
  }
}
