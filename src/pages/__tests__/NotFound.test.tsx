import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import NotFound from '../NotFound';

describe('NotFound page', () => {
  it('renders a 404 message with a link back home', () => {
    renderWithProviders(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'العودة إلى الرئيسية' })).toHaveAttribute('href', '/');
  });
});
