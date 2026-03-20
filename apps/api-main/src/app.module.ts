import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BillingModule } from './billing/billing.module';

@Module({
  imports: [AuthModule, BillingModule],
})
export class AppModule {}
