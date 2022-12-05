import { Types } from "mongoose";
import { convertPropsToObject } from "@api/core/util/convertPropsToPlain";

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

  public equals(target: Entity): boolean {
    return this.id === target.id;
  }

  public toPlain() {
    const plainProps = convertPropsToObject(this.props);
    return {
      id: this._id.toString(),
      ...plainProps,
    };
  }
}
