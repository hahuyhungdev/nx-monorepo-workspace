import { capitalize } from './capitalize';

describe('capitalize', () => {
  it('capitalizes the first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('returns empty string as-is', () => {
    expect(capitalize('')).toBe('');
  });
});
