import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import siteData from '../content/site.json';

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  url?: string;
}

export default function SEO({ title, description, type = 'website', url }: SEOProps) {
  const location = useLocation();
  const currentUrl = url || `${siteData.domain}${location.pathname}`;
  const pageTitle = title ? `${title} | ${siteData.shortName}` : `${siteData.name} | جنائي، مدني، أسرة، شركات`;
  const pageDesc = description || siteData.description;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <link rel="canonical" href={currentUrl} />
      
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={`${siteData.domain}/brand/og-cover.jpg`} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={`${siteData.domain}/brand/og-cover.jpg`} />
      
      {/* Schema.org for LegalService */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LegalService",
          "name": siteData.name,
          "description": siteData.description,
          "url": siteData.domain,
          "logo": `${siteData.domain}/brand/logo.svg`,
          "telephone": siteData.whatsappInternational,
          "email": siteData.email,
          "address": siteData.address ? {
            "@type": "PostalAddress",
            "streetAddress": siteData.address
          } : undefined,
          "openingHours": siteData.workingHours || undefined
        })}
      </script>

      {/* Google Analytics (if configured) */}
      {(siteData as any).googleAnalyticsId && (
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${(siteData as any).googleAnalyticsId}`}></script>
      )}
      {(siteData as any).googleAnalyticsId && (
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${(siteData as any).googleAnalyticsId}');
          `}
        </script>
      )}
    </Helmet>
  );
}
