import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlanBadge, PricingCard, InvoiceTable } from '../ui/billing-components';

describe('PlanBadge', () => {
  it('renders the tier label', () => {
    render(<PlanBadge tier="pro" />);
    expect(screen.getByText('Pro')).toBeTruthy();
  });
});

describe('PricingCard', () => {
  it('renders plan details', () => {
    render(
      <PricingCard
        name="Starter"
        tier="starter"
        price={19}
        interval="monthly"
        features={['5 projects', 'Email support']}
      />
    );
    expect(screen.getByRole('heading', { name: 'Starter' })).toBeTruthy();
    expect(screen.getByText('$19')).toBeTruthy();
    expect(screen.getByText('✓ 5 projects')).toBeTruthy();
  });
});

describe('InvoiceTable', () => {
  it('shows empty message when no invoices', () => {
    render(<InvoiceTable invoices={[]} />);
    expect(screen.getByText('No invoices yet.')).toBeTruthy();
  });
});
