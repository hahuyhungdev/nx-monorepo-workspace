/**
 * Format a date to a human-readable string.
 * Utils are the leaf layer — no dependencies on other libs.
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generic API response type used across the stack.
 */
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
