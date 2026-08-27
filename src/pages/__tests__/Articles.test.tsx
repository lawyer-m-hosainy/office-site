import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import articlesData from '../../content/articles.json';
import Articles from '../Articles';

describe('Articles page', () => {
  it('lists every article with a link to its detail page', () => {
    renderWithProviders(<Articles />);
    expect(screen.getAllByRole('link', { name: 'قراءة المقال' })).toHaveLength(articlesData.length);
    for (const article of articlesData) {
      expect(screen.getByRole('heading', { name: article.title })).toBeInTheDocument();
    }
  });
});
