import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import siteData from '../../content/site.json';
import WhatsAppButton from '../WhatsAppButton';

describe('WhatsAppButton', () => {
  it('links to the whatsapp chat and opens it in a new tab safely', () => {
    renderWithProviders(<WhatsAppButton />);
    const link = screen.getByRole('link', { name: 'تواصل معنا عبر واتساب' });
    expect(link).toHaveAttribute('href', siteData.whatsappLink);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});
