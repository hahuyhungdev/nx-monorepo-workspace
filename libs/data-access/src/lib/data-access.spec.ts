import { fetchUsers } from './data-access';

describe('data-access', () => {
  it('fetchUsers should be a function', () => {
    expect(typeof fetchUsers).toBe('function');
  });
});
