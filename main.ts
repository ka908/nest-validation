import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unwanted properties
      forbidNonWhitelisted: true, // Reject requests with extra properties
      transform: true, // Automatically transform payloads into DTO instances
    }),
  );
  // console.log(w);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
