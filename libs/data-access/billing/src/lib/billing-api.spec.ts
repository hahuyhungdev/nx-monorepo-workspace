import {
  fetchPlans,
  fetchSubscription,
  subscribeToPlan,
  cancelSubscription,
  fetchInvoices,
} from './billing-api';

const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => mockFetch.mockReset());

describe('billing-api', () => {
  it('fetchPlans sends GET /api/billing/plans', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: [
          {
            id: 'p1',
            name: 'Free',
            tier: 'free',
            price: 0,
            interval: 'monthly',
            features: [],
          },
        ],
      }),
    });
    const result = await fetchPlans();
    expect(mockFetch).toHaveBeenCalledWith('/api/billing/plans');
    expect(result.data).toHaveLength(1);
  });

  it('fetchSubscription sends GET /api/billing/subscription', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { id: 's1', planId: 'p1', status: 'active' },
      }),
    });
    const result = await fetchSubscription();
    expect(mockFetch).toHaveBeenCalledWith('/api/billing/subscription');
    expect(result.data?.status).toBe('active');
  });

  it('subscribeToPlan sends POST /api/billing/subscribe', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { id: 's2', planId: 'p2', status: 'active' },
      }),
    });
    const result = await subscribeToPlan('p2', 'monthly');
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/billing/subscribe',
      expect.objectContaining({ method: 'POST' })
    );
    expect(result.data?.planId).toBe('p2');
  });

  it('cancelSubscription sends POST /api/billing/cancel', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { id: 's1', status: 'canceled' } }),
    });
    const result = await cancelSubscription();
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/billing/cancel',
      expect.objectContaining({ method: 'POST' })
    );
    expect(result.data?.status).toBe('canceled');
  });

  it('fetchInvoices sends GET /api/billing/invoices', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: [{ id: 'inv1', amount: 29, status: 'paid' }],
      }),
    });
    const result = await fetchInvoices();
    expect(mockFetch).toHaveBeenCalledWith('/api/billing/invoices');
    expect(result.data).toHaveLength(1);
  });
});
