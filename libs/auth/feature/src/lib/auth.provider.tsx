import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type { AuthUser, AuthTokens, AuthState } from './auth.types';
import {
  login as apiLogin,
  signup as apiSignup,
  logout as apiLogout,
  fetchCurrentUser,
} from '@my-org/auth/data-access';

// ─── Context shape ───────────────────────────────────────

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

type AuthContextValue = AuthState & AuthActions;

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Token persistence ──────────────────────────────────

const TOKEN_KEY = 'auth_tokens';

function persistTokens(tokens: AuthTokens | null) {
  if (tokens) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

function loadTokens(): AuthTokens | null {
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ─── Provider ────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    tokens: loadTokens(),
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const tokens = loadTokens();
    if (!tokens) {
      setState((s) => ({ ...s, isLoading: false }));
      return;
    }
    fetchCurrentUser(tokens.accessToken)
      .then((res) => {
        if (res.success) {
          setState({
            user: res.data,
            tokens,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          persistTokens(null);
          setState({
            user: null,
            tokens: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      })
      .catch(() => {
        setState((s) => ({ ...s, isLoading: false }));
      });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      const res = await apiLogin({ email, password });
      if (!res.success) throw new Error(res.message);
      persistTokens(res.data);
      const userRes = await fetchCurrentUser(res.data.accessToken);
      setState({
        user: userRes.success ? userRes.data : null,
        tokens: res.data,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setState((s) => ({
        ...s,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Login failed',
      }));
    }
  }, []);

  const signup = useCallback(
    async (email: string, password: string, name: string) => {
      setState((s) => ({ ...s, isLoading: true, error: null }));
      try {
        const res = await apiSignup({ email, password, name });
        if (!res.success) throw new Error(res.message);
        persistTokens(res.data);
        const userRes = await fetchCurrentUser(res.data.accessToken);
        setState({
          user: userRes.success ? userRes.data : null,
          tokens: res.data,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        setState((s) => ({
          ...s,
          isLoading: false,
          error: err instanceof Error ? err.message : 'Signup failed',
        }));
      }
    },
    []
  );

  const logout = useCallback(async () => {
    await apiLogout().catch(() => {
      // Intentionally swallow — logout should always clear local state
    });
    persistTokens(null);
    setState({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const clearError = useCallback(() => {
    setState((s) => ({ ...s, error: null }));
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, login, signup, logout, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
