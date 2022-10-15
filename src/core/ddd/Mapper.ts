import { IdentifiableSchema } from "../infrastructure/IdentifiableSchema";
import { Entity as EntityClass } from "./BaseEntity";

export interface Mapper<
  Schema extends IdentifiableSchema,
  Entity extends EntityClass,
> {
  toSchema(entity: Entity): Schema;
  toDomain(schema: Schema): Entity;
}
