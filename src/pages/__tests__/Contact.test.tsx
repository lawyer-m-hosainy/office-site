import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import siteData from '../../content/site.json';
import Contact from '../Contact';

describe('Contact page', () => {
  it('renders working contact links and the map embed', () => {
    renderWithProviders(<Contact />);
    expect(screen.getByText(siteData.whatsapp)).toHaveAttribute('href', siteData.whatsappLink);
    expect(screen.getByText(siteData.email)).toHaveAttribute('href', `mailto:${siteData.email}`);
    expect(screen.getByTitle('موقع المكتب على الخريطة')).toHaveAttribute('src', siteData.mapLink);
  });
});
