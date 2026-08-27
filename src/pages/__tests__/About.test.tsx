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
    expect(screen.getAllByRole('listitem')).toHaveLength(aboutData.values.length);
  });
});
