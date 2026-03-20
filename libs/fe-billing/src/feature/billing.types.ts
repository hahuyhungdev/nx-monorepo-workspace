export type PlanTier = 'free' | 'starter' | 'pro' | 'enterprise';
export type BillingInterval = 'monthly' | 'yearly';
export type SubscriptionStatus =
  | 'active'
  | 'canceled'
  | 'past_due'
  | 'trialing';

export interface Plan {
  id: string;
  name: string;
  tier: PlanTier;
  price: number;
  interval: BillingInterval;
  features: string[];
}

export interface Subscription {
  id: string;
  planId: string;
  status: SubscriptionStatus;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export interface Invoice {
  id: string;
  amount: number;
  status: 'paid' | 'open' | 'void';
  createdAt: string;
  pdfUrl?: string;
}
