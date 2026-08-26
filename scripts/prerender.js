import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/content/site.json'), 'utf-8'));
const articlesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/content/articles.json'), 'utf-8'));
const servicesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/content/services.json'), 'utf-8'));

const distDir = path.join(__dirname, '../dist');
let indexHtml = '';
try {
  indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
} catch (e) {
  console.log('dist/index.html not found, skipping prerender.');
  process.exit(0);
}

const generatePage = (route, title, description) => {
  const pageTitle = title ? `${title} | ${siteData.shortName}` : `${siteData.name} | جنائي، مدني، أسرة، شركات`;
  const pageDesc = description || siteData.description;
  const url = `${siteData.domain}${route}`;

  let html = indexHtml.replace(/<title>.*?<\/title>/, `<title>${pageTitle}</title>`);
  
  const metaTags = `
    <meta name="description" content="${pageDesc}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${pageDesc}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${siteData.domain}/brand/og-cover.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${pageDesc}" />
    <meta name="twitter:image" content="${siteData.domain}/brand/og-cover.jpg" />
  `;
  
  html = html.replace('</head>', `${metaTags}</head>`);
  
  const dirPath = path.join(distDir, route.substring(1));
  if (route !== '' && route !== '/') {
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(path.join(dirPath, 'index.html'), html);
  } else {
    fs.writeFileSync(path.join(distDir, 'index.html'), html);
  }
};

generatePage('', '', '');
generatePage('/about', 'عن المكتب', '');
generatePage('/services', 'خدماتنا', '');
generatePage('/articles', 'المقالات القانونية', '');
generatePage('/book', 'احجز استشارة', 'احجز موعد استشارة قانونية مع مكتب الحسيني للمحاماة.');
generatePage('/contact', 'تواصل معنا', '');
generatePage('/privacy', 'سياسة الخصوصية', '');
generatePage('/terms', 'شروط الاستخدام', '');
generatePage('/disclaimer', 'إخلاء المسؤولية', '');

servicesData.forEach(s => {
  generatePage(`/services/${s.id}`, s.title, s.shortDescription);
});

articlesData.forEach(a => {
  generatePage(`/articles/${a.id}`, a.title, a.excerpt);
});

console.log('Prerendering completed.');
