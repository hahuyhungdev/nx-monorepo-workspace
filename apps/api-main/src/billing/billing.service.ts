import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingService {
  getPlans() {
    return {
      data: [
        {
          id: 'free',
          name: 'Free',
          tier: 'free',
          price: 0,
          interval: 'monthly',
          features: ['1 project', '100 API calls/day'],
        },
        {
          id: 'starter',
          name: 'Starter',
          tier: 'starter',
          price: 19,
          interval: 'monthly',
          features: ['5 projects', '10k API calls/day', 'Email support'],
        },
        {
          id: 'pro',
          name: 'Pro',
          tier: 'pro',
          price: 49,
          interval: 'monthly',
          features: [
            'Unlimited projects',
            '100k API calls/day',
            'Priority support',
            'Analytics',
          ],
        },
      ],
      message: 'Plans fetched',
      success: true,
    };
  }

  getSubscription() {
    return { data: null, message: 'No subscription', success: true };
  }

  subscribe(planId: string) {
    return {
      data: {
        id: 'sub_1',
        planId,
        status: 'active',
        currentPeriodEnd: '2026-04-20',
        cancelAtPeriodEnd: false,
      },
      message: 'Subscribed',
      success: true,
    };
  }

  cancel() {
    return {
      data: {
        id: 'sub_1',
        planId: 'starter',
        status: 'canceled',
        currentPeriodEnd: '2026-04-20',
        cancelAtPeriodEnd: true,
      },
      message: 'Subscription canceled',
      success: true,
    };
  }

  getInvoices() {
    return { data: [], message: 'No invoices', success: true };
  }
}
