import { render, screen } from '@testing-library/react';
import { PricingCard, PlanBadge } from './billing-components';

describe('PricingCard', () => {
  it('renders plan name and price', () => {
    render(
      <PricingCard
        name="Pro"
        tier="pro"
        price={29}
        interval="monthly"
        features={['Feature A', 'Feature B']}
        onSelect={vi.fn()}
      />
    );
    expect(screen.getByRole('heading', { name: 'Pro' })).toBeDefined();
    expect(screen.getByText('$29', { exact: false })).toBeDefined();
    expect(screen.getByText(/Feature A/)).toBeDefined();
  });
});

describe('PlanBadge', () => {
  it('renders the tier label', () => {
    render(<PlanBadge tier="pro" />);
    expect(screen.getByText('Pro')).toBeDefined();
  });
});
