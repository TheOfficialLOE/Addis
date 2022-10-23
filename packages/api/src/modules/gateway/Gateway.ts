import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
})
export class Gateway {
  @WebSocketServer()
  private readonly server: Server;

  constructor() {
    console.log("Gateway initialized.");
  }

  @SubscribeMessage("event")
  async exec() {
    console.log("event");
  }
}
