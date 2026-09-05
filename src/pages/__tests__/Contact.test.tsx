import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import siteData from '../../content/site.json';
import Contact from '../Contact';

describe('Contact page', () => {
  it('separates click-to-call from whatsapp so both are reachable', () => {
    renderWithProviders(<Contact />);

    const links = screen.getAllByRole('link', { name: siteData.phoneDisplay });
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain(`tel:${siteData.phoneE164}`);
    expect(hrefs).toContain(siteData.whatsappLink);
  });

  it('links the email address and renders the map embed', () => {
    renderWithProviders(<Contact />);
    expect(screen.getByText(siteData.email)).toHaveAttribute('href', `mailto:${siteData.email}`);
    expect(screen.getByTitle('موقع المكتب على الخريطة')).toHaveAttribute('src', siteData.mapLink);
  });

  it('offers a direct link to the Google Business Profile', () => {
    renderWithProviders(<Contact />);
    const link = screen.getByRole('link', { name: /خرائط جوجل/ });
    expect(link).toHaveAttribute('href', siteData.googleBusinessProfile);
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('states the city and governorate for local visitors', () => {
    renderWithProviders(<Contact />);
    expect(screen.getAllByText(new RegExp(siteData.city)).length).toBeGreaterThan(0);
    expect(screen.getByText(new RegExp(`محافظة ${siteData.region}`))).toBeInTheDocument();
  });
});
