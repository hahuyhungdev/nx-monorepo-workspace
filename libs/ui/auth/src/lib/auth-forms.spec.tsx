import { render, screen } from '@testing-library/react';
import { LoginForm, SignupForm } from './auth-forms';

describe('LoginForm', () => {
  it('renders email and password fields', () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText(/email/i)).toBeDefined();
    expect(screen.getByLabelText(/password/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDefined();
  });
});

describe('SignupForm', () => {
  it('renders name, email and password fields', () => {
    render(<SignupForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText(/name/i)).toBeDefined();
    expect(screen.getByLabelText(/email/i)).toBeDefined();
    expect(screen.getByLabelText(/password/i)).toBeDefined();
    expect(
      screen.getByRole('button', { name: /create account/i })
    ).toBeDefined();
  });
});
