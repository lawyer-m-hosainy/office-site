import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/utils';
import siteData from '../../content/site.json';
import Header from '../Header';

describe('Header', () => {
  it('renders the primary navigation links', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: 'الرئيسية' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'المقالات' })).toHaveAttribute('href', '/articles');
    expect(screen.getByRole('link', { name: 'أسئلة شائعة' })).toHaveAttribute('href', '/faq');
    expect(screen.getAllByRole('link', { name: 'احجز استشارة' })[0]).toHaveAttribute('href', '/book');
  });

  it('exposes a click-to-call link on both desktop and mobile', () => {
    renderWithProviders(<Header />);
    const callLinks = screen
      .getAllByRole('link')
      .filter((el) => el.getAttribute('href') === `tel:${siteData.phoneE164}`);
    expect(callLinks.length).toBeGreaterThanOrEqual(2);
  });

  it('announces the mobile menu state through aria-expanded', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    const toggle = screen.getByRole('button', { name: 'القائمة الرئيسية' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAttribute('aria-controls', 'mobile-nav');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.queryAllByRole('link', { name: 'من نحن' })).toHaveLength(2);

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryAllByRole('link', { name: 'من نحن' })).toHaveLength(1);
  });

  it('closes the mobile menu on Escape and returns focus to the toggle', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    const toggle = screen.getByRole('button', { name: 'القائمة الرئيسية' });
    await user.click(toggle);
    expect(screen.queryAllByRole('link', { name: 'من نحن' })).toHaveLength(2);

    await user.keyboard('{Escape}');
    expect(screen.queryAllByRole('link', { name: 'من نحن' })).toHaveLength(1);
    expect(toggle).toHaveFocus();
  });
});
