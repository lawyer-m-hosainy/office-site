import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import SEO from '../components/SEO';
import siteData from '../content/site.json';
import servicesData from '../content/services.json';
import { Send } from '../lib/icons';
import { trackLead } from '../lib/analytics';

type SubmitState = 'idle' | 'sent' | 'blocked';

const EGYPT_MOBILE = /^(\+?2)?01[0125]\d{8}$/;

const initialForm = {
  name: '',
  phone: '',
  email: '',
  serviceType: '',
  description: '',
  preferredTime: '',
  privacyAccepted: false,
};

export default function BookConsultation() {
  const [formData, setFormData] = useState(initialForm);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [error, setError] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const consentRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const buildMessage = () => {
    const serviceTypeLabel = formData.serviceType === 'other' ? 'أخرى' : formData.serviceType;
    return [
      'طلب استشارة جديد:',
      `الاسم: ${formData.name}`,
      `الهاتف: ${formData.phone}`,
      ...(formData.email ? [`البريد الإلكتروني: ${formData.email}`] : []),
      `نوع القضية/الخدمة: ${serviceTypeLabel}`,
      `الوقت المفضل للتواصل: ${formData.preferredTime}`,
      `الوصف: ${formData.description}`,
      '(تم إرسال هذا الطلب المبدئي عبر الموقع الإلكتروني)',
    ].join('\n');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.privacyAccepted) {
      setError('يرجى الموافقة على إرسال البيانات عبر واتساب للمتابعة.');
      consentRef.current?.focus();
      return;
    }

    if (!EGYPT_MOBILE.test(formData.phone.replace(/[\s-]/g, ''))) {
      setError('يرجى إدخال رقم موبايل مصري صحيح، مثال: 01012345678');
      phoneRef.current?.focus();
      return;
    }

    const url = `https://wa.me/${siteData.whatsappInternational}?text=${encodeURIComponent(buildMessage())}`;
    setWhatsappUrl(url);

    const opened = window.open(url, '_blank', 'noopener');
    // A blocked popup returns null — never report success in that case.
    setSubmitState(opened ? 'sent' : 'blocked');
    trackLead('form', 'booking_form');
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    if (submitState !== 'idle') setSubmitState('idle');
    if (error) setError('');
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const fieldClass =
    'w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all';

  return (
    <>
      <SEO
        breadcrumbs={[
          { name: 'الرئيسية', path: '/' },
          { name: 'احجز استشارة', path: '/book' },
        ]}
      />

      <div className="bg-surface py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">احجز استشارة قانونية</h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            قم بتعبئة النموذج التالي وسنقوم بالتواصل معك لتحديد موعد الاستشارة. يرجى عدم إرسال أي
            أرقام هوية أو مستندات حساسة عبر هذا النموذج.
          </p>
          <p className="text-secondary font-semibold mt-4">{siteData.responseTime}.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-200">
          <div role="status" aria-live="polite">
            {submitState === 'sent' && (
              <div className="mb-6 p-4 bg-green-50 text-green-800 border border-green-200 rounded-md">
                <p className="font-bold">تم تحويلك إلى واتساب بنجاح!</p>
                <p className="text-sm mt-1">
                  إذا لم يفتح التطبيق تلقائياً، يمكنك إرسال رسالتك مباشرة على الرقم:{' '}
                  <span dir="ltr">{siteData.phoneDisplay}</span>
                </p>
              </div>
            )}

            {submitState === 'blocked' && (
              <div className="mb-6 p-4 bg-amber-50 text-amber-900 border border-amber-200 rounded-md">
                <p className="font-bold">لم يفتح واتساب تلقائياً</p>
                <p className="text-sm mt-1 mb-3">
                  يبدو أن المتصفح منع فتح النافذة. اضغط على الزر التالي لإرسال طلبك.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-whatsapp text-white px-6 py-2.5 rounded-md font-bold hover:bg-whatsapp/90 transition-colors"
                >
                  اضغط هنا لفتح واتساب
                </a>
              </div>
            )}
          </div>

          {error && (
            <p
              role="alert"
              className="mb-6 p-4 bg-red-50 text-red-800 border border-red-200 rounded-md text-sm font-semibold"
            >
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                  الاسم الثلاثي *
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                  رقم الهاتف (واتساب) *
                </label>
                <input
                  required
                  ref={phoneRef}
                  type="tel"
                  id="phone"
                  name="phone"
                  dir="ltr"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="01012345678"
                  aria-describedby="phone-hint"
                  value={formData.phone}
                  onChange={handleChange}
                  className={fieldClass}
                />
                <p id="phone-hint" className="text-xs text-text-muted mt-1">
                  رقم موبايل مصري مكوّن من 11 رقماً.
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                البريد الإلكتروني (اختياري)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                dir="ltr"
                inputMode="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={fieldClass}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="serviceType" className="block text-gray-700 font-bold mb-2">
                  نوع القضية / الاستشارة *
                </label>
                <select
                  required
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className={fieldClass}
                >
                  <option value="">اختر التخصص...</option>
                  {servicesData.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="other">أخرى</option>
                </select>
              </div>
              <div>
                <label htmlFor="preferredTime" className="block text-gray-700 font-bold mb-2">
                  الوقت المفضل للتواصل *
                </label>
                <select
                  required
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className={fieldClass}
                >
                  <option value="">اختر الوقت...</option>
                  <option value="الصباح (9ص - 12م)">الصباح (9ص - 12م)</option>
                  <option value="الظهر (12م - 4م)">الظهر (12م - 4م)</option>
                  <option value="المساء (4م - 8م)">المساء (4م - 8م)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                وصف مختصر للطلب *
              </label>
              <textarea
                required
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="اكتب نبذة عامة جداً عن موضوع الاستشارة..."
                aria-describedby="description-hint"
                className={fieldClass}
              ></textarea>
              <p id="description-hint" className="text-xs text-text-muted mt-1">
                تنبيه: لا تكتب أي أرقام قضايا أو بيانات سرية هنا.
              </p>
            </div>

            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded border border-gray-200">
              <input
                ref={consentRef}
                type="checkbox"
                id="privacyAccepted"
                name="privacyAccepted"
                checked={formData.privacyAccepted}
                onChange={handleChange}
                className="mt-1.5 shrink-0 w-4 h-4 text-secondary focus:ring-secondary border-gray-300 rounded"
              />
              <label htmlFor="privacyAccepted" className="text-sm text-gray-700 leading-relaxed">
                أوافق على إرسال هذه البيانات عبر تطبيق واتساب وأقر باطلاعي على{' '}
                <a href="/privacy" target="_blank" className="text-secondary hover:underline">
                  سياسة الخصوصية
                </a>
                . وأفهم أن هذا النموذج لا ينشئ علاقة تعاقدية بين المحامي والموكل قبل إبرام اتفاق
                رسمي.
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white hover:bg-primary/90 transition-colors font-bold py-4 rounded-md flex items-center justify-center gap-2"
            >
              <Send size={20} aria-hidden="true" />
              إرسال الطلب عبر واتساب
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
