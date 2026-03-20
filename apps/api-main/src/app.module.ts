import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BillingModule } from './billing/billing.module';
import {
  DatabaseModule,
  HealthModule,
  LoggingMiddleware,
} from '@my-org/be-shared';

@Module({
  imports: [DatabaseModule, HealthModule, AuthModule, BillingModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
