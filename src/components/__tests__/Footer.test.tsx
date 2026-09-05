import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import siteData from '../../content/site.json';
import Footer from '../Footer';

describe('Footer', () => {
  it('offers a real click-to-call link, not a whatsapp link, under the phone icon', () => {
    renderWithProviders(<Footer />);
    const phone = screen.getByRole('link', { name: siteData.phoneDisplay });
    expect(phone).toHaveAttribute('href', `tel:${siteData.phoneE164}`);
  });

  it('opens whatsapp in a new tab safely', () => {
    renderWithProviders(<Footer />);
    const whatsapp = screen.getByRole('link', { name: 'واتساب' });
    expect(whatsapp).toHaveAttribute('href', siteData.whatsappLink);
    expect(whatsapp).toHaveAttribute('target', '_blank');
    expect(whatsapp).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('links the email address', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText(siteData.email)).toHaveAttribute('href', `mailto:${siteData.email}`);
  });

  it('shows the current year in the copyright line', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  it('links every legal page, including the disclaimer', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByRole('link', { name: 'سياسة الخصوصية' })).toHaveAttribute('href', '/privacy');
    expect(screen.getByRole('link', { name: 'شروط الاستخدام' })).toHaveAttribute('href', '/terms');
    expect(screen.getByRole('link', { name: 'إخلاء المسؤولية' })).toHaveAttribute(
      'href',
      '/disclaimer'
    );
  });

  it('links the FAQ page', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByRole('link', { name: 'أسئلة قانونية شائعة' })).toHaveAttribute('href', '/faq');
  });
});
