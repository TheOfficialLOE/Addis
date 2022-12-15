import { Module } from "@nestjs/common";
import { Gateway } from "@api/modules/gateway/Gateway";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [
    EventEmitterModule.forRoot(),
  ],
  providers: [
    Gateway,
  ]
})
export class GatewayModule {

}
