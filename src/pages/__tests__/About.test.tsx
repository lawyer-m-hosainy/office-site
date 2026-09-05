import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import aboutData from '../../content/about.json';
import About from '../About';

describe('About page', () => {
  it('renders the lawyer name and the office intro', () => {
    renderWithProviders(<About />);
    expect(screen.getByText(aboutData.intro)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: aboutData.lawyerName })).toBeInTheDocument();
  });

  it('lists every professional value', () => {
    renderWithProviders(<About />);
    for (const value of aboutData.values) {
      expect(screen.getByText(value)).toBeInTheDocument();
    }
  });

  it('lists the credentials the office chose to publish', () => {
    renderWithProviders(<About />);
    for (const item of aboutData.credentials) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it('falls back to an icon labelled with the lawyer name when no photo is configured', () => {
    renderWithProviders(<About />);
    if (!aboutData.lawyerPhoto) {
      expect(screen.getByRole('img', { name: aboutData.lawyerName })).toBeInTheDocument();
      expect(screen.queryByRole('img', { name: /^\/.*\.(jpg|png)$/ })).not.toBeInTheDocument();
    }
  });
});
