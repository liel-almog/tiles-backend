import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: process.env.FRONTEND_URL });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(helmet());
  app.use(cookieParser());
  await app.listen(process.env.PORT);
}
bootstrap();
