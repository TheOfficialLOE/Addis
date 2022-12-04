import { IdentifiableSchema } from "@api/core/base-classes/IdentifiableSchema";
import { Entity as EntityClass } from "@api/core/base-classes/Entity";
import { FilterQuery } from "mongoose";

export interface RepositoryPort<Schema extends IdentifiableSchema, Entity extends EntityClass> {
  create(entity: Entity): Promise<void>;
  updateOne(entity: Entity): Promise<void>;
  findOne(entityFilterQuery?: FilterQuery<Schema>): Promise<Entity>;
  find(entityFilterQuery?: FilterQuery<Schema>): Promise<Entity[]>;
}
