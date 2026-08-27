import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import servicesData from '../../content/services.json';
import Services from '../Services';

describe('Services page', () => {
  it('lists every service with a details link', () => {
    renderWithProviders(<Services />);
    for (const service of servicesData) {
      expect(screen.getByRole('heading', { name: service.title })).toBeInTheDocument();
    }
    expect(screen.getAllByRole('link', { name: 'التفاصيل' })).toHaveLength(servicesData.length);
  });
});
