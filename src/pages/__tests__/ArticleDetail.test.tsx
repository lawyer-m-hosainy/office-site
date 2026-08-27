import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import articlesData from '../../content/articles.json';
import servicesData from '../../content/services.json';
import ArticleDetail from '../ArticleDetail';

function renderAt(route: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/articles" element={<div>Articles list marker</div>} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe('ArticleDetail page', () => {
  it('renders the matching article title for a known id', () => {
    const article = articlesData[0];
    renderAt(`/articles/${article.id}`);
    expect(screen.getByRole('heading', { level: 1, name: article.title })).toBeInTheDocument();
  });

  it('redirects to /articles for an unknown id', () => {
    renderAt('/articles/does-not-exist');
    expect(screen.getByText('Articles list marker')).toBeInTheDocument();
  });

  it('renders bullet list lines ("- ...") from the article content as bullet points', () => {
    const article = articlesData.find((a) => a.content.includes('\n- '));
    expect(article).toBeDefined();
    renderAt(`/articles/${article!.id}`);
    const firstBulletLine = article!.content
      .split('\n')
      .find((line) => line.startsWith('- '))!
      .slice(2)
      .trim();
    expect(screen.getByText(firstBulletLine)).toBeInTheDocument();
  });

  it('shows a call to action linking to the related service when present', () => {
    const article = articlesData.find((a) => a.relatedService);
    expect(article).toBeDefined();
    const service = servicesData.find((s) => s.id === article!.relatedService)!;
    renderAt(`/articles/${article!.id}`);
    expect(screen.getByRole('link', { name: 'طلب استشارة الآن' })).toHaveAttribute(
      'href',
      `/services/${service.id}`
    );
  });
});
