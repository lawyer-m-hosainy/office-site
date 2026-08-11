import React from 'react';
import { Link } from 'react-router-dom';
import siteData from '../content/site.json';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-background pt-16 pb-8 border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-12">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3 mb-2">
               <img src="/brand/logo.svg" alt="شعار المكتب" className="h-12 w-auto brightness-0 invert" onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="%23F7F3EC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';
            }} />
            </Link>
            <p className="text-background/80 leading-relaxed text-sm">
              {siteData.description}
            </p>
          </div>
          
          <div>
            <h3 className="text-secondary font-bold text-lg mb-6">روابط سريعة</h3>
            <ul className="space-y-3 text-background/90 text-sm">
              <li><Link to="/about" className="hover:text-secondary transition-colors">من نحن</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors">الخدمات القانونية</Link></li>
              <li><Link to="/articles" className="hover:text-secondary transition-colors">المقالات</Link></li>
              <li><Link to="/contact" className="hover:text-secondary transition-colors">تواصل معنا</Link></li>
              <li><Link to="/book" className="text-secondary hover:text-white transition-colors font-bold">احجز استشارة</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-secondary font-bold text-lg mb-6">معلومات التواصل</h3>
            <ul className="space-y-4 text-background/90 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="text-secondary shrink-0 mt-0.5" size={18} />
                <a href={siteData.whatsappLink} className="hover:text-secondary transition-colors block text-right" dir="ltr">{siteData.whatsapp}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-secondary shrink-0 mt-0.5" size={18} />
                <a href={`mailto:${siteData.email}`} className="hover:text-secondary transition-colors">{siteData.email}</a>
              </li>
              {siteData.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="text-secondary shrink-0 mt-0.5" size={18} />
                  <span className="leading-relaxed">{siteData.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/50">
          <p>© {new Date().getFullYear()} {siteData.shortName}. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-background transition-colors">سياسة الخصوصية</Link>
            <Link to="/terms" className="hover:text-background transition-colors">شروط الاستخدام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
