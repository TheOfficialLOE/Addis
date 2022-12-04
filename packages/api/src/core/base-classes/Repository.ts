import { FilterQuery, Model } from "mongoose";
import { Mapper } from "./Mapper";
import { IdentifiableSchema } from "./IdentifiableSchema";
import { Entity as EntityClass } from "./Entity";
import { RepositoryPort } from "@api/core/base-classes/RepositoryPort";

export abstract class Repository<
  Schema extends IdentifiableSchema = IdentifiableSchema,
  Entity extends EntityClass = EntityClass,
> implements RepositoryPort<Schema, Entity>{
  protected constructor(
    protected readonly model: Model<Schema>,
    protected readonly mapper: Mapper<Schema, Entity>,
  ) {}

  public async create(entity: Entity): Promise<void> {
    /// todo: entity can't be null
    await new this.model(this.mapper.toSchema(entity)).save();
  }

  public async updateOne(entity: Entity): Promise<void> {
    await this.model.findByIdAndUpdate(entity.id, this.mapper.toSchema(entity));
  }

  public async findOne(
    entityFilterQuery?: FilterQuery<Schema>,
  ): Promise<Entity> {
    const entityDocument = await this.model.findOne(
      entityFilterQuery,
      {},
      {},
    );
    // if (!entityDocument) throw new Error("Entity was not found.");
    if (entityDocument)
      return this.mapper.toDomain(entityDocument);
  }

  public async find(
    entityFilterQuery?: FilterQuery<Schema>,
  ): Promise<Entity[]> {
    return (await this.model.find(entityFilterQuery,{}, {})).map(
      (entityDocument) => this.mapper.toDomain(entityDocument),
    );
  }
}
