import { Types } from "mongoose";

export abstract class IdentifiableSchema {
  public readonly _id: Types.ObjectId;
}
