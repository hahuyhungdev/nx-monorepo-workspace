import {
  fetchPlans,
  fetchSubscription,
  subscribeToPlan,
  cancelSubscription,
  fetchInvoices,
} from './billing.api';

const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => mockFetch.mockReset());

describe('billing api', () => {
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
        message: 'ok',
        success: true,
      }),
    });
    const result = await fetchPlans();
    expect(mockFetch).toHaveBeenCalledWith('/api/billing/plans');
    expect(result.data).toHaveLength(1);
  });

  it('subscribeToPlan sends POST /api/billing/subscribe', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { id: 's2', planId: 'p2', status: 'active' },
        message: 'ok',
        success: true,
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
      json: async () => ({
        data: { id: 's1', status: 'canceled' },
        message: 'ok',
        success: true,
      }),
    });
    const result = await cancelSubscription();
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/billing/cancel',
      expect.objectContaining({ method: 'POST' })
    );
    expect(result.data?.status).toBe('canceled');
  });
});
