import type { ApiResponse } from '@my-org/shared/util';

// ─── Types ───────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'member' | 'viewer';
  avatarUrl?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  name: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

// ─── API Service ─────────────────────────────────────────

const API_BASE = 'http://localhost:3000/api/auth';

export async function login(
  credentials: LoginCredentials
): Promise<ApiResponse<AuthTokens>> {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export async function signup(
  credentials: SignupCredentials
): Promise<ApiResponse<AuthTokens>> {
  const res = await fetch(`${API_BASE}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export async function logout(): Promise<ApiResponse<null>> {
  const res = await fetch(`${API_BASE}/logout`, { method: 'POST' });
  return res.json();
}

export async function fetchCurrentUser(
  token: string
): Promise<ApiResponse<AuthUser>> {
  const res = await fetch(`${API_BASE}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function refreshTokens(
  refreshToken: string
): Promise<ApiResponse<AuthTokens>> {
  const res = await fetch(`${API_BASE}/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  return res.json();
}
