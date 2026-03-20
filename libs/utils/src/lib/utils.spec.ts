import { formatDate, capitalize } from './utils';

describe('utils', () => {
  describe('formatDate', () => {
    it('should format a date to readable string', () => {
      const date = new Date('2026-03-20');
      expect(formatDate(date)).toContain('2026');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });
  });
});
