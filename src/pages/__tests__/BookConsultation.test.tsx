import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/utils';
import siteData from '../../content/site.json';
import BookConsultation from '../BookConsultation';

async function fillForm(user: ReturnType<typeof userEvent.setup>, phone = '01012345678') {
  await user.type(screen.getByLabelText('الاسم الثلاثي *'), 'أحمد علي');
  await user.type(screen.getByLabelText('رقم الهاتف (واتساب) *'), phone);
  await user.selectOptions(screen.getByLabelText('نوع القضية / الاستشارة *'), 'other');
  await user.selectOptions(screen.getByLabelText('الوقت المفضل للتواصل *'), 'الصباح (9ص - 12م)');
  await user.type(screen.getByLabelText('وصف مختصر للطلب *'), 'استفسار عام');
}

function submitButton() {
  return screen.getByRole('button', { name: /إرسال الطلب عبر واتساب/ });
}

describe('BookConsultation page', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('keeps the submit button focusable and explains why consent is required', async () => {
    const user = userEvent.setup();
    renderWithProviders(<BookConsultation />);

    expect(submitButton()).toBeEnabled();

    await fillForm(user);
    await user.click(submitButton());

    expect(await screen.findByRole('alert')).toHaveTextContent(/الموافقة/);
    expect(screen.getByRole('checkbox')).toHaveFocus();
  });

  it('rejects a malformed phone number before opening whatsapp', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    const user = userEvent.setup();
    renderWithProviders(<BookConsultation />);

    await fillForm(user, '12345');
    await user.click(screen.getByRole('checkbox'));
    await user.click(submitButton());

    expect(await screen.findByRole('alert')).toHaveTextContent(/رقم موبايل مصري صحيح/);
    expect(openSpy).not.toHaveBeenCalled();
  });

  it('sends every collected field, including the preferred time and email', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => window);
    const user = userEvent.setup();
    renderWithProviders(<BookConsultation />);

    await fillForm(user);
    await user.type(screen.getByLabelText('البريد الإلكتروني (اختياري)'), 'a@b.com');
    await user.click(screen.getByRole('checkbox'));
    await user.click(submitButton());

    expect(openSpy).toHaveBeenCalledTimes(1);
    const url = String(openSpy.mock.calls[0][0]);
    expect(url).toContain(`https://wa.me/${siteData.whatsappInternational}?text=`);

    const message = decodeURIComponent(url.split('?text=')[1]);
    expect(message).toContain('أحمد علي');
    expect(message).toContain('الوقت المفضل للتواصل: الصباح (9ص - 12م)');
    expect(message).toContain('البريد الإلكتروني: a@b.com');
    expect(message).toContain('نوع القضية/الخدمة: أخرى');
    expect(message).not.toContain('نوع القضية/الخدمة: other');

    expect(await screen.findByText('تم تحويلك إلى واتساب بنجاح!')).toBeInTheDocument();
  });

  it('offers a manual link instead of claiming success when the popup is blocked', async () => {
    vi.spyOn(window, 'open').mockImplementation(() => null);
    const user = userEvent.setup();
    renderWithProviders(<BookConsultation />);

    await fillForm(user);
    await user.click(screen.getByRole('checkbox'));
    await user.click(submitButton());

    expect(screen.queryByText('تم تحويلك إلى واتساب بنجاح!')).not.toBeInTheDocument();
    expect(await screen.findByText('لم يفتح واتساب تلقائياً')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'اضغط هنا لفتح واتساب' })).toHaveAttribute(
      'href',
      expect.stringContaining('wa.me')
    );
  });

  it('clears the success banner once the visitor edits the form again', async () => {
    vi.spyOn(window, 'open').mockImplementation(() => window);
    const user = userEvent.setup();
    renderWithProviders(<BookConsultation />);

    await fillForm(user);
    await user.click(screen.getByRole('checkbox'));
    await user.click(submitButton());
    expect(await screen.findByText('تم تحويلك إلى واتساب بنجاح!')).toBeInTheDocument();

    await user.type(screen.getByLabelText('الاسم الثلاثي *'), 'ب');
    expect(screen.queryByText('تم تحويلك إلى واتساب بنجاح!')).not.toBeInTheDocument();
  });

  it('gives phone and email fields mobile-friendly input hints', () => {
    renderWithProviders(<BookConsultation />);
    const phone = screen.getByLabelText('رقم الهاتف (واتساب) *');
    expect(phone).toHaveAttribute('inputmode', 'tel');
    expect(phone).toHaveAttribute('autocomplete', 'tel');
    expect(screen.getByLabelText('الاسم الثلاثي *')).toHaveAttribute('autocomplete', 'name');
  });
});
