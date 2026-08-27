import { describe, expect, it } from 'vitest';
import * as Icons from 'lucide-react';
import aboutData from '../about.json';
import articlesData from '../articles.json';
import servicesData from '../services.json';
import siteData from '../site.json';

describe('site.json', () => {
  it('has the required core fields non-empty', () => {
    expect(siteData.name).toBeTruthy();
    expect(siteData.shortName).toBeTruthy();
    expect(siteData.description).toBeTruthy();
    expect(siteData.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('has a whatsapp link consistent with the international number', () => {
    expect(siteData.whatsappLink).toBe(`https://wa.me/${siteData.whatsappInternational}`);
  });

  it('has a domain without a trailing slash', () => {
    expect(siteData.domain).toMatch(/^https:\/\//);
    expect(siteData.domain.endsWith('/')).toBe(false);
  });
});

describe('services.json', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(servicesData)).toBe(true);
    expect(servicesData.length).toBeGreaterThan(0);
  });

  it('has unique ids', () => {
    const ids = servicesData.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has required non-empty fields for every service', () => {
    for (const service of servicesData) {
      expect(service.id).toBeTruthy();
      expect(service.title).toBeTruthy();
      expect(service.shortDescription).toBeTruthy();
      expect(service.description).toBeTruthy();
      expect(service.icon).toBeTruthy();
    }
  });

  it('references an icon that actually exists in lucide-react', () => {
    for (const service of servicesData) {
      expect((Icons as Record<string, unknown>)[service.icon]).toBeDefined();
    }
  });
});

describe('articles.json', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(articlesData)).toBe(true);
    expect(articlesData.length).toBeGreaterThan(0);
  });

  it('has unique ids', () => {
    const ids = articlesData.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('uses url-safe slugs as ids', () => {
    for (const article of articlesData) {
      expect(article.id).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('has required non-empty fields for every article', () => {
    for (const article of articlesData) {
      expect(article.title).toBeTruthy();
      expect(article.excerpt).toBeTruthy();
      expect(article.content).toBeTruthy();
      expect(article.date).toBeTruthy();
    }
  });

  it('has a valid ISO date (YYYY-MM-DD) for every article', () => {
    for (const article of articlesData) {
      expect(article.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(new Date(article.date).getTime())).toBe(false);
    }
  });

  it('only references relatedService ids that exist in services.json', () => {
    const serviceIds = new Set(servicesData.map((s) => s.id));
    for (const article of articlesData) {
      if (article.relatedService) {
        expect(serviceIds.has(article.relatedService)).toBe(true);
      }
    }
  });
});

describe('about.json', () => {
  it('has the fields consumed by the About page', () => {
    expect(aboutData.intro).toBeTruthy();
    expect(aboutData.vision).toBeTruthy();
    expect(aboutData.mission).toBeTruthy();
    expect(Array.isArray(aboutData.values)).toBe(true);
    expect(aboutData.values.length).toBeGreaterThan(0);
    expect(aboutData.lawyerName).toBeTruthy();
  });
});
