import { formatDate } from './format-date';

describe('formatDate', () => {
  it('formats a date to en-US long format', () => {
    const date = new Date('2026-01-15');
    expect(formatDate(date)).toBe('January 15, 2026');
  });
});
