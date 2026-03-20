import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashboardPage } from '../feature/dashboard-page';

describe('DashboardPage', () => {
  it('renders welcome message', () => {
    render(<DashboardPage userName="Alice" userRole="admin" />);
    expect(screen.getByText('Welcome, Alice')).toBeTruthy();
    expect(screen.getByText('Role: admin')).toBeTruthy();
  });
});
