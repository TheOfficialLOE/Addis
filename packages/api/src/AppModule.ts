import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./modules/auth/AuthModule";
import { ConversationsModule } from "@api/modules/conversations/ConversationsModule";
import { InfrastructureModule } from "@api/infrastructure/InfrastructureModule";
import { GatewayModule } from "@api/modules/gateway/GatewayModule";

@Module({
  imports: [
    InfrastructureModule,
    MongooseModule.forRoot("mongodb://localhost/morad-chat"),
    AuthModule,
    ConversationsModule,
    GatewayModule,
  ]
})
export class AppModule {}
