import { render } from '@testing-library/react';
import { Button, Card } from './ui';

describe('UI Components', () => {
  it('Button should render with label', () => {
    const { getByText } = render(<Button label="Click me" />);
    expect(getByText('Click me')).toBeTruthy();
  });

  it('Card should render title and children', () => {
    const { getByText } = render(
      <Card title="Test Card"><p>Content</p></Card>
    );
    expect(getByText('Test Card')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
  });
});
