import articlesRaw from '../content/articles.json';
import servicesData from '../content/services.json';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  relatedService?: string;
}

/** Newest first — the JSON file is maintained in authoring order. */
export const articles: Article[] = (articlesRaw as Article[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

export function getArticle(id: string | undefined): Article | undefined {
  return articles.find((a) => a.id === id);
}

export function getServiceTitle(serviceId: string | undefined): string | undefined {
  return servicesData.find((s) => s.id === serviceId)?.title;
}

/** Rough Arabic reading time; 180 words per minute. */
export function readingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 180));
}

/** Same practice area first, then most recent. */
export function relatedArticles(current: Article, limit = 3): Article[] {
  const sameArea = articles.filter(
    (a) => a.id !== current.id && a.relatedService === current.relatedService
  );
  const rest = articles.filter(
    (a) => a.id !== current.id && a.relatedService !== current.relatedService
  );
  return [...sameArea, ...rest].slice(0, limit);
}
