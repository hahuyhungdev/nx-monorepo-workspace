import { fetchUsers } from '@my-org/data-access';
import type { User } from '@my-org/data-access';
import { capitalize } from '@my-org/utils';

/**
 * Feature layer — contains business logic.
 * Depends on: data-access, utils
 * Does NOT depend on: ui (features don't render)
 */

export interface UserViewModel {
  id: string;
  displayName: string;
  email: string;
}

/**
 * Transform raw User data into a view model for the UI.
 */
export function toUserViewModel(user: User): UserViewModel {
  return {
    id: user.id,
    displayName: capitalize(user.name),
    email: user.email,
  };
}

/**
 * Business logic: load and transform users.
 */
export async function getUsers(): Promise<UserViewModel[]> {
  const response = await fetchUsers();
  if (!response.success) return [];
  return response.data.map(toUserViewModel);
}
