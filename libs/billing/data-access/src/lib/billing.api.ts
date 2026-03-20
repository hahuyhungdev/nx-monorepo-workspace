import type { ApiResponse } from '@my-org/shared/util';

// ─── Types ───────────────────────────────────────────────

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

// ─── API Service ─────────────────────────────────────────

const API_BASE = 'http://localhost:3000/api/billing';

export async function fetchPlans(): Promise<ApiResponse<Plan[]>> {
  const res = await fetch(`${API_BASE}/plans`);
  return res.json();
}

export async function fetchSubscription(): Promise<
  ApiResponse<Subscription | null>
> {
  const res = await fetch(`${API_BASE}/subscription`);
  return res.json();
}

export async function subscribeToPlan(
  planId: string,
  interval: BillingInterval
): Promise<ApiResponse<Subscription>> {
  const res = await fetch(`${API_BASE}/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ planId, interval }),
  });
  return res.json();
}

export async function cancelSubscription(): Promise<ApiResponse<Subscription>> {
  const res = await fetch(`${API_BASE}/cancel`, { method: 'POST' });
  return res.json();
}

export async function fetchInvoices(): Promise<ApiResponse<Invoice[]>> {
  const res = await fetch(`${API_BASE}/invoices`);
  return res.json();
}
