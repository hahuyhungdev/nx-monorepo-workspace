import { UserManagementController } from './user-management.controller';

describe('UserManagementController', () => {
  let controller: UserManagementController;

  beforeEach(() => {
    controller = new UserManagementController();
  });

  it('should return seeded user list payload', () => {
    const result = controller.listUsers();

    expect(result.success).toBe(true);
    expect(result.message).toBe('Users fetched');
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data).toHaveLength(2);
    expect(result.data[0]).toMatchObject({
      id: '1',
      email: 'alice@example.com',
      role: 'admin',
    });
  });
});
