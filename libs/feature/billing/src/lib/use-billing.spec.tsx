import { renderHook } from '@testing-library/react';
import { BillingProvider, useBilling } from './use-billing';
import type { ReactNode } from 'react';

// Mock data-access-billing
vi.mock('@my-org/data-access-billing', () => ({
  fetchPlans: vi.fn().mockResolvedValue({
    data: [{ id: 'p1', name: 'Free', tier: 'free', price: 0, interval: 'monthly', features: [] }],
  }),
  fetchSubscription: vi.fn().mockResolvedValue({ data: null }),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <BillingProvider>{children}</BillingProvider>
);

describe('useBilling', () => {
  it('starts with empty plans and no subscription', () => {
    const { result } = renderHook(() => useBilling(), { wrapper });
    expect(result.current.plans).toEqual([]);
    expect(result.current.subscription).toBeNull();
    // useEffect triggers loadPlans() on mount which sets isLoading true
    expect(result.current.isLoading).toBe(true);
  });
});
