import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BillingRenewalModule } from './billing-renewal/billing-renewal.module';
import { EmailDigestModule } from './email-digest/email-digest.module';
import {
  DatabaseModule,
  HealthModule,
  LoggingMiddleware,
} from '@my-org/be-shared';

@Module({
  imports: [
    DatabaseModule,
    HealthModule,
    BillingRenewalModule,
    EmailDigestModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
