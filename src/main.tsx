import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Pages are prerendered at build time, so hydrate the existing markup when it
// is there and fall back to a fresh render (dev server, empty shell).
if (container.hasChildNodes()) {
  // Remove the build-time head tags so React's own copies don't duplicate them.
  document.head.querySelectorAll('[data-prerendered]').forEach((node) => node.remove());
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
