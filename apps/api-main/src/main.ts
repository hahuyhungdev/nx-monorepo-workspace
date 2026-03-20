import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:4300'],
    credentials: true,
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env['PORT'] || 3000;
  await app.listen(port);
  console.log(`[ ready ] http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
