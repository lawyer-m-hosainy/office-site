import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/utils';
import { articles } from '../../lib/articles';
import servicesData from '../../content/services.json';
import Articles from '../Articles';

describe('Articles page', () => {
  it('lists every article with a link to its detail page', () => {
    renderWithProviders(<Articles />, { route: '/articles' });
    expect(screen.getAllByRole('link', { name: 'قراءة المقال' })).toHaveLength(articles.length);
    for (const article of articles) {
      expect(screen.getByRole('heading', { name: article.title })).toBeInTheDocument();
    }
  });

  it('orders articles newest first', () => {
    renderWithProviders(<Articles />, { route: '/articles' });
    const headings = screen
      .getAllByRole('heading', { level: 2 })
      .map((h) => h.textContent);
    expect(headings[0]).toBe(articles[0].title);
    expect(articles[0].date >= articles[articles.length - 1].date).toBe(true);
  });

  it('filters by practice area', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Articles />, { route: '/articles' });

    const service = servicesData.find((s) => articles.some((a) => a.relatedService === s.id))!;
    await user.click(screen.getByRole('button', { name: service.title }));

    const expected = articles.filter((a) => a.relatedService === service.id);
    expect(screen.getAllByRole('link', { name: 'قراءة المقال' })).toHaveLength(expected.length);
  });

  it('searches article text and offers a way back when nothing matches', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Articles />, { route: '/articles' });

    await user.type(screen.getByLabelText('ابحث في المقالات'), 'الميراث');
    expect(screen.getAllByRole('link', { name: 'قراءة المقال' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: 'قراءة المقال' }).length).toBeLessThan(
      articles.length
    );

    await user.clear(screen.getByLabelText('ابحث في المقالات'));
    await user.type(screen.getByLabelText('ابحث في المقالات'), 'زذزذزذ');
    expect(screen.getByText('لا توجد مقالات مطابقة لبحثك.')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'عرض كل المقالات' }));
    expect(screen.getAllByRole('link', { name: 'قراءة المقال' })).toHaveLength(articles.length);
  });
});
