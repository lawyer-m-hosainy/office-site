import { Link } from 'react-router-dom';
import siteData from '../content/site.json';
import { Mail, MapPin, MessageCircle, Phone } from '../lib/icons';
import { trackLead } from '../lib/analytics';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="bg-primary text-background pt-16 pb-8 border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-12">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3 mb-2" aria-label="الصفحة الرئيسية">
              <BrandLogo onDark />
            </Link>
            <p className="text-background/80 leading-relaxed text-sm">{siteData.description}</p>
          </div>

          <div>
            <h2 className="text-secondary-bright font-bold text-xl mb-6">روابط سريعة</h2>
            <ul className="space-y-3 text-background/90 text-sm">
              <li>
                <Link to="/about" className="hover:text-secondary-bright transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-secondary-bright transition-colors">
                  الخدمات القانونية
                </Link>
              </li>
              <li>
                <Link to="/articles" className="hover:text-secondary-bright transition-colors">
                  المقالات
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-secondary-bright transition-colors">
                  أسئلة قانونية شائعة
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-secondary-bright transition-colors">
                  تواصل معنا
                </Link>
              </li>
              <li>
                <Link
                  to="/book"
                  className="text-secondary-bright hover:text-white transition-colors font-bold"
                >
                  احجز استشارة
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-secondary-bright font-bold text-xl mb-6">معلومات التواصل</h2>
            <ul className="space-y-4 text-background/90 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="text-secondary-bright shrink-0 mt-0.5" size={18} aria-hidden="true" />
                <a
                  href={`tel:${siteData.phoneE164}`}
                  onClick={() => trackLead('phone', 'footer')}
                  className="hover:text-secondary-bright transition-colors"
                >
                  <span dir="ltr">{siteData.phoneDisplay}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle
                  className="text-secondary-bright shrink-0 mt-0.5"
                  size={18}
                  aria-hidden="true"
                />
                <a
                  href={siteData.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackLead('whatsapp', 'footer')}
                  className="hover:text-secondary-bright transition-colors"
                >
                  واتساب
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-secondary-bright shrink-0 mt-0.5" size={18} aria-hidden="true" />
                <a
                  href={`mailto:${siteData.email}`}
                  onClick={() => trackLead('email', 'footer')}
                  className="hover:text-secondary-bright transition-colors"
                >
                  {siteData.email}
                </a>
              </li>
              {siteData.address && (
                <li className="flex items-start gap-3">
                  <MapPin
                    className="text-secondary-bright shrink-0 mt-0.5"
                    size={18}
                    aria-hidden="true"
                  />
                  <span className="leading-relaxed">{siteData.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/80">
          <p>© {new Date().getFullYear()} {siteData.shortName}. جميع الحقوق محفوظة.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/privacy" className="hover:text-background transition-colors">
              سياسة الخصوصية
            </Link>
            <Link to="/terms" className="hover:text-background transition-colors">
              شروط الاستخدام
            </Link>
            <Link to="/disclaimer" className="hover:text-background transition-colors">
              إخلاء المسؤولية
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
