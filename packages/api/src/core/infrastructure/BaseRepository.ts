import { FilterQuery, Model } from "mongoose";
import { Mapper } from "../ddd/Mapper";
import { IdentifiableSchema } from "./IdentifiableSchema";
import { Entity as EntityClass } from "../ddd/BaseEntity";

export abstract class Repository<
  Schema extends IdentifiableSchema = IdentifiableSchema,
  Entity extends EntityClass = EntityClass,
> {
  protected constructor(
    protected readonly model: Model<Schema>,
    protected readonly mapper: Mapper<Schema, Entity>,
  ) {}

  public async create(entity: Entity): Promise<void> {
    await new this.model(this.mapper.toSchema(entity)).save();
  }

  public async findOne(
    entityFilterQuery?: FilterQuery<Schema>,
  ): Promise<Entity> {
    const entityDocument = await this.model.findOne(
      entityFilterQuery,
      {},
      { lean: true },
    );
    // if (!entityDocument) throw new Error("Entity was not found.");
    if (entityDocument)
      return this.mapper.toDomain(entityDocument);
  }

  public async find(
    entityFilterQuery?: FilterQuery<Schema>,
  ): Promise<Entity[]> {
    return (await this.model.find(entityFilterQuery, {}, { lean: true })).map(
      (entityDocument) => this.mapper.toDomain(entityDocument),
    );
  }
}
