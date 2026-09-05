import SEO from '../components/SEO';
import siteData from '../content/site.json';
import { ChevronLeft, Clock, Mail, MapPin, MessageCircle, Phone } from '../lib/icons';
import { trackLead } from '../lib/analytics';

export default function Contact() {
  return (
    <>
      <SEO
        breadcrumbs={[
          { name: 'الرئيسية', path: '/' },
          { name: 'تواصل معنا', path: '/contact' },
        ]}
      />

      <div className="bg-surface py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">تواصل معنا</h1>
          <div className="w-16 h-1 bg-secondary" aria-hidden="true"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-8 text-primary">معلومات الاتصال</h2>

            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="bg-gray-100 p-4 rounded-full text-secondary shrink-0">
                  <Phone size={24} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">رقم الهاتف</h3>
                  <a
                    href={`tel:${siteData.phoneE164}`}
                    onClick={() => trackLead('phone', 'contact_page')}
                    className="text-gray-600 hover:text-secondary"
                  >
                    <span dir="ltr">{siteData.phoneDisplay}</span>
                  </a>
                  <p className="text-sm text-text-muted mt-1">اضغط على الرقم للاتصال مباشرة.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-gray-100 p-4 rounded-full text-secondary shrink-0">
                  <MessageCircle size={24} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">واتساب</h3>
                  <a
                    href={siteData.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackLead('whatsapp', 'contact_page')}
                    className="text-gray-600 hover:text-secondary"
                  >
                    <span dir="ltr">{siteData.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-gray-100 p-4 rounded-full text-secondary shrink-0">
                  <Mail size={24} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">البريد الإلكتروني</h3>
                  <a
                    href={`mailto:${siteData.email}`}
                    onClick={() => trackLead('email', 'contact_page')}
                    className="text-gray-600 hover:text-secondary block"
                  >
                    {siteData.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-gray-100 p-4 rounded-full text-secondary shrink-0">
                  <MapPin size={24} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">العنوان</h3>
                  <p className="text-gray-600">{siteData.address}</p>
                  <p className="text-gray-600">
                    {siteData.city} — محافظة {siteData.region}
                  </p>
                  {siteData.googleBusinessProfile && (
                    <a
                      href={siteData.googleBusinessProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 text-secondary font-semibold hover:underline"
                    >
                      افتح الموقع على خرائط جوجل
                      <ChevronLeft size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-gray-100 p-4 rounded-full text-secondary shrink-0">
                  <Clock size={24} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">ساعات العمل</h3>
                  <p className="text-gray-600 whitespace-pre-line">{siteData.workingHours}</p>
                  <p className="text-sm text-text-muted mt-1">{siteData.responseTime}.</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <a
                href={siteData.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLead('whatsapp', 'contact_cta')}
                className="inline-flex items-center gap-2 bg-whatsapp text-white px-6 py-3 rounded font-bold hover:bg-whatsapp/90 transition-colors shadow-sm"
              >
                <MessageCircle size={20} aria-hidden="true" />
                محادثة مباشرة عبر واتساب
              </a>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl border border-gray-200 h-full min-h-[300px] flex items-center justify-center flex-col text-center overflow-hidden">
            {siteData.mapLink ? (
              <iframe
                src={siteData.mapLink}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '100%' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع المكتب على الخريطة"
                className="w-full h-full min-h-[300px]"
              ></iframe>
            ) : (
              <div className="p-8 flex flex-col items-center justify-center h-full">
                <MapPin size={48} className="text-gray-400 mb-4" aria-hidden="true" />
                <p className="text-gray-600 max-w-xs text-lg leading-relaxed">
                  موقع المكتب على الخريطة سيتم إضافته قريباً.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
