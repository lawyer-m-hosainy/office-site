import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/utils';
import Header from '../Header';

describe('Header', () => {
  it('renders the primary navigation links', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: 'الرئيسية' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'المقالات' })).toHaveAttribute('href', '/articles');
    expect(screen.getAllByRole('link', { name: 'احجز استشارة' })[0]).toHaveAttribute('href', '/book');
  });

  it('opens and closes the mobile menu when the toggle button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    expect(screen.queryAllByRole('link', { name: 'من نحن' })).toHaveLength(1);

    await user.click(screen.getByRole('button', { name: 'القائمة الرئيسية' }));
    expect(screen.queryAllByRole('link', { name: 'من نحن' })).toHaveLength(2);

    await user.click(screen.getByRole('button', { name: 'القائمة الرئيسية' }));
    expect(screen.queryAllByRole('link', { name: 'من نحن' })).toHaveLength(1);
  });
});
