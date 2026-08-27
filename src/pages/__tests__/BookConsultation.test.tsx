import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/utils';
import siteData from '../../content/site.json';
import BookConsultation from '../BookConsultation';

describe('BookConsultation page', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('keeps the submit button disabled until the privacy checkbox is accepted', async () => {
    const user = userEvent.setup();
    renderWithProviders(<BookConsultation />);

    const submitButton = screen.getByRole('button', { name: /إرسال الطلب عبر واتساب/ });
    expect(submitButton).toBeDisabled();

    await user.click(screen.getByRole('checkbox'));
    expect(submitButton).toBeEnabled();
  });

  it('sends a well-formed whatsapp message and translates the "other" service option to Arabic', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    const user = userEvent.setup();
    renderWithProviders(<BookConsultation />);

    await user.type(screen.getByLabelText('الاسم الثلاثي *'), 'أحمد علي');
    await user.type(screen.getByLabelText('رقم الهاتف (واتساب) *'), '+201000000000');
    await user.selectOptions(screen.getByLabelText('نوع القضية / الاستشارة *'), 'other');
    await user.selectOptions(screen.getByLabelText('الوقت المفضل للتواصل *'), 'الصباح (9ص - 12م)');
    await user.type(screen.getByLabelText(/وصف مختصر للطلب/), 'استفسار عام');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: /إرسال الطلب عبر واتساب/ }));

    expect(openSpy).toHaveBeenCalledTimes(1);
    const [url] = openSpy.mock.calls[0];
    expect(String(url)).toContain(`https://wa.me/${siteData.whatsappInternational}?text=`);
    const decoded = decodeURIComponent(String(url).split('?text=')[1]);
    expect(decoded).toContain('أحمد علي');
    expect(decoded).toContain('نوع القضية/الخدمة: أخرى');
    expect(decoded).not.toContain('نوع القضية/الخدمة: other');

    expect(await screen.findByText('تم تحويلك إلى واتساب بنجاح!')).toBeInTheDocument();
  });
});
