import { Module } from '@nestjs/common';
import { BillingRenewalModule } from './billing-renewal/billing-renewal.module';
import { EmailDigestModule } from './email-digest/email-digest.module';

@Module({
  imports: [BillingRenewalModule, EmailDigestModule],
})
export class AppModule {}
