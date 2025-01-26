import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // Automatically transform payloads to DTO instances
    whitelist: true,  // Strip properties that do not have any decorators
    forbidNonWhitelisted: true,  // Throw an error if non-whitelisted properties are found
  }));

  // Enable CORS for all origins (or you can specify specific origins)
  app.enableCors({
    origin: '*',  // Allow all origins (use this for testing, restrict for production)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization',  // Allowed headers
  });
  // Increase the body size limit
  app.use(bodyParser.json({ limit: '50mb' })); 
  await app.listen(3000);
}
bootstrap();
