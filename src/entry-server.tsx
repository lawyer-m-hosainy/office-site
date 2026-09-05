import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from './AppRoutes';

export interface RenderResult {
  html: string;
  head: string;
}

// React 19 emits hoistable tags inline in the streamed body rather than through
// Helmet's server context, so they are lifted into <head> here — a canonical or
// description left in <body> is ignored by search engines.
// JSON-LD stays where it is: Google reads it from the body too, and leaving it
// in place keeps the markup identical to what the client renders on hydration.
const HOISTABLE = /<title>.*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>/gs;

export function render(url: string): RenderResult {
  const rendered = renderToString(
    <StrictMode>
      <HelmetProvider>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );

  const head = (rendered.match(HOISTABLE) ?? []).join('\n    ');
  const html = rendered.replace(HOISTABLE, '');

  return { html, head };
}
