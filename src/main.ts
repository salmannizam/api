import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // Automatically transform payloads to DTO instances
    whitelist: true,  // Strip properties that do not have any decorators
    forbidNonWhitelisted: true,  // Throw an error if non-whitelisted properties are found
  }));

  await app.listen(3000);
}
bootstrap();
