/**
 * Generic API response type used across the stack (frontend + backend).
 */
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
