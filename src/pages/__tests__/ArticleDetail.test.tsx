import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { articles } from '../../lib/articles';
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
    const article = articles[0];
    renderAt(`/articles/${article.id}`);
    expect(screen.getByRole('heading', { level: 1, name: article.title })).toBeInTheDocument();
  });

  it('explains that the article is missing instead of silently redirecting', () => {
    renderAt('/articles/does-not-exist');
    expect(screen.getByRole('heading', { level: 1, name: 'المقال غير موجود' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'العودة إلى الرئيسية' })).toBeInTheDocument();
    expect(screen.queryByText('Articles list marker')).not.toBeInTheDocument();
  });

  it('renders bullet list lines ("- ...") as bullet points', () => {
    const article = articles.find((a) => a.content.includes('\n- '))!;
    renderAt(`/articles/${article.id}`);
    const firstBullet = article.content
      .split('\n')
      .find((line) => line.startsWith('- '))!
      .slice(2)
      .trim();
    expect(screen.getByText(firstBullet)).toBeInTheDocument();
  });

  it('points the main call to action at the booking form, not the service description', () => {
    const article = articles.find((a) => a.relatedService)!;
    renderAt(`/articles/${article.id}`);

    const cta = screen.getByRole('link', { name: 'احجز استشارة الآن' });
    expect(cta).toHaveAttribute('href', '/book');

    const service = servicesData.find((s) => s.id === article.relatedService)!;
    expect(screen.getByRole('link', { name: 'تفاصيل الخدمة' })).toHaveAttribute(
      'href',
      `/services/${service.id}`
    );
  });

  it('offers a whatsapp share link carrying the article url', () => {
    const article = articles[0];
    renderAt(`/articles/${article.id}`);
    const share = screen.getByRole('link', { name: /مشاركة على واتساب/ });
    expect(share).toHaveAttribute('href', expect.stringContaining('wa.me/?text='));
    expect(decodeURIComponent(share.getAttribute('href')!)).toContain(`/articles/${article.id}`);
  });

  it('suggests related articles that exclude the current one', () => {
    const article = articles[0];
    renderAt(`/articles/${article.id}`);

    const section = screen.getByRole('heading', { name: 'مقالات قد تهمك أيضاً' });
    expect(section).toBeInTheDocument();

    const links = screen.getAllByRole('link', { name: (name) => name.length > 10 });
    const relatedHrefs = links
      .map((l) => l.getAttribute('href'))
      .filter((href) => href?.startsWith('/articles/'));
    expect(relatedHrefs).not.toContain(`/articles/${article.id}`);
    expect(relatedHrefs.length).toBeGreaterThan(0);
  });

  it('shows reading time and a formatted Arabic date', () => {
    const article = articles[0];
    renderAt(`/articles/${article.id}`);
    expect(screen.getByText(/دقائق قراءة/)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(article.date.split('-')[0]))).toBeInTheDocument();
  });
});
