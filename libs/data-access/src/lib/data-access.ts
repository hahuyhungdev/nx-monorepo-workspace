import type { ApiResponse } from '@my-org/utils';

/**
 * Data-access layer — handles API communication.
 * Depends on: utils (for shared types)
 * Does NOT depend on: ui, feature
 */

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

const API_BASE = '/api';

export async function fetchUsers(): Promise<ApiResponse<User[]>> {
  const res = await fetch(`${API_BASE}/users`);
  return res.json();
}

export async function fetchUserById(
  id: string
): Promise<ApiResponse<User | null>> {
  const res = await fetch(`${API_BASE}/users/${id}`);
  return res.json();
}
