import { describe, expect, it } from 'vitest';
import { waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import siteData from '../../content/site.json';
import SEO from '../SEO';

describe('SEO', () => {
  it('sets the document title with the custom title and shortName suffix', async () => {
    renderWithProviders(<SEO title="مقال تجريبي" description="وصف تجريبي" />);
    await waitFor(() => {
      expect(document.title).toBe(`مقال تجريبي | ${siteData.shortName}`);
    });
  });

  it('falls back to the default site title when no title is provided', async () => {
    renderWithProviders(<SEO />);
    await waitFor(() => {
      expect(document.title.startsWith(siteData.name)).toBe(true);
    });
  });
});
