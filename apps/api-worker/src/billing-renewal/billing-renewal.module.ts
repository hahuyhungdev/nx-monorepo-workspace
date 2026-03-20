import { Module } from '@nestjs/common';
import { BillingRenewalService } from './billing-renewal.service';

@Module({
  providers: [BillingRenewalService],
})
export class BillingRenewalModule {}
