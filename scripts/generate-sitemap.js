import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf-8'));
const site = read('src/content/site.json');
const articles = read('src/content/articles.json');
const services = read('src/content/services.json');

const baseUrl = site.domain;
const buildDate = new Date().toISOString().split('T')[0];

// Priority reflects how much each page matters for winning clients.
const staticPages = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/book', priority: '0.9', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/faq', priority: '0.8', changefreq: 'monthly' },
  { path: '/articles', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.2', changefreq: 'yearly' },
  { path: '/terms', priority: '0.2', changefreq: 'yearly' },
  { path: '/disclaimer', priority: '0.2', changefreq: 'yearly' },
];

const entry = ({ loc, lastmod, changefreq, priority }) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

const urls = [
  ...staticPages.map((page) =>
    entry({
      loc: `${baseUrl}${page.path}`,
      lastmod: buildDate,
      changefreq: page.changefreq,
      priority: page.priority,
    })
  ),
  ...services.map((service) =>
    entry({
      loc: `${baseUrl}/services/${service.id}`,
      lastmod: buildDate,
      changefreq: 'monthly',
      priority: '0.8',
    })
  ),
  // Articles keep their own publication date so lastmod stays trustworthy.
  ...articles.map((article) =>
    entry({
      loc: `${baseUrl}/articles/${article.id}`,
      lastmod: article.date,
      changefreq: 'yearly',
      priority: '0.6',
    })
  ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

fs.writeFileSync(path.join(root, 'dist', 'sitemap.xml'), sitemap);
console.log(`Sitemap generated with ${urls.length} URLs.`);
