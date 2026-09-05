import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import servicesData from '../../content/services.json';
import ServiceDetail from '../ServiceDetail';

function renderAt(route: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/services" element={<div>Services list marker</div>} />
          <Route path="/services/:id" element={<ServiceDetail />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe('ServiceDetail page', () => {
  it('renders the matching service title and description for a known id', () => {
    const service = servicesData[0];
    renderAt(`/services/${service.id}`);
    expect(screen.getByRole('heading', { level: 1, name: service.title })).toBeInTheDocument();
    expect(screen.getByText(service.description)).toBeInTheDocument();
  });

  it('explains that the service is missing instead of silently redirecting', () => {
    renderAt('/services/does-not-exist');
    expect(screen.getByRole('heading', { level: 1, name: 'الخدمة غير موجودة' })).toBeInTheDocument();
    expect(screen.queryByText('Services list marker')).not.toBeInTheDocument();
  });

  it('sends both calls to action to reachable destinations', () => {
    const service = servicesData[0];
    renderAt(`/services/${service.id}`);
    expect(screen.getByRole('link', { name: 'احجز موعداً' })).toHaveAttribute('href', '/book');
    expect(screen.getByRole('link', { name: /تواصل عبر واتساب/ })).toHaveAttribute(
      'target',
      '_blank'
    );
  });
});
