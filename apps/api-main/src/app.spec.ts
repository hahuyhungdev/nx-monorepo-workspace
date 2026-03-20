import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth/auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should return login response', () => {
    const result = service.login('test@test.com', 'password');
    expect(result.success).toBe(true);
    expect(result.data.accessToken).toBeDefined();
  });

  it('should return user on me()', () => {
    const result = service.me();
    expect(result.success).toBe(true);
    expect(result.data.email).toBe('alice@example.com');
  });
});
