import { describe, expect, it } from 'vitest';
import { render } from '../entry-server';
import { articles } from '../lib/articles';
import siteData from '../content/site.json';

describe('prerender output', () => {
  it('renders real page content, not an empty shell', () => {
    const { html } = render('/about');
    expect(html).toContain('<h1');
    expect(html).toContain('من نحن');
    expect(html).toContain('عن المكتب');
    expect(html.length).toBeGreaterThan(3000);
  });

  it('lifts title, description and canonical into the head fragment', () => {
    const { head, html } = render('/about');

    expect(head).toContain('<title>من نحن | مكتب الحسيني</title>');
    expect(head).toContain('rel="canonical"');
    expect(head).toContain('name="description"');
    expect(head).toContain('property="og:image"');

    // A canonical or description left in <body> is ignored by search engines.
    expect(html).not.toContain('rel="canonical"');
    expect(html).not.toContain('name="description"');
    expect(html).not.toContain('<title>');
  });

  it('keeps JSON-LD in the body so the markup still matches on hydration', () => {
    const { html, head } = render('/about');
    expect(html).toContain('application/ld+json');
    expect(head).not.toContain('application/ld+json');
  });

  it('emits article and breadcrumb schema on an article route', () => {
    const { html } = render(`/articles/${articles[0].id}`);
    expect(html).toContain('"@type":"Article"');
    expect(html).toContain('"@type":"BreadcrumbList"');
    expect(html).toContain(articles[0].title);
  });

  it('emits FAQ schema on the FAQ route', () => {
    const { html } = render('/faq');
    expect(html).toContain('"@type":"FAQPage"');
  });

  it('names the office city in the home page markup and schema', () => {
    const { html, head } = render('/');
    expect(html).toContain(siteData.city);
    expect(html).toContain(`"addressLocality":"${siteData.city}"`);
    expect(head).toContain(siteData.city);
  });

  it('marks an unknown route noindex and gives it no canonical', () => {
    const { head, html } = render('/__not-found__');
    expect(head).toContain('content="noindex, follow"');
    expect(head).not.toContain('rel="canonical"');
    expect(html).toContain('عذراً، الصفحة غير موجودة');
  });
});
