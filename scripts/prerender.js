import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const distDir = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf-8'));
const articles = read('src/content/articles.json');
const services = read('src/content/services.json');
const pages = read('src/content/pages.json');

if (!fs.existsSync(path.join(distDir, 'index.html'))) {
  console.log('dist/index.html not found, skipping prerender.');
  process.exit(0);
}

if (!fs.existsSync(ssrEntry)) {
  console.error('SSR bundle not found. Run `vite build --ssr src/entry-server.tsx` first.');
  process.exit(1);
}

const { render } = await import(ssrEntry);

// Helmet owns <title> and the meta tags, so drop the shell's placeholder title.
const template = fs
  .readFileSync(path.join(distDir, 'index.html'), 'utf-8')
  .replace(/<title>.*?<\/title>\s*/s, '');

const routes = [
  ...Object.keys(pages).filter((route) => route !== '/404'),
  ...services.map((s) => `/services/${s.id}`),
  ...articles.map((a) => `/articles/${a.id}`),
];

function writePage(route, html, head) {
  // Tagged so the browser can drop them just before hydration; crawlers without
  // JS keep them, and React re-renders its own set instead of duplicating.
  const taggedHead = head.replace(/<(title|meta|link|script)\b/g, '<$1 data-prerendered="true"');

  const page = template
    .replace('</head>', `    ${taggedHead}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  const target =
    route === '/404'
      ? path.join(distDir, '404.html')
      : path.join(distDir, route === '/' ? '' : route.slice(1), 'index.html');

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, page);
}

for (const route of routes) {
  const { html, head } = render(route);
  writePage(route, html, head);
}

// A real 404 document so unmatched URLs stop returning the homepage with HTTP 200.
const notFound = render('/__not-found__');
writePage('/404', notFound.html, notFound.head);

console.log(`Prerendered ${routes.length + 1} pages with full HTML content.`);
