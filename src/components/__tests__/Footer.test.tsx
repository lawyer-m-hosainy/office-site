import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import siteData from '../../content/site.json';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders contact details sourced from site.json', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText(siteData.whatsapp)).toHaveAttribute('href', siteData.whatsappLink);
    expect(screen.getByText(siteData.email)).toHaveAttribute('href', `mailto:${siteData.email}`);
  });

  it('shows the current year in the copyright line', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  it('links to the privacy and terms pages', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByRole('link', { name: 'سياسة الخصوصية' })).toHaveAttribute('href', '/privacy');
    expect(screen.getByRole('link', { name: 'شروط الاستخدام' })).toHaveAttribute('href', '/terms');
  });
});
