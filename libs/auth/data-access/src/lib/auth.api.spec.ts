import { login, signup, logout, fetchCurrentUser } from './auth.api';

const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => mockFetch.mockReset());

describe('auth api', () => {
  it('login sends POST /api/auth/login', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          accessToken: 'tok',
          refreshToken: 'ref',
          expiresAt: Date.now() + 3600000,
        },
        message: 'ok',
        success: true,
      }),
    });
    const result = await login({ email: 'a@b.c', password: 'pw' });
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/auth/login',
      expect.objectContaining({ method: 'POST' })
    );
    expect(result.data?.accessToken).toBe('tok');
  });

  it('signup sends POST /api/auth/signup', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          accessToken: 'tok',
          refreshToken: 'ref',
          expiresAt: Date.now() + 3600000,
        },
        message: 'ok',
        success: true,
      }),
    });
    const result = await signup({
      email: 'a@b.c',
      password: 'pw',
      name: 'A',
    });
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/auth/signup',
      expect.objectContaining({ method: 'POST' })
    );
    expect(result.success).toBe(true);
  });

  it('logout sends POST /api/auth/logout', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: null, message: 'ok', success: true }),
    });
    await logout();
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/auth/logout',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('fetchCurrentUser sends GET /api/auth/me', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { id: '1', email: 'a@b.c', name: 'A', role: 'member' },
        message: 'ok',
        success: true,
      }),
    });
    const result = await fetchCurrentUser('tok');
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/auth/me',
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer tok' }),
      })
    );
    expect(result.data?.email).toBe('a@b.c');
  });
});
