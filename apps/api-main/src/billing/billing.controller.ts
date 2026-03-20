import { Controller, Get, Post, Body } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('plans')
  getPlans() {
    return this.billingService.getPlans();
  }

  @Get('subscription')
  getSubscription() {
    return this.billingService.getSubscription();
  }

  @Post('subscribe')
  subscribe(@Body() body: { planId: string; interval: string }) {
    return this.billingService.subscribe(body.planId);
  }

  @Post('cancel')
  cancel() {
    return this.billingService.cancel();
  }

  @Get('invoices')
  getInvoices() {
    return this.billingService.getInvoices();
  }
}
