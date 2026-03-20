import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@my-org/be-shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env['PORT'] || 3002;
  await app.listen(port);
  console.log(`[ ready ] Worker running on http://localhost:${port}`);
}

bootstrap();
