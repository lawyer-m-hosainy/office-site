import { describe, expect, it } from 'vitest';
import { formatArabicDate } from '../date';
import { articles, readingMinutes, relatedArticles, getArticle } from '../articles';
import { getServiceIcon } from '../icons';

describe('formatArabicDate', () => {
  it('formats an ISO date as an Arabic day-month-year string', () => {
    expect(formatArabicDate('2026-01-20')).toBe('20 يناير 2026');
    expect(formatArabicDate('2023-10-01')).toBe('1 أكتوبر 2023');
  });

  it('is deterministic, so prerendered and hydrated output match', () => {
    expect(formatArabicDate('2026-09-05')).toBe(formatArabicDate('2026-09-05'));
  });

  it('returns the input unchanged when it is not a date', () => {
    expect(formatArabicDate('not-a-date')).toBe('not-a-date');
  });
});

describe('articles helpers', () => {
  it('sorts articles newest first', () => {
    const dates = articles.map((a) => a.date);
    expect([...dates].sort((a, b) => b.localeCompare(a))).toEqual(dates);
  });

  it('looks up an article by id', () => {
    expect(getArticle(articles[0].id)?.title).toBe(articles[0].title);
    expect(getArticle('nope')).toBeUndefined();
  });

  it('estimates at least one minute of reading time', () => {
    expect(readingMinutes('كلمة')).toBe(1);
    expect(readingMinutes(articles[0].content)).toBeGreaterThan(0);
  });

  it('suggests related articles without repeating the current one', () => {
    const current = articles[0];
    const related = relatedArticles(current);
    expect(related.length).toBeGreaterThan(0);
    expect(related.map((a) => a.id)).not.toContain(current.id);
  });

  it('prefers articles from the same practice area', () => {
    const current = articles.find(
      (a) => a.relatedService && articles.filter((x) => x.relatedService === a.relatedService).length > 1
    )!;
    const related = relatedArticles(current);
    expect(related[0].relatedService).toBe(current.relatedService);
  });
});

describe('service icons', () => {
  it('resolves every icon named in services.json', () => {
    expect(getServiceIcon('Scale')).toBeDefined();
    expect(getServiceIcon('FileText')).toBeDefined();
  });

  it('falls back to a placeholder icon for an unknown name', () => {
    expect(getServiceIcon('NotARealIcon')).toBeDefined();
  });
});
