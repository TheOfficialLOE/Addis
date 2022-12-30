import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/AuthModule";
import { ConversationsModule } from "@api/modules/conversations/ConversationsModule";
import { InfrastructureModule } from "@api/infrastructure/InfrastructureModule";
import { GatewayModule } from "@api/modules/gateway/GatewayModule";

@Module({
  imports: [
    InfrastructureModule,
    AuthModule,
    ConversationsModule,
    GatewayModule,
  ]
})
export class AppModule {}
