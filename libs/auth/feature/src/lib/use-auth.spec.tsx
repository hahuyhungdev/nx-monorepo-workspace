import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './auth.provider';
import type { ReactNode } from 'react';

vi.mock('@my-org/auth/data-access', () => ({
  login: vi.fn().mockResolvedValue({
    success: true,
    data: {
      accessToken: 'tok',
      refreshToken: 'ref',
      expiresAt: Date.now() + 3600000,
    },
    message: 'ok',
  }),
  signup: vi.fn().mockResolvedValue({
    success: true,
    data: {
      accessToken: 'tok',
      refreshToken: 'ref',
      expiresAt: Date.now() + 3600000,
    },
    message: 'ok',
  }),
  logout: vi.fn().mockResolvedValue({
    success: true,
    data: null,
    message: 'ok',
  }),
  fetchCurrentUser: vi.fn().mockResolvedValue({
    success: true,
    data: { id: '1', email: 'a@b.c', name: 'A', role: 'member' },
    message: 'ok',
  }),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('useAuth', () => {
  beforeEach(() => localStorage.clear());

  it('starts unauthenticated', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('login sets user and tokens', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    await act(async () => {
      await result.current.login('a@b.c', 'pw');
    });
    expect(result.current.user?.email).toBe('a@b.c');
    expect(result.current.isAuthenticated).toBe(true);
  });
});
