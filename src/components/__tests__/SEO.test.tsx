import { describe, expect, it } from 'vitest';
import { waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import siteData from '../../content/site.json';
import pagesData from '../../content/pages.json';
import SEO, { buildArticleSchema, buildBreadcrumbSchema, buildOfficeSchema } from '../SEO';

describe('SEO component', () => {
  it('sets the document title with the custom title and shortName suffix', async () => {
    renderWithProviders(<SEO title="مقال تجريبي" description="وصف تجريبي" />);
    await waitFor(() => {
      expect(document.title).toBe(`مقال تجريبي | ${siteData.shortName}`);
    });
  });

  it('falls back to the shared page metadata for a known route', async () => {
    renderWithProviders(<SEO />, { route: '/about' });
    await waitFor(() => {
      expect(document.title).toBe(`${pagesData['/about'].title} | ${siteData.shortName}`);
    });
  });

  it('uses the site tagline on the home page title', async () => {
    renderWithProviders(<SEO />, { route: '/' });
    await waitFor(() => {
      expect(document.title).toBe(`${siteData.name} | ${siteData.tagline}`);
    });
  });
});

describe('office schema', () => {
  const schema = buildOfficeSchema();

  it('is a LegalService with a stable id', () => {
    expect(schema['@type']).toBe('LegalService');
    expect(schema['@id']).toBe(`${siteData.domain}/#office`);
  });

  it('carries the full postal address so the office can rank locally', () => {
    expect(schema.address.addressLocality).toBe(siteData.city);
    expect(schema.address.addressRegion).toBe(siteData.region);
    expect(schema.address.addressCountry).toBe('EG');
  });

  it('uses an E.164 telephone number', () => {
    expect(schema.telephone).toMatch(/^\+\d{6,15}$/);
  });

  it('expresses opening hours in a machine-readable form', () => {
    const spec = schema.openingHoursSpecification[0];
    expect(spec.opens).toMatch(/^\d{2}:\d{2}$/);
    expect(spec.closes).toMatch(/^\d{2}:\d{2}$/);
    expect(spec.dayOfWeek.length).toBeGreaterThan(0);
  });

  it('includes geo coordinates and served areas', () => {
    expect(typeof schema.geo.latitude).toBe('number');
    expect(typeof schema.geo.longitude).toBe('number');
    expect(schema.areaServed.length).toBeGreaterThan(0);
  });
});

describe('article and breadcrumb schema', () => {
  it('builds Article schema pointing at the office as publisher', () => {
    const schema = buildArticleSchema({
      title: 'عنوان',
      description: 'وصف',
      url: `${siteData.domain}/articles/x`,
      publishedAt: '2026-01-20',
    });
    expect(schema['@type']).toBe('Article');
    expect(schema.datePublished).toBe('2026-01-20');
    expect(schema.publisher['@id']).toBe(`${siteData.domain}/#office`);
  });

  it('numbers breadcrumb positions from one and resolves absolute urls', () => {
    const schema = buildBreadcrumbSchema([
      { name: 'الرئيسية', path: '/' },
      { name: 'المقالات', path: '/articles' },
    ]);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].item).toBe(`${siteData.domain}/articles`);
  });
});
