import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { IdentityAndAccessModule } from "./modules/identity-and-access/IdentityAndAccessModule";
import { Gateway } from "./modules/gateway/Gateway";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/morad-chat"),
    IdentityAndAccessModule,
  ],
  providers: [Gateway]
})
export class AppModule {}
