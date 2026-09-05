import { describe, expect, it } from 'vitest';
import { serviceIcons } from '../../lib/icons';
import aboutData from '../about.json';
import articlesData from '../articles.json';
import faqData from '../faq.json';
import pagesData from '../pages.json';
import servicesData from '../services.json';
import siteData from '../site.json';

describe('site.json', () => {
  it('has the required core fields non-empty', () => {
    expect(siteData.name).toBeTruthy();
    expect(siteData.shortName).toBeTruthy();
    expect(siteData.description).toBeTruthy();
    expect(siteData.tagline).toBeTruthy();
    expect(siteData.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('has a whatsapp link consistent with the international number', () => {
    expect(siteData.whatsappLink).toBe(`https://wa.me/${siteData.whatsappInternational}`);
  });

  it('stores the phone in E.164 form for schema and tel: links', () => {
    expect(siteData.phoneE164).toMatch(/^\+\d{6,15}$/);
    expect(siteData.phoneE164).toBe(`+${siteData.whatsappInternational}`);
  });

  it('has a domain without a trailing slash', () => {
    expect(siteData.domain).toMatch(/^https:\/\//);
    expect(siteData.domain.endsWith('/')).toBe(false);
  });

  it('carries the local-SEO fields the office schema needs', () => {
    expect(siteData.city).toBeTruthy();
    expect(siteData.region).toBeTruthy();
    expect(siteData.country).toBe('EG');
    expect(siteData.geo.latitude).toBeGreaterThan(0);
    expect(siteData.geo.longitude).toBeGreaterThan(0);
    expect(siteData.areaServed.length).toBeGreaterThan(0);
  });

  it('mentions the city in the site description so the home page targets it', () => {
    expect(siteData.description).toContain(siteData.city);
  });

  it('has a fixed legal review date rather than a moving one', () => {
    expect(siteData.legalLastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('pages.json', () => {
  it('covers every static route the router serves', () => {
    const routes = [
      '/',
      '/about',
      '/services',
      '/articles',
      '/faq',
      '/book',
      '/contact',
      '/privacy',
      '/terms',
      '/disclaimer',
      '/404',
    ];
    for (const route of routes) {
      expect(pagesData).toHaveProperty(route);
    }
  });

  it('gives every route a non-empty description', () => {
    for (const [route, meta] of Object.entries(pagesData)) {
      expect(meta.description, `${route} description`).toBeTruthy();
      expect(meta.description.length, `${route} description length`).toBeGreaterThan(50);
    }
  });

  it('names the city on the pages that sell the practice', () => {
    for (const route of ['/', '/services', '/about', '/contact', '/book']) {
      expect(pagesData[route as keyof typeof pagesData].description).toContain(siteData.city);
    }
  });
});

describe('services.json', () => {
  it('has unique ids and required fields', () => {
    const ids = servicesData.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const service of servicesData) {
      expect(service.title).toBeTruthy();
      expect(service.shortDescription).toBeTruthy();
      expect(service.description).toBeTruthy();
    }
  });

  it('only names icons the bundle actually imports', () => {
    for (const service of servicesData) {
      expect(Object.keys(serviceIcons)).toContain(service.icon);
    }
  });
});

describe('articles.json', () => {
  it('has unique, url-safe ids', () => {
    const ids = articlesData.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('has required non-empty fields and a valid ISO date', () => {
    for (const article of articlesData) {
      expect(article.title).toBeTruthy();
      expect(article.excerpt).toBeTruthy();
      expect(article.content).toBeTruthy();
      expect(article.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(new Date(article.date).getTime())).toBe(false);
    }
  });

  it('only references relatedService ids that exist', () => {
    const serviceIds = new Set(servicesData.map((s) => s.id));
    for (const article of articlesData) {
      if (article.relatedService) {
        expect(serviceIds.has(article.relatedService)).toBe(true);
      }
    }
  });

  it('keeps excerpts short enough to serve as meta descriptions', () => {
    for (const article of articlesData) {
      expect(article.excerpt.length, article.id).toBeLessThanOrEqual(200);
    }
  });
});

describe('faq.json', () => {
  it('has unique ids and complete question/answer pairs', () => {
    const ids = faqData.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of faqData) {
      expect(item.id).toMatch(/^[a-z0-9-]+$/);
      expect(item.question).toBeTruthy();
      expect(item.category).toBeTruthy();
      expect(item.answer.length, item.id).toBeGreaterThan(80);
    }
  });

  it('phrases every entry as a question', () => {
    for (const item of faqData) {
      expect(item.question.trim().endsWith('؟'), item.id).toBe(true);
    }
  });
});

describe('about.json', () => {
  it('has the fields consumed by the About page', () => {
    expect(aboutData.intro).toBeTruthy();
    expect(aboutData.vision).toBeTruthy();
    expect(aboutData.mission).toBeTruthy();
    expect(aboutData.values.length).toBeGreaterThan(0);
    expect(aboutData.lawyerName).toBeTruthy();
    expect(Array.isArray(aboutData.credentials)).toBe(true);
  });
});
