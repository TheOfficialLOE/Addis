import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./AppModule";
import { GatewayAdapter } from "./modules/gateway/GatewayAdapter";
import { HttpExceptionFilter } from "./core/client-response/HttpExceptionFilter";
import { JwtService } from "@nestjs/jwt";
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { UserRepository } from "@api/modules/auth/database/user/UserRepository";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (validatorErrors: ValidationError[]) => {
      return validatorErrors[0];
    }
  }));
  app.use(cookieParser())
  app.useGlobalFilters(new HttpExceptionFilter());
  const adapter = new GatewayAdapter(app, app.get(JwtService), app.get(UserRepository));
  app.useWebSocketAdapter(adapter);
  app.enableCors({
    origin: "http://localhost:3000",
    methods: ['GET', 'PUT', 'POST'],
    allowedHeaders: [
      "Content-Type"
    ],
    credentials: true
  });
  await app.listen(3001);
}
bootstrap();
