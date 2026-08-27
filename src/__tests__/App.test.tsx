import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import App from '../App';

function renderAppAt(path: string) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

describe('App routing', () => {
  afterEach(() => {
    cleanup();
    window.history.pushState({}, '', '/');
  });

  it('renders the home page at /', () => {
    renderAppAt('/');
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders the 404 page for an unknown route', () => {
    renderAppAt('/this-route-does-not-exist');
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('keeps the header and footer mounted around the 404 page', () => {
    renderAppAt('/this-route-does-not-exist');
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
