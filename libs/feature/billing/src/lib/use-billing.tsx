import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type { Plan, Subscription, Invoice, BillingInterval } from '@my-org/data-access-billing';
import {
  fetchPlans,
  fetchSubscription,
  subscribeToPlan,
  cancelSubscription as apiCancel,
  fetchInvoices,
} from '@my-org/data-access-billing';

// ─── State ───────────────────────────────────────────────

interface BillingState {
  plans: Plan[];
  subscription: Subscription | null;
  invoices: Invoice[];
  isLoading: boolean;
  error: string | null;
}

interface BillingActions {
  loadPlans: () => Promise<void>;
  loadSubscription: () => Promise<void>;
  loadInvoices: () => Promise<void>;
  subscribe: (planId: string, interval: BillingInterval) => Promise<void>;
  cancelSubscription: () => Promise<void>;
}

type BillingContextValue = BillingState & BillingActions;

const BillingContext = createContext<BillingContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────

export function BillingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BillingState>({
    plans: [],
    subscription: null,
    invoices: [],
    isLoading: false,
    error: null,
  });

  const loadPlans = useCallback(async () => {
    setState((s) => ({ ...s, isLoading: true }));
    try {
      const res = await fetchPlans();
      if (res.success) setState((s) => ({ ...s, plans: res.data, isLoading: false }));
    } catch {
      setState((s) => ({ ...s, isLoading: false, error: 'Failed to load plans' }));
    }
  }, []);

  const loadSubscription = useCallback(async () => {
    try {
      const res = await fetchSubscription();
      if (res.success) setState((s) => ({ ...s, subscription: res.data }));
    } catch {
      /* silent */
    }
  }, []);

  const loadInvoices = useCallback(async () => {
    try {
      const res = await fetchInvoices();
      if (res.success) setState((s) => ({ ...s, invoices: res.data }));
    } catch {
      /* silent */
    }
  }, []);

  const subscribe = useCallback(
    async (planId: string, interval: BillingInterval) => {
      setState((s) => ({ ...s, isLoading: true, error: null }));
      try {
        const res = await subscribeToPlan(planId, interval);
        if (!res.success) throw new Error(res.message);
        setState((s) => ({
          ...s,
          subscription: res.data,
          isLoading: false,
        }));
      } catch (err) {
        setState((s) => ({
          ...s,
          isLoading: false,
          error: err instanceof Error ? err.message : 'Subscribe failed',
        }));
      }
    },
    []
  );

  const cancel = useCallback(async () => {
    setState((s) => ({ ...s, isLoading: true }));
    try {
      const res = await apiCancel();
      if (res.success) setState((s) => ({ ...s, subscription: res.data, isLoading: false }));
    } catch {
      setState((s) => ({ ...s, isLoading: false, error: 'Cancel failed' }));
    }
  }, []);

  useEffect(() => {
    loadPlans();
    loadSubscription();
  }, [loadPlans, loadSubscription]);

  return (
    <BillingContext.Provider
      value={{
        ...state,
        loadPlans,
        loadSubscription,
        loadInvoices,
        subscribe,
        cancelSubscription: cancel,
      }}
    >
      {children}
    </BillingContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────

export function useBilling(): BillingContextValue {
  const ctx = useContext(BillingContext);
  if (!ctx) throw new Error('useBilling must be used within <BillingProvider>');
  return ctx;
}
