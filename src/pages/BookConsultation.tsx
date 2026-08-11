import React, { useState } from 'react';
import SEO from '../components/SEO';
import siteData from '../content/site.json';
import servicesData from '../content/services.json';
import { Send } from 'lucide-react';

export default function BookConsultation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    description: '',
    preferredTime: '',
    privacyAccepted: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAccepted) return;
    
    // Format message for WhatsApp
    const message = `طلب استشارة جديد:
الاسم: ${formData.name}
الهاتف: ${formData.phone}
نوع القضية/الخدمة: ${formData.serviceType}
الوصف: ${formData.description}
(تم إرسال هذا الطلب المبدئي عبر الموقع الإلكتروني)`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${siteData.whatsappInternational}?text=${encodedMessage}`, '_blank');
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <>
      <SEO title="احجز استشارة" description="احجز موعد استشارة قانونية مع مكتب الحسيني للمحاماة." />
      
      <div className="bg-surface py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary">احجز استشارة قانونية</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            قم بتعبئة النموذج التالي وسنقوم بالتواصل معك لتحديد موعد الاستشارة. يرجى عدم إرسال أي أرقام هوية أو مستندات حساسة عبر هذا النموذج.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-200">
          
          {isSubmitted && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-md">
              <p className="font-bold">تم تحويلك إلى واتساب بنجاح!</p>
              <p className="text-sm mt-1">إذا لم يفتح التطبيق تلقائياً، يمكنك إرسال رسالتك مباشرة على الرقم: <span dir="ltr">{siteData.whatsapp}</span></p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">الاسم الثلاثي *</label>
                <input required type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">رقم الهاتف (واتساب) *</label>
                <input required type="tel" id="phone" name="phone" dir="ltr" placeholder="+201..." value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all text-right" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">البريد الإلكتروني (اختياري)</label>
              <input type="email" id="email" name="email" dir="ltr" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all text-right" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="serviceType" className="block text-gray-700 font-bold mb-2">نوع القضية / الاستشارة *</label>
                <select required id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all">
                  <option value="">اختر التخصص...</option>
                  {servicesData.map(s => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                  <option value="other">أخرى</option>
                </select>
              </div>
              <div>
                <label htmlFor="preferredTime" className="block text-gray-700 font-bold mb-2">الوقت المفضل للتواصل *</label>
                <select required id="preferredTime" name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all">
                  <option value="">اختر الوقت...</option>
                  <option value="الصباح (9ص - 12م)">الصباح (9ص - 12م)</option>
                  <option value="الظهر (12م - 4م)">الظهر (12م - 4م)</option>
                  <option value="المساء (4م - 8م)">المساء (4م - 8م)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">وصف مختصر للطلب (تنبيه: لا تكتب أي أرقام قضايا أو مستندات سرية هنا) *</label>
              <textarea required id="description" name="description" rows={4} value={formData.description} onChange={handleChange} placeholder="اكتب نبذة عامة جداً عن موضوع الاستشارة..." className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"></textarea>
            </div>

            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded border border-gray-200">
              <input required type="checkbox" id="privacyAccepted" name="privacyAccepted" checked={formData.privacyAccepted} onChange={handleChange} className="mt-1.5 shrink-0 w-4 h-4 text-secondary focus:ring-secondary border-gray-300 rounded" />
              <label htmlFor="privacyAccepted" className="text-sm text-gray-600 leading-relaxed">
                أوافق على إرسال هذه البيانات عبر تطبيق واتساب وأقر باطلاعي على <a href="/privacy" target="_blank" className="text-secondary hover:underline">سياسة الخصوصية</a>. وأفهم أن هذا النموذج لا ينشئ علاقة تعاقدية بين المحامي والموكل قبل إبرام اتفاق رسمي.
              </label>
            </div>

            <button type="submit" disabled={!formData.privacyAccepted} className="w-full bg-primary text-secondary hover:bg-secondary hover:text-primary transition-colors font-bold py-4 rounded-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              <Send size={20} />
              إرسال الطلب عبر واتساب
            </button>
          </form>

        </div>
      </div>
    </>
  );
}
