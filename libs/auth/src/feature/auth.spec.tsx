/* eslint-disable @typescript-eslint/no-empty-function */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoginForm } from '../ui/login-form';
import { SignupForm } from '../ui/signup-form';

describe('LoginForm', () => {
  it('renders the sign in form', () => {
    render(<LoginForm onSubmit={() => {}} />);
    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeTruthy();
    expect(screen.getByLabelText('Email')).toBeTruthy();
    expect(screen.getByLabelText('Password')).toBeTruthy();
  });

  it('shows error message when error prop is set', () => {
    render(<LoginForm onSubmit={() => {}} error="Invalid credentials" />);
    expect(screen.getByText('Invalid credentials')).toBeTruthy();
  });
});

describe('SignupForm', () => {
  it('renders the signup form', () => {
    render(<SignupForm onSubmit={() => {}} />);
    expect(
      screen.getByRole('heading', { name: 'Create Account' })
    ).toBeTruthy();
    expect(screen.getByLabelText('Name')).toBeTruthy();
    expect(screen.getByLabelText('Email')).toBeTruthy();
    expect(screen.getByLabelText('Password')).toBeTruthy();
  });
});
