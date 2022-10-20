import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./AppModule";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
