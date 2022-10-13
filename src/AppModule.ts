import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { IdentityAndAccessModule } from "./modules/identity-and-access/IdentityAndAccessModule";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/morad-chat"),
    IdentityAndAccessModule,
  ],
})
export class AppModule {}
