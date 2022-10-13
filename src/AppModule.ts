import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost/morad-chat")],
})
export class AppModule {}
