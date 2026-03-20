import { render, screen } from '@testing-library/react';
import { Button } from './button';
import { Card } from './card';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeDefined();
  });
});

describe('Card', () => {
  it('renders with title and children', () => {
    render(<Card title="Hello">Content</Card>);
    expect(screen.getByText('Hello')).toBeDefined();
    expect(screen.getByText('Content')).toBeDefined();
  });
});
