import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./AppModule";
import { GatewayAdapter } from "./modules/gateway/GatewayAdapter";
import { HttpExceptionFilter } from "./core/HttpExceptionFilter";
import { UserRepository } from "@api/modules/identity-and-access/database/UserRepository";
import { JwtService } from "@nestjs/jwt";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  const adapter = new GatewayAdapter(app, app.get(JwtService), app.get(UserRepository));
  app.useWebSocketAdapter(adapter);
  app.enableCors({
    origin: "http://localhost:3000",
    methods: ['GET', 'PUT', 'POST'],
    allowedHeaders: [
      "Content-Type"
    ]
  });
  await app.listen(3001);
}
bootstrap();
