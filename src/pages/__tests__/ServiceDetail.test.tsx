import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
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
    expect(screen.getByRole('heading', { name: service.title })).toBeInTheDocument();
    expect(screen.getByText(service.description)).toBeInTheDocument();
  });

  it('redirects to /services for an unknown id', () => {
    renderAt('/services/does-not-exist');
    expect(screen.getByText('Services list marker')).toBeInTheDocument();
  });
});
