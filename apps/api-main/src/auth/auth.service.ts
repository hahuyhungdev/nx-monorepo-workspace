import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(email: string, _password: string) {
    return {
      data: {
        accessToken: 'tok_abc',
        refreshToken: 'ref_xyz',
        expiresAt: Date.now() + 3600000,
      },
      message: 'Login successful',
      success: true,
    };
  }

  signup(email: string, _password: string, name: string) {
    return {
      data: {
        accessToken: 'tok_new',
        refreshToken: 'ref_new',
        expiresAt: Date.now() + 3600000,
      },
      message: 'Signup successful',
      success: true,
    };
  }

  logout() {
    return { data: null, message: 'Logged out', success: true };
  }

  me() {
    return {
      data: {
        id: '1',
        email: 'alice@example.com',
        name: 'Alice',
        role: 'admin',
      },
      message: 'OK',
      success: true,
    };
  }
}
