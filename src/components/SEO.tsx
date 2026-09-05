import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router';
import siteData from '../content/site.json';
import pagesData from '../content/pages.json';

type PageMeta = { title: string; description: string };
const pages = pagesData as Record<string, PageMeta>;

export interface Breadcrumb {
  name: string;
  path: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  url?: string;
  /** Publication date (YYYY-MM-DD) — emits Article schema. */
  publishedAt?: string;
  breadcrumbs?: Breadcrumb[];
  /** Extra JSON-LD emitted alongside the office schema (e.g. FAQPage). */
  schema?: Record<string, unknown>;
  noindex?: boolean;
}

const ORG_ID = `${siteData.domain}/#office`;

export function buildOfficeSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': ORG_ID,
    name: siteData.name,
    description: siteData.description,
    url: siteData.domain,
    logo: `${siteData.domain}/brand/logo.svg`,
    image: `${siteData.domain}/brand/og-cover.jpg`,
    telephone: siteData.phoneE164,
    email: siteData.email,
    priceRange: '$$',
    knowsLanguage: ['ar', 'en'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteData.address,
      addressLocality: siteData.city,
      addressRegion: siteData.region,
      addressCountry: siteData.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteData.geo.latitude,
      longitude: siteData.geo.longitude,
    },
    areaServed: siteData.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: siteData.openingHoursSpecification.days,
        opens: siteData.openingHoursSpecification.opens,
        closes: siteData.openingHoursSpecification.closes,
      },
    ],
    ...(siteData.sameAs.length > 0 ? { sameAs: siteData.sameAs } : {}),
  };
}

export function buildArticleSchema(opts: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    datePublished: opts.publishedAt,
    dateModified: opts.publishedAt,
    inLanguage: 'ar',
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
    image: `${siteData.domain}/brand/og-cover.jpg`,
    author: { '@type': 'Organization', '@id': ORG_ID, name: siteData.name },
    publisher: { '@id': ORG_ID },
  };
}

export function buildBreadcrumbSchema(crumbs: Breadcrumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${siteData.domain}${c.path}`,
    })),
  };
}

export default function SEO({
  title,
  description,
  type = 'website',
  url,
  publishedAt,
  breadcrumbs,
  schema,
  noindex,
}: SEOProps) {
  const location = useLocation();
  // A host that adds a trailing slash must still resolve to the same page entry,
  // otherwise the lookup misses and the page silently inherits the home metadata.
  const pathname = location.pathname.replace(/\/+$/, '') || '/';
  const meta = pages[pathname];

  const resolvedTitle = title ?? meta?.title ?? '';
  const resolvedDesc = description ?? meta?.description ?? siteData.description;
  const currentUrl = url || `${siteData.domain}${pathname === '/' ? '/' : pathname}`;
  const pageTitle = resolvedTitle
    ? `${resolvedTitle} | ${siteData.shortName}`
    : `${siteData.name} | ${siteData.tagline}`;
  const ogImage = `${siteData.domain}/brand/og-cover.jpg`;

  return (
    <Helmet>
      <html lang="ar" dir="rtl" />
      <title>{pageTitle}</title>
      <meta name="description" content={resolvedDesc} />
      {/* A not-found page must not claim a canonical URL of its own. */}
      {!noindex && <link rel="canonical" href={currentUrl} />}
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:site_name" content={siteData.shortName} />
      <meta property="og:locale" content="ar_EG" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={resolvedDesc} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={siteData.name} />
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={resolvedDesc} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(buildOfficeSchema())}</script>

      {publishedAt && (
        <script type="application/ld+json">
          {JSON.stringify(
            buildArticleSchema({
              title: resolvedTitle,
              description: resolvedDesc,
              url: currentUrl,
              publishedAt,
            })
          )}
        </script>
      )}

      {breadcrumbs && breadcrumbs.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(buildBreadcrumbSchema(breadcrumbs))}
        </script>
      )}

      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
}
