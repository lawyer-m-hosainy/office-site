import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/content/site.json'), 'utf-8'));
const articlesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/content/articles.json'), 'utf-8'));
const servicesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/content/services.json'), 'utf-8'));

const baseUrl = siteData.domain;
const currentDate = new Date().toISOString().split('T')[0];

const staticPages = [
  '',
  '/about',
  '/services',
  '/articles',
  '/book',
  '/contact',
  '/privacy',
  '/terms',
  '/disclaimer'
];

const urls = [];

// Add static pages
staticPages.forEach(page => {
  urls.push(`
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`);
});

// Add services
servicesData.forEach(service => {
  urls.push(`
  <url>
    <loc>${baseUrl}/services/${service.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
  </url>`);
});

// Add articles
articlesData.forEach(article => {
  urls.push(`
  <url>
    <loc>${baseUrl}/articles/${article.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
  </url>`);
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../dist/sitemap.xml'), sitemap);
console.log('Sitemap generated successfully!');
