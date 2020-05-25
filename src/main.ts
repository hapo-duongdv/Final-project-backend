import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import 'dotenv/config';


const port = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule , { cors: true });
  app.enableCors();
  await app.listen(port);
  Logger.log(`Server is running on http://localhost:${port}`,'Boostrap');
}
bootstrap();
