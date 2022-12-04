import { IdentifiableSchema } from "./IdentifiableSchema";
import { Entity as EntityClass } from "./Entity";

export interface Mapper<
  Schema extends IdentifiableSchema,
  Entity extends EntityClass,
> {
  toSchema(entity: Entity): Schema;
  toDomain(schema: Schema): Entity;
}
