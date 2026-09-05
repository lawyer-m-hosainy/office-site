import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/utils';
import faqData from '../../content/faq.json';
import Faq from '../Faq';

describe('FAQ page', () => {
  it('renders every question as an expandable control', () => {
    renderWithProviders(<Faq />, { route: '/faq' });
    for (const item of faqData) {
      expect(screen.getByRole('button', { name: item.question })).toBeInTheDocument();
    }
  });

  it('opens the first answer by default and toggles the others', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Faq />, { route: '/faq' });

    const first = screen.getByRole('button', { name: faqData[0].question });
    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(faqData[0].answer)).toBeVisible();

    const second = screen.getByRole('button', { name: faqData[1].question });
    expect(second).toHaveAttribute('aria-expanded', 'false');

    await user.click(second);
    expect(second).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(faqData[1].answer)).toBeVisible();
    expect(first).toHaveAttribute('aria-expanded', 'false');
  });

  it('filters questions by category', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Faq />, { route: '/faq' });

    const category = faqData[0].category;
    await user.click(screen.getByRole('button', { name: category }));

    const expected = faqData.filter((item) => item.category === category);
    const hidden = faqData.filter((item) => item.category !== category);

    for (const item of expected) {
      expect(screen.getByRole('button', { name: item.question })).toBeInTheDocument();
    }
    for (const item of hidden) {
      expect(screen.queryByRole('button', { name: item.question })).not.toBeInTheDocument();
    }
  });

  it('offers a fallback route to a real consultation', () => {
    renderWithProviders(<Faq />, { route: '/faq' });
    const cta = screen.getByRole('heading', { name: 'لم تجد إجابة سؤالك؟' }).parentElement!;
    expect(within(cta).getByRole('link', { name: 'احجز استشارة' })).toHaveAttribute('href', '/book');
  });
});
