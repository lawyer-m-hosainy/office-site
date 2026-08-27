import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import servicesData from '../../content/services.json';
import Home from '../Home';

describe('Home page', () => {
  it('renders the hero heading and a card with a working link for every service', () => {
    renderWithProviders(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

    for (const service of servicesData) {
      expect(screen.getByRole('heading', { name: service.title })).toBeInTheDocument();
    }

    const readMoreLinks = screen.getAllByRole('link', { name: /اقرأ المزيد/ });
    const hrefs = readMoreLinks.map((link) => link.getAttribute('href')).sort();
    const expectedHrefs = servicesData.map((s) => `/services/${s.id}`).sort();
    expect(hrefs).toEqual(expectedHrefs);
  });
});
