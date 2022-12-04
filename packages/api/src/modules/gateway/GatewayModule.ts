import { Module } from "@nestjs/common";
import { Gateway } from "@api/modules/gateway/Gateway";
import { GatewaySession } from "@api/modules/gateway/GatewaySession";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [
    EventEmitterModule.forRoot(),
  ],
  providers: [
    Gateway,
    GatewaySession
  ]
})
export class GatewayModule {

}
