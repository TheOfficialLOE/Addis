import { Types } from "mongoose";

export interface BaseEntityProps<T> {
  id?: string;
  props: T;
}

export abstract class Entity<EntityProps = any> {
  constructor({ id, props }: BaseEntityProps<EntityProps>) {
    this._id = id || new Types.ObjectId().toHexString();
    this.props = props;
  }

  protected readonly _id: string;
  protected readonly props: EntityProps;

  public get id(): string {
    return this._id;
  }

  public equals(): boolean {
    /// todo
    return true;
  }
}
