import { renderHook } from '@testing-library/react';
import { BillingProvider, useBilling } from './billing.provider';
import type { ReactNode } from 'react';

vi.mock('@my-org/billing/data-access', () => ({
  fetchPlans: vi.fn().mockResolvedValue({
    data: [],
    message: 'ok',
    success: true,
  }),
  fetchSubscription: vi.fn().mockResolvedValue({
    data: null,
    message: 'ok',
    success: true,
  }),
  subscribeToPlan: vi.fn(),
  cancelSubscription: vi.fn(),
  fetchInvoices: vi.fn(),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <BillingProvider>{children}</BillingProvider>
);

describe('useBilling', () => {
  it('starts with empty plans and no subscription', () => {
    const { result } = renderHook(() => useBilling(), { wrapper });
    expect(result.current.plans).toEqual([]);
    expect(result.current.subscription).toBeNull();
  });
});
