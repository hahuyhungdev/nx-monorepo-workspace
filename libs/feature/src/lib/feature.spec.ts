import { toUserViewModel } from './feature';

describe('feature', () => {
  it('toUserViewModel should capitalize name', () => {
    const user = { id: '1', name: 'alice', email: 'a@b.com', createdAt: '' };
    const result = toUserViewModel(user);
    expect(result.displayName).toBe('Alice');
    expect(result.email).toBe('a@b.com');
  });
});
