import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Import ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- NEW: Enable Global Validation ---
  app.useGlobalPipes(new ValidationPipe());

  // --- NEW: Enable CORS ---
  app.enableCors({
    origin: 'http://localhost:3001', // adjust if frontend runs elsewhere
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}

bootstrap();
