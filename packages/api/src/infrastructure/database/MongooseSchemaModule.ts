import { DynamicModule, Module } from "@nestjs/common";
import { ModelDefinition, MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { createMongooseProviders } from "@nestjs/mongoose/dist/mongoose.providers";

@Module({})
export class MongooseSchemaModule {
  public static forSchema(
    schemas: any[] = [],
    connectionName?: string
  ): DynamicModule {
    const models: ModelDefinition[] = schemas.map(schema => {
      const foo = SchemaFactory.createForClass(schema);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      foo.plugin(require("mongoose-autopopulate"));
      return {
        name: schema.name,
        schema: foo
      };
    });
    const providers = createMongooseProviders(connectionName, models);
    return {
      module: MongooseModule,
      providers: providers,
      exports: providers,
    }
  }
}
