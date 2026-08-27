import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/utils';
import Disclaimer from '../Disclaimer';
import PrivacyPolicy from '../PrivacyPolicy';
import Terms from '../Terms';

describe('PrivacyPolicy page', () => {
  it('renders without the "الالاعتراض" typo', () => {
    renderWithProviders(<PrivacyPolicy />);
    expect(screen.getByRole('heading', { level: 1, name: 'سياسة الخصوصية' })).toBeInTheDocument();
    expect(screen.getByText('الاعتراض على معالجة بياناتك في حالات معينة.')).toBeInTheDocument();
    expect(screen.queryByText(/الالاعتراض/)).not.toBeInTheDocument();
  });
});

describe('Terms page', () => {
  it('renders the terms heading', () => {
    renderWithProviders(<Terms />);
    expect(screen.getByRole('heading', { level: 1, name: 'شروط الاستخدام' })).toBeInTheDocument();
  });
});

describe('Disclaimer page', () => {
  it('renders the disclaimer heading', () => {
    renderWithProviders(<Disclaimer />);
    expect(screen.getByRole('heading', { level: 1, name: 'إخلاء المسؤولية' })).toBeInTheDocument();
  });
});
